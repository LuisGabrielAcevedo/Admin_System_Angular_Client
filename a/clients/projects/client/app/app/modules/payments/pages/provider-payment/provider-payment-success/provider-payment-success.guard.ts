import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { IRequest } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';


@Injectable({
	providedIn: 'root',
})
export class ProviderPaymenSuccessGuard implements CanActivate {

	constructor(
		private providerPaymentService: ProviderPaymentService,
		private router: Router,
		private userService: UserService
	) {}

	get lastProviderPayment(): IRequest | null {
		return this.providerPaymentService.getProviderPaymentState().value.lastProviderPaymentRequest;
	}

	canActivate(): boolean {
		if (this.lastProviderPayment && 
			this.userService.hasPermission(USER_PERMISSIONS.PROVIDERS.WRITE)) {
			return true;
		} else {
				this.router.navigate(['app/payments']);
			return false;
		}
	}
}
