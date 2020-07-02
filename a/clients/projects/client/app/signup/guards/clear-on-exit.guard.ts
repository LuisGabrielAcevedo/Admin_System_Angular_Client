import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SignupService } from 'client/app/signup/services/signup.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ClearOnExitGuard implements CanDeactivate<boolean> {

	constructor(
		private signupService: SignupService,
	) {}

	canDeactivate(
		_component: any,
		_currentRoute: ActivatedRouteSnapshot,
		_currenctState: RouterStateSnapshot,
		nextState: RouterStateSnapshot
	): boolean {
		const nextRoute = nextState.url;

		if ((!nextRoute.includes('/signup')) || nextRoute === '/signup') {
			this.signupService.resetFormState();
		}

		return true;
	}
}
