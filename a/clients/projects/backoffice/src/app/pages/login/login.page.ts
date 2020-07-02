import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ILoginState, makeLoginState } from 'client/app/login/models';
import { LoginService } from 'backoffice/src/app/services/login.service';
import { IUserAccount, IUserAccountResponse } from 'backoffice/src/app/models/login';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnDestroy {
	public loginForm: FormGroup;
	public userValidators: ValidatorFn[] = [ Validators.required ];
	public passwordValidators: ValidatorFn[] = [ Validators.required ];
	public loginState: ILoginState = makeLoginState({});
	public errorList: string[] = [];
	public subscription = new Subscription();

	constructor(
		private router: Router,
		private loginService: LoginService,
	) {
		this.loginForm = new FormGroup({
			user: new FormControl('', this.userValidators),
			password: new FormControl('', this.passwordValidators)
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	submitForm() {
		const account: IUserAccount = {
			user: this.loginForm.value.user,
			password: this.loginForm.value.password
		};
		this.subscription.add(
			this.loginService.validateAccount(account).subscribe((res: IUserAccountResponse) => {
				if (res.success) {
					this.router.navigate(['home']);
					this.errorList = [];
				} else {
					this.errorList = res.messages;
					this.loginForm.reset();
				}
			})
		);
	}
}
