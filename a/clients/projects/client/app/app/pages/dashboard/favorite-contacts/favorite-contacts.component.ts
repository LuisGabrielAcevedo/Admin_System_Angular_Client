import { Component, Input } from '@angular/core';
import { IContact, makeTransferFormValue, makeFindContactFormChangeEvent } from 'client/app/app/models';
import { Router } from '@angular/router';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { TransferService } from 'client/app/app/services/transfer.service';
import { makeSalaryPaymentFormValue } from 'client/app/app/modules/payments/models/salary-payment';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-favorite-contacts',
	templateUrl: './favorite-contacts.component.html',
	styleUrls: ['./favorite-contacts.component.scss']
})
export class FavoriteContactsComponent {
	@Input() favoriteContacts: IContact[] = [];
	@Input() hasWritePermission: boolean = false;

	constructor(
		private router: Router,
		private salaryPaymentService: SalaryPaymentService,
		private transferService: TransferService,
		private userService: UserService,
	) { }

	showMore() {
		this.router.navigate(['/app/contacts']);
	}

	transfer(contact: IContact) {
		this.transferService.updateTransferState({
			newTransferFormValue: makeTransferFormValue({
				destinationContact: contact,
				findContactFormState: {
					selectedContact: contact,
					selectedTab: 0,
					formValue: makeFindContactFormChangeEvent({}),
				}
			}),
		});
		this.router.navigate(['/app/transfers/thirdPartyTransferAmount'])
	}

	paySalaries(contact: IContact) {
		this.updateSalaryPaymentContact(contact);
		this.router.navigate(['/app/payments/salary/amount']);
	}

	updateSalaryPaymentContact(contact: IContact) {
		this.salaryPaymentService.updateSalaryPaymentState({
			newSalaryPaymentFormValue: makeSalaryPaymentFormValue({ contact }),
		});
	}

	get hasPaySalariesWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SALARY_PAYMENT.WRITE);
	}

	get hasTransfersWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.TRANSFERS.WRITE);
	}
}
