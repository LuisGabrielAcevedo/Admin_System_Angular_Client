import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignupService } from 'client/app/signup/services/signup.service';

@Injectable({
	providedIn: 'root',
})
export class SignupSuccessGuard implements CanActivate {

	constructor(
		private signupService: SignupService,
		private router: Router,
	) {}

	get hasDocumentNumber(): boolean {
		return this.signupService.getSignupState().value.signupFormValue.documentNumber.length > 0;
	}

	get hasDocumentType(): boolean {
		return this.signupService.getSignupState().value.signupFormValue.documentType.description.length > 0;
	}
	
	get hasToken(): boolean {
		return this.signupService.getSignupState().value.signupFormValue.token.length > 0;
	}

	get hasUsername(): boolean {
		return this.signupService.getSignupState().value.signupFormValue.username.length > 0;
	}

	get hasPassword(): boolean {
		return this.signupService.getSignupState().value.signupFormValue.password.length > 0;
	}

	canActivate(): boolean {
		if (
			this.hasDocumentNumber &&
			this.hasDocumentType &&
			this.hasUsername &&
			this.hasPassword &&
			this.hasToken
		) {
			return true;
		} else {
			this.router.navigate(['/signup']);
			return false;
		}
	}

}
