import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Injectable({
	providedIn: 'root',
})
export class LandingGuard implements CanActivate {

	constructor(
		private router: Router,
		private userService: UserService,
	) {}

	canActivate(): boolean {
		if (this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.READ) ||
			this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.WRITE) ||
			this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.ADMIN)
		) {
			return true;
		} else {
			this.router.navigate(['app/']);
			return false;
		}
	}
}
