import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';

@Injectable({
	providedIn: 'root',
})
export class ClearOnExitGuard implements CanDeactivate<boolean> {

	constructor(
		private transferService: TransferService,
	) {}

	canDeactivate(
		_component: any,
		_currentRoute: ActivatedRouteSnapshot,
		currenctState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		const nextRoute = nextState.url;
		const currentRoute = currenctState.url

		if (currentRoute.includes('/app/transfers/success') ||
			currentRoute.includes('/app/transfers/thirdPartyTransferSuccess')) {
			this.transferService.resetState();
		} else if (!nextRoute.includes('/app/transfers')) {
			this.transferService.resetFormState();
		}

		return true;
	}
}
