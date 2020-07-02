import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { USER_PERMISSIONS } from 'client/app/app/constants';
import { UserService } from 'client/app/app/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class TransferTypeSelectionGuard implements CanActivate {

	constructor(
		private router: Router,
		private userService: UserService
	) {}

	canActivate(): boolean {
		if (this.userService.hasPermission(USER_PERMISSIONS.TRANSFERS.WRITE)) {
			return true;
		} else {
			this.router.navigate(['app/transfers']);
			return false;
		}
	}
}
