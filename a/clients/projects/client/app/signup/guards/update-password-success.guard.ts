import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UpdatePasswordService } from 'client/app/signup/services/update-password.service';

@Injectable({
	providedIn: 'root',
})
export class UpdatePasswordSuccessGuard implements CanActivate {

	constructor(
		private updatePasswordService: UpdatePasswordService,
		private router: Router
	) {}

	get hasUsername(): boolean {
		return this.updatePasswordService.subject.value.userName.length > 0;
	}

	get hasOldPassword(): boolean {
		return this.updatePasswordService.subject.value.oldPassword.length > 0;
	}

	get hasNewPassword(): boolean {
		return this.updatePasswordService.subject.value.newPassword.length > 0;
	}

	get isNotLoading(): boolean {
		return !this.updatePasswordService.subject.value.isLoading;
	}

	get hasNotErrors(): boolean {
		return !this.updatePasswordService.subject.value.hasErrors;
	}

	canActivate(): boolean {		
		if(
			this.hasUsername && 
			this.hasOldPassword &&
			this.hasNewPassword &&
			this.isNotLoading &&
			this.hasNotErrors
		){
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}

}
