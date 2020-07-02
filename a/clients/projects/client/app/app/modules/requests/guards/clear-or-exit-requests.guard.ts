import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RequestsService } from 'client/app/app/services/requests.service';
import { TransactionService } from 'client/app/app/services/transaction.service';

@Injectable()
export class ClearOnExitRequestsGuard implements CanDeactivate<boolean> {

	constructor(
		private requestsService: RequestsService,
		private transactionService: TransactionService,
	) {}

	canDeactivate(
		_component: any,
		_currentRoute: ActivatedRouteSnapshot,
		_currenctState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		const nextRoute = nextState.url;

		if (!nextRoute.includes('requests')) {
			this.requestsService.resetSelectedState();
			this.transactionService.resetState();
		}

		return true;
	}
}
