import { Component, OnInit, OnDestroy } from '@angular/core';
import {  UpdatePasswordService } from 'client/app/signup/services/update-password.service';
import { ValidatorFn, Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { CONTRAINTS } from 'client/app/app/constants';
import { IUpdatePasswordState, makeUpdatePasswordState } from 'client/app/signup/models/update-password';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordPage implements OnInit, OnDestroy {

	public updatePasswordState: IUpdatePasswordState = makeUpdatePasswordState({});
	public updatePasswordForm: FormGroup = new FormGroup({});
	public oldPasswordValidators: ValidatorFn[] = [];
	public newPasswordValidators: ValidatorFn[] = [];
	public newRepeatedPasswordValidators: ValidatorFn[] = [];
	public subscription = new Subscription();

	constructor( 
		private updatePasswordService: UpdatePasswordService,
		private validatorService: ValidatorService,
		) { }

	ngOnInit() {
		this.subscription.add(
			this.updatePasswordService.getUpdatePasswordState().subscribe((state) => this.updatePasswordState = state)
		);

		this.oldPasswordValidators = [
				Validators.required,
				Validators.minLength(CONTRAINTS.PASSWORD.MIN_LENGTH),
				Validators.maxLength(CONTRAINTS.PASSWORD.MAX_LENGTH),
				this.validatorService.PasswordValidator()
		];

		this.newPasswordValidators = [
			Validators.required,
			Validators.minLength(CONTRAINTS.PASSWORD.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.PASSWORD.MAX_LENGTH),
			this.validatorService.PasswordValidator()
		];

		this.newRepeatedPasswordValidators = [
			Validators.required,
			Validators.minLength(CONTRAINTS.PASSWORD.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.PASSWORD.MAX_LENGTH),
			this.validatorService.PasswordValidator(),
			this.validatorService.EqualToField('newPassword')
		];

		this.updatePasswordForm = new FormGroup({
			oldPassword: new FormControl('', this.oldPasswordValidators),
			newPassword: new FormControl('', this.newPasswordValidators),
			newRepeatedPassword: new FormControl('', this.newRepeatedPasswordValidators),
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get remainingPasswordCharacters(): number {
		return this.updatePasswordForm.value.newPassword ?
			this.passwordMinLength - this.updatePasswordForm.value.newPassword.length :
			this.passwordMinLength;
	}

	get oldPasswordRemainingPasswordCharacters(): number {
		return this.updatePasswordForm.value.oldPassword ?
			this.passwordMinLength - this.updatePasswordForm.value.oldPassword.length :
			this.passwordMinLength;
	}

	get passwordMinLength(): number {
		return CONTRAINTS.PASSWORD.MIN_LENGTH;
	}

	get passwordMaxLength(): number {
		return CONTRAINTS.PASSWORD.MAX_LENGTH;
	}

	onContinue(){
		const oldPassword = this.updatePasswordForm.value.oldPassword ? this.updatePasswordForm.value.oldPassword : '';
		const newPassword = this.updatePasswordForm.value.newPassword ? this.updatePasswordForm.value.newPassword : '';
		this.updatePasswordForm.disable();
		this.updatePasswordService.updatePassword(oldPassword, newPassword);
	}

}
