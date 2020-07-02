import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { LoginService } from 'client/app/login/services/login.service';
import { IUserAccount, ILoginState, makeLoginState } from 'client/app/login/models';
import { IError } from '@mcy/main/models';
import { StorageService } from '@mcy/main/services/storage.service';
import { Subscription } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { makeUserState, IUserState } from 'client/app/app/models';
import { AuthService } from 'client/app/app/services/auth.service';
import { EventService } from 'client/app/app/services/event.service';

@Component({
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnDestroy {
	public loginForm: FormGroup;
	public loginSuccess = false;

	public userValidators: ValidatorFn[] = [ Validators.required ];
	public passwordValidators: ValidatorFn[] = [ Validators.required ];
	public subscription: Subscription = new Subscription();
	public loginState: ILoginState = makeLoginState({});
	public userState: IUserState = makeUserState({});

	constructor(
		private router: Router,
		private loginService: LoginService,
		private storage: StorageService,
		private userService: UserService,
		private authService: AuthService,
		private eventService: EventService,
	) {
		this.loginForm = new FormGroup({
			user: new FormControl('', this.userValidators),
			password: new FormControl('', this.passwordValidators)
		});
		this.subscription.add(this.loginService.getLoginState().subscribe((state) => {
			this.loginState = state;
		}));
		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
		}));
		this.loginService.updateLoginState({ error: undefined });

		this.subscription.add(
			this.eventService.on('getPermissionsFailed').subscribe(() => this.handleLoginError())
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get isLoading(): boolean {
		return this.loginState.isLoading || (this.loginSuccess && !this.userState.hasUserErrors);
	}

	submitForm() {
		this.loginSuccess = false;
		if (this.loginForm.valid) {

			// TODO remover cuando este el token listo MER-2294
			this.storage.setData('tempUser', this.loginForm.value.user);

			const account: IUserAccount = {
				user: this.loginForm.value.user,
				password: this.loginForm.value.password
			};
			
			this.subscription.add(this.loginService.validateAccount(account).subscribe((isValid: boolean) => {
				if (isValid) {
					this.loginSuccess = true;
					this.subscription.add(
						this.userService.getEnterprises().subscribe((isSuccess) => {
							if (isSuccess) {
								this.router.navigate(['/app']);
							} else {
								this.handleLoginError();
							}
						})
					);
				} else {
					this.handleLoginError();
				}
			}));
		}
	}

	handleLoginError() {
		this.authService.logout();
		this.loginSuccess = false;
		this.resetForm();
	}

	onRegisterClick() {
		return this.router.navigate(['/signup']);
	}

	onErrorCloseClick() {
		this.loginService.updateLoginState({ error: undefined });
	}

	onForgotCredentialsClick() {
		return this.router.navigate(['/signup'], { queryParams: { forgotCredentials: true }});
	}

	get error(): IError | undefined {
		return this.loginState.error;
	}

	resetForm() {
		this.loginForm.reset();
	}
}
