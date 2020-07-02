import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from 'client/app/signup/services/signup.service';
import { makeSignupState, ISignupState } from 'client/app/signup/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './signup-success.page.html',
	styleUrls: ['./signup-success.page.scss']
})
export class SignupSuccessPage implements OnInit, OnDestroy {
	public signupState: ISignupState = makeSignupState({});
	public subscription = new Subscription();

	constructor(
		private signupService: SignupService,
		private router: Router,
		private translateService: TranslateService
	) { }

	ngOnInit() {
		this.subscription.add(
			this.signupService.getSignupState().subscribe(state => {
				this.signupState = state;
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get documentType(): string {
		return this.signupState.signupFormValue.documentType.documentType;
	}

	get documentNumber(): string {
		return this.signupState.signupFormValue.documentNumber;
	}

	getSidenavTitleTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.positiveValidation.sidenavTitleForgotCredentials');
		}
		return this.translateService.instant('pages.positiveValidation.sidenavTitleRegister');
	}

	redirectToLogin() {
		return this.router.navigate(['/']);
	}
}
