import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ValidatorFn, Validators, FormGroup, FormControl } from '@angular/forms';
import { CONTRAINTS, URLS } from 'client/app/app/constants';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { UserService } from 'client/app/app/services/user.service';
import { 
	SoftTokenEmailConfirmationComponent
} from 'client/app/app/sidenav/soft-token/soft-token-email-confirmation/soft-token-email-confirmation.component';
import { makeSidenavClose } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { IUserState, makeUserState } from 'client/app/app/models/user';

@Component({
	selector: 'mcy-positive-validation',
	templateUrl: './positive-validation.component.html',
	styleUrls: ['./positive-validation.component.scss']
})
export class PositiveValidationComponent implements OnInit, OnDestroy {
	public subscription = new Subscription();
	public codeValidators: ValidatorFn[] = [];
	public userState: IUserState = makeUserState({});
	public positiveValidationForm: FormGroup;

	constructor( 
		private validatorService: ValidatorService,
		private userService: UserService,
		private translateService: TranslateService,
		private sidenavService: SidenavService,
	) { 
		this.positiveValidationForm = new FormGroup({});
	}

	ngOnInit() {
		this.subscription.add();
		this.codeValidators = [ 
			Validators.required,
			Validators.pattern(CONTRAINTS.CODE.PATTERN),
			this.validatorService.noWhitespaceValidator(),
			this.userService.positiveValidationValidator(),
		];
		this.positiveValidationForm = new FormGroup({
			code: new FormControl('', this.codeValidators)
		});
		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
		}));
	}

	get isLoading(): boolean {
		return this.userState.loadingPositiveValidation;
	}

	onPreviousStepClick() {
		this.sidenavService.goToStep(1);
	}

	generateSeed() {
		const token: string = this.userService.getUserState().value.securityToken;
		this.subscription.add(
			this.userService.generateNewSeed(token).subscribe(success => { 
				if (success) {
					this.sidenavService.nextStep({
						component: SoftTokenEmailConfirmationComponent,
						title: this.translateService.instant('sidenav.tokenCreateEmailConfirmation.title'),
						closeAction: makeSidenavClose({
							text: this.translateService.instant('sidenav.tokenCreateEmailConfirmation.sidenavCancelConfirmation.message'),
							cancelText: this.translateService.instant('sidenav.tokenCreateEmailConfirmation.sidenavCancelConfirmation.cancel'),
							confirmText: this.translateService.instant('sidenav.tokenCreateEmailConfirmation.sidenavCancelConfirmation.confirm')
						})
					});
				} else {
					this.positiveValidationForm.reset();
				}
			})
		)
	}

	onConfirm() {
		if (this.positiveValidationForm.valid) {
			const code: string = this.positiveValidationForm.controls.code.value;
			this.subscription.add(
				this.userService.checkPositiveValidation(code).subscribe((isCodeValid) => {
					if(isCodeValid) {
						this.generateSeed();
					} else {
						this.positiveValidationForm.reset();
					}
				})
			)
		}
	}

	openNewMessage() {
		window.open(URLS.POSITIVE_VALIDATION, '_blank');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
