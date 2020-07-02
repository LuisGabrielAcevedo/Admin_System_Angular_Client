import { Component, Input } from '@angular/core';
import { ISidenavData, makeContact, makeTransferFormValue, makeFindContactFormChangeEvent } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { Router } from '@angular/router';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { makeSalaryPaymentFormValue } from 'client/app/app/modules/payments/models/salary-payment';
import { TransferService } from 'client/app/app/services/transfer.service';

@Component({
	selector: 'mcy-contact-success',
	templateUrl: './contact-success.component.html',
	styleUrls: ['./contact-success.component.scss']
})
export class ContactSuccessComponent {
	@Input() public data: ISidenavData = {
		contact: makeContact({}),
		title: ''
	}

	constructor(
		private sidenavService: SidenavService,
		private router: Router,
		private salaryPaymentService: SalaryPaymentService,
		private transferService: TransferService,
	) { }

	finish() {
		this.sidenavService.close();
	}

	transfer() {
		this.transferService.updateTransferState({
			newTransferFormValue: makeTransferFormValue({ 
				destinationContact: this.data.contact, 
				findContactFormState: { 
					selectedContact: this.data.contact, 
					selectedTab: 0,
					formValue: makeFindContactFormChangeEvent({}),
				} 
			}),
		});
		this.router.navigate(['/app/transfers/thirdPartyTransferAmount'])
	}

	paySalaries() {
		this.updateSalaryPaymentContact();
		this.router.navigate(['/app/payments/salary/amount']);
	}

	updateSalaryPaymentContact() {
		this.salaryPaymentService.updateSalaryPaymentState({
			newSalaryPaymentFormValue: makeSalaryPaymentFormValue({ contact: this.data.contact }),
		});
	}
}
