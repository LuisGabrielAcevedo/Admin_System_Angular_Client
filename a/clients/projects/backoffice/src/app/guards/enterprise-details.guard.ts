import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'backoffice/src/app/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class EnterpriseDetailsGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router,
	) {}

	canActivate(): boolean {
		if (this.userService.getUserState().value.enterprise) {
			return true;
		} else {
			this.router.navigate(['backoffice/home']);
			return false;
		}
	}
}
