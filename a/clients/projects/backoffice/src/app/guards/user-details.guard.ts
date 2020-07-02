import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IUserDetails } from 'backoffice/src/app/models/user';
import { UserService } from 'backoffice/src/app/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class UserDetailsGuard implements CanActivate {
	constructor(
		private router: Router,
		private userService: UserService,
	) { }

	get userDetails(): IUserDetails {
		return this.userService.getUserState().value.userSelected;
	}

	canActivate(): boolean {
		if (this.userDetails.username !== '') {
			return true;
		} else {
			this.router.navigate(['home']);
			return false;
		}
	}
}
