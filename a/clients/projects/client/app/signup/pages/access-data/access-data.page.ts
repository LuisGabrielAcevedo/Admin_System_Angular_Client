import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CONTRAINTS } from 'client/app/app/constants';
import { SignupService } from 'client/app/signup/services/signup.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { Router } from '@angular/router';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { ISignupState, makeSignupState } from 'client/app/signup/models';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './access-data.page.html',
	styleUrls: ['./access-data.page.scss']
})
export class AccessDataPage implements OnInit {
	public signupForm: FormGroup = new FormGroup({});
	public signupState: ISignupState = makeSignupState({});
	public usernameValidators: ValidatorFn[] = [];
	public passwordValidators: ValidatorFn[] = [];
	public repeatedPasswordValidators: ValidatorFn[] = [];
	public subscription = new Subscription();

	constructor(
		private signupService: SignupService,
		private modalService: ModalService,
		private router: Router,
		private validatorService: ValidatorService,
		private translateService: TranslateService,
	) { }

	ngOnInit() {
		this.usernameValidators = [
			Validators.required,
			Validators.minLength(CONTRAINTS.USERNAME.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.USERNAME.MAX_LENGTH),
			Validators.pattern(CONTRAINTS.USERNAME.PATTERN)
		]

		this.passwordValidators = [
			Validators.required,
			Validators.minLength(CONTRAINTS.PASSWORD.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.PASSWORD.MAX_LENGTH),
			this.validatorService.PasswordValidator()
		];

		this.repeatedPasswordValidators = [
			Validators.required,
			Validators.minLength(CONTRAINTS.PASSWORD.MIN_LENGTH),
			Validators.maxLength(CONTRAINTS.PASSWORD.MAX_LENGTH),
			this.validatorService.PasswordValidator(),
			this.validatorService.EqualToField('password')
		];


		this.signupForm = new FormGroup({
			username: new FormControl('', this.usernameValidators, [ this.validatorService.DuplicateUsernameAsyncValidator() ]),
			password: new FormControl('', this.passwordValidators),
			repeatedPassword: new FormControl('', this.repeatedPasswordValidators),
		});

		this.subscription.add(
			this.signupService.getSignupState().subscribe(state => {
				this.signupState = state;
				this.signupForm.controls.username.patchValue(state.signupFormValue.username);
			})
		);
	}

	get remainingPasswordCharacters(): number {
		return this.signupForm.value.password ?
			this.passwordMinLength - this.signupForm.value.password.length :
			this.passwordMinLength;
	}

	get remainingUsernameCharacters(): number {
		return this.signupForm.value.username ?
			this.usernameMinLength - this.signupForm.value.username.length :
			this.usernameMinLength;
	}

	get usernameMinLength(): number {
		return CONTRAINTS.USERNAME.MIN_LENGTH;
	}

	get usernameMaxLength(): number {
		return CONTRAINTS.USERNAME.MAX_LENGTH;
	}

	get passwordMinLength(): number {
		return CONTRAINTS.PASSWORD.MIN_LENGTH;
	}

	get passwordMaxLength(): number {
		return CONTRAINTS.PASSWORD.MAX_LENGTH;
	}

	get documentType(): string {
		return this.signupState.signupFormValue.documentType.documentType;
	}

	get documentNumber(): string {
		return this.signupState.signupFormValue.documentNumber;
	}

	getSidenavTitleTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.accessData.sidenavTitleForgotCredentials');
		}
		return this.translateService.instant('pages.accessData.sidenavTitleRegister');
	}

	getNextButtonTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.accessData.actions.continueForgotCredentials');
		}
		return this.translateService.instant('pages.accessData.actions.continueRegister');
	}

	getExitDescriptionTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('components.signupExitModal.descriptionForgotCredentials');
		}
		return this.translateService.instant('components.signupExitModal.descriptionRegister');
	}

	onCancel() {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('components.signupExitModal.title'),
			description: this.getExitDescriptionTranslation(),
			cancel: this.translateService.instant('components.signupExitModal.cancel'),
			confirm: this.translateService.instant('components.signupExitModal.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				this.router.navigateByUrl('/signup');
			}
		}));
	}

	onContinue() {
		this.signupService.updateSignupState({
			signupFormValue: {
				...this.signupService.getSignupState().value.signupFormValue,
				username: this.signupForm.value.username,
				password: this.signupForm.value.password
			}
		});
		
		this.subscription.add(
			this.signupService.submitRegister(this.signupState.signupFormValue).subscribe(res => {
				if (res) {
					this.router.navigate([ '/signup/signupSuccessPage' ]);
				}
			})
		);
	}
}
