import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { IProviderPaymentFormValue } from 'client/app/app/models/provider-payment';
import { IRequest } from 'client/app/app/models';
import { USER_PERMISSIONS } from 'client/app/app/constants';
import { UserService } from 'client/app/app/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class ProviderPaymenSummaryGuard implements CanActivate {

	constructor(
		private providerPaymentService: ProviderPaymentService,
		private router: Router,
		private userService: UserService
	) {}

	get formValue(): IProviderPaymentFormValue {
		return this.providerPaymentService.getProviderPaymentState().value.newProviderPaymentFormValue;
	}

	get lastProviderPayment(): IRequest | null {
		return this.providerPaymentService.getProviderPaymentState().value.lastProviderPaymentRequest;
	}

	canActivate(): boolean {
		if (this.formValue.destinationContact.id !== '' &&
			this.formValue.amount !== 0 &&
			this.formValue.sourceAccount.number !== '' &&
			this.formValue.executionDate.toString() !== '' &&
			this.lastProviderPayment === null && 
			this.userService.hasPermission(USER_PERMISSIONS.PROVIDERS.WRITE)) {
				return true;
		} else {
				this.router.navigate(['app/payments']);
			return false;
		}
	}
}
