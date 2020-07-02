import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MovementsService } from 'client/app/app/services/movements.service';
import { makeAccountMovementState } from 'client/app/app/modules/accounts/models';


@Injectable({
	providedIn: 'root',
})
export class ClearOnExitGuard implements CanDeactivate<boolean> {

	constructor(
		private movementsService: MovementsService
	) {}

	canDeactivate(
		_component: any,
		_currentRoute: ActivatedRouteSnapshot,
		currenctState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		const nextRoute = nextState.url;
		const currentRoute = currenctState.url

		if (currentRoute.includes('/app/accounts') && !nextRoute.includes('/app/accounts')) {
			this.movementsService.updateMovementsState(makeAccountMovementState({}));
		}

		return true;
	}
}
