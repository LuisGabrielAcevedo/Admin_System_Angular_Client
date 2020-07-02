import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Injectable({
	providedIn: 'root',
})
export class ProviderPaymenContactGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate(): boolean {
		if (this.userService.hasPermission(USER_PERMISSIONS.PROVIDERS.WRITE)) {
				return true;
		} else {
			this.router.navigate(['app/payments']);
			return false;
		}
	}
}
