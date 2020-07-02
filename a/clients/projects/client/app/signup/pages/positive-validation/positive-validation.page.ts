import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { makeSignupState, ISignupState } from 'client/app/signup/models';
import { SignupService } from 'client/app/signup/services/signup.service';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { CONTRAINTS, URLS } from 'client/app/app/constants';
import { Router } from '@angular/router';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { ModalService } from '@mcy/core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { IDocumentBff, makeDocumentBff } from 'client/app/signup/models/signup';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './positive-validation.page.html',
	styleUrls: ['./positive-validation.page.scss']
})
export class PositiveValidationPage implements OnInit, OnDestroy {

	public positiveValidationForm: FormGroup = new FormGroup({});
	public signupState: ISignupState = makeSignupState({});
	public codeValidators: ValidatorFn[] = [];
	public subscription = new Subscription();

	constructor(
		private signupService: SignupService,
		private validatorService: ValidatorService,
		private router: Router,
		private modalService: ModalService,
		private translateService: TranslateService,
	) { }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	ngOnInit() {
		this.codeValidators = [ 
			Validators.required,
			Validators.pattern(CONTRAINTS.CODE.PATTERN),
			this.validatorService.noWhitespaceValidator(),
			this.signupService.positiveValidationValidator(),
		];
		this.positiveValidationForm = new FormGroup({
			code: new FormControl('', this.codeValidators)
		})

		this.subscription.add(
			this.signupService.getSignupState().subscribe(state => { 
				this.signupState = state;
			})
		);
	}

	get documentType(): string {
		return this.signupState.signupFormValue.documentType.documentType;
	}

	get documentNumber(): string {
		return this.signupState.signupFormValue.documentNumber;
	}
	
	get isLoading(): boolean {
		return this.signupState.isPositiveValidationLoading;
	}

	getSidenavTitleTranslation(): string {
		if(this.signupState.hasUserForgotCredentials) {
			return this.translateService.instant('pages.positiveValidation.sidenavTitleForgotCredentials');
		}
		return this.translateService.instant('pages.positiveValidation.sidenavTitleRegister');
	}

	onContinue() {
		if (this.positiveValidationForm.valid) {
			const code: string = this.positiveValidationForm.controls.code.value;
			const document: IDocumentBff = makeDocumentBff({
				number: this.signupState.signupFormValue.documentNumber,
				type: this.signupState.signupFormValue.documentType.documentType
			});
			this.subscription.add(
				this.signupService.checkPositiveValidation(code, document).subscribe((isValid: boolean) => {
					if(isValid) {
						this.router.navigate(['/signup/accessDataPage']);
					} else {
						this.positiveValidationForm.reset();
					}
				})
			);
		}
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
				this.router.navigate(['signup']);
			}
		}));
	}

	onPreviousStepClick() {
		this.router.navigate(['signup']);
	}

	openNewMessage() {
		window.open(URLS.POSITIVE_VALIDATION, '_blank');
	}

}
