import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServiceService } from 'client/app/app/services/service.service';

@Injectable()
export class ClearOnExitGuard implements CanDeactivate<boolean> {

	constructor(
		private salaryPaymentService: SalaryPaymentService,
		private providerPaymentService: ProviderPaymentService,
		private servicePaymentService: ServicePaymentService,
		private serviceService: ServiceService,
	) {}

	canDeactivate(
		_component: any,
		_currentRoute: ActivatedRouteSnapshot,
		currenctState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		const nextRoute = nextState.url;
		const currentRoute = currenctState.url;
		const salaryPaymentUrl = '/app/payments/salary';
		const paymentProviderurl = '/app/payments/provider';
		const paymentServiceurl = '/app/payments/service';


		if (currentRoute.includes(salaryPaymentUrl) && !nextRoute.includes(salaryPaymentUrl)) {
			this.salaryPaymentService.resetFormState();
		}

		if (currentRoute.includes(paymentProviderurl) && !nextRoute.includes(paymentProviderurl)) {
			this.providerPaymentService.resetFormState();
		}

		if (currentRoute.includes(paymentServiceurl) && !nextRoute.includes(paymentServiceurl)) {
			this.servicePaymentService.resetFormState();
			this.serviceService.resetState();
		}

		return true;
	}
}
