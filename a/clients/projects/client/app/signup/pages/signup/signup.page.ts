import { Component, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENTS, CONTRAINTS } from 'client/app/app/constants';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from 'client/app/signup/services/signup.service';
import { IDocument, ISignupState, makeSignupState } from 'client/app/signup/models/signup';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit, OnDestroy {
	public signupState: ISignupState = makeSignupState({});
	public documentTypesOptions: ISelectOption[] = [];
	public signupForm: FormGroup = new FormGroup({});
	public subscription = new Subscription();

	public documentTypeValidators = [
		Validators.required
	];

	public documentNumberValidators = [
		Validators.required,
		Validators.pattern(CONTRAINTS.DOCUMENTS.PATTERN)
	];

	constructor(
		private router: Router,
		private signupService: SignupService,
		private route: ActivatedRoute,
		private translateService: TranslateService
	) { }

	ngOnInit() {
		this.subscription.add(
			this.route.queryParams.subscribe(params => {
				if(params.forgotCredentials) {
					this.signupService.updateSignupState({ hasUserForgotCredentials: true });
				}
			})
		);
		this.signupForm = new FormGroup({
			documentType: new FormControl('', this.documentTypeValidators),
			documentNumber: new FormControl('', this.documentNumberValidators),
		});
		this.documentTypesOptions = this.documentTypes;
		this.signupForm.controls.documentType.patchValue(DOCUMENTS[0].code);
		this.signupService.getSignupState().subscribe(state => {
			this.signupState = state;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get isLoading(): boolean {
		return this.signupState.isSignupLoading;
	}

	get documentTypes(): ISelectOption[] {
		return DOCUMENTS.map((document) => {
			return {
				viewValue: document.documentType,
				value: document.code
			};
		});
	}

	getTitleTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.signup.titleForgotCredentials');
		}
		return this.translateService.instant('pages.signup.titleRegister');
	}

	getWarningTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.signup.warningForgotCredentials');
		}
		return this.translateService.instant('pages.signup.warningRegister');
	}

	getNextStepTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.signup.submitForgotCredentials');
		}
		return this.translateService.instant('pages.signup.submitRegister');
	}

	redirectToLogin() {
		return this.router.navigate(['/']);
	}

	redirectToNextStep() {
		return this.router.navigate(['/signup/positiveValidation']);
	}

	redirectError() {
		return this.router.navigate(['/signup/signupErrorPage']);
	}

	submitForm(document: IDocument) {
		this.subscription.add(
			this.signupService.validateDocument(document).subscribe((isValid: boolean) => {
				if(isValid) {
					this.signupService.updateSignupState({
						signupFormValue: {
							...this.signupService.getSignupState().value.signupFormValue,
							documentNumber: document.documentNumber,
							documentType: document.documentType,
						}
					});
					this.redirectToNextStep();
				} else {
					this.redirectError();
				}
			})
		);
	}

	validateForm() {
		if (this.signupForm.valid) {
			const document: IDocument = {
				documentNumber: this.signupForm.controls.documentNumber.value,
				documentType: this.signupService.findDocumentById(this.signupForm.controls.documentType.value)
			}
			this.submitForm(document);
		}
	}
}
