import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UpdatePasswordService } from 'client/app/signup/services/update-password.service';

@Injectable({
	providedIn: 'root',
})
export class ClearOnExitUpdatePasswordGuard implements CanDeactivate<boolean> {

	constructor(
		private updatePasswordService: UpdatePasswordService
	) {}

	canDeactivate(
		_component: any,
		_currentRoute: ActivatedRouteSnapshot,
		_currenctState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		const nextRoute = nextState.url;

		if ((!nextRoute.includes('/signup'))) {
			this.updatePasswordService.resetState();
		}

		return true;
	}
}
