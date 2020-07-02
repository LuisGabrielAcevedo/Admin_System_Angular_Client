import { Component, Input } from '@angular/core';
import { IServiceDebt, makeServicePaymentFormValue, makeServiceCategory, makeService } from 'client/app/app/models';
import { CURRENCIES, USER_PERMISSIONS } from 'client/app/app/constants';
import { Router } from '@angular/router';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { UserService } from 'client/app/app/services/user.service';

@Component({
	selector: 'mcy-upcoming-maturities',
	templateUrl: './upcoming-maturities.component.html',
	styleUrls: ['./upcoming-maturities.component.scss']
})
export class UpcomingMaturitiesComponent {
	@Input() debtsList: IServiceDebt[] = [];
	public pesosSymbol = CURRENCIES[0].symbol;
	public dollarSymbol = CURRENCIES[1].symbol;

	constructor(
		private router: Router,
		private servicePaymentService: ServicePaymentService,
		private userService: UserService,
	) { }

	get totalInPesos() {
		return this.debtsList
			.filter((debt) => !debt.usdPayment)
			.reduce((partialAmount, value) => ( partialAmount + value.amount ), 0);
	}

	get totalInDollars() {
		return this.debtsList
			.filter((debt) => debt.usdPayment)
			.reduce((partialAmount, value) => ( partialAmount + value.amount ), 0);
	}

	get debtsListToShow() {
		return this.debtsList.slice(0, 6);
	}

	showMore() {
		this.router.navigate(['/app/payments']);
	}

	payServiceDebt(debt: IServiceDebt) {
		this.servicePaymentService.updateServicePaymentState({
			newServicePaymentFormValue: makeServicePaymentFormValue({
				debt,
				banelcoClientId: debt.banelcoClientId,
				category: makeServiceCategory({
					id: debt.serviceId,
					description: debt.description
				}),
				service: makeService({
					id: debt.serviceId,
					description: debt.description
				}),
				fromDebts: true
			})
		});
		this.router.navigateByUrl('app/payments/service/debt');
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SERVICE_PAYMENT.WRITE);
	}
}
