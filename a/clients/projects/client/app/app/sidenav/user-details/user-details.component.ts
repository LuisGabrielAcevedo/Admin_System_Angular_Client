import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISidenavData, makeEnterpriseState, makeSidenavClose } from 'client/app/app/models';
import { makeUserApp, IProfileDataResponse } from 'client/app/app/models/user';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SoftTokenConfirmComponent } from 'client/app/app/sidenav/soft-token/soft-token-confirm/soft-token-confirm.component';
import { Subscription, Observable, of } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { REGEXP } from '@mcy/core/constants';
import { CONTRAINTS, USER_PERMISSIONS } from 'client/app/app/constants';
import { tap, catchError } from 'rxjs/operators';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnDestroy, OnInit {
	@Input() public data: ISidenavData = {
		user: makeUserApp({}),
		enterpriseState: makeEnterpriseState({})
	};
	public isEditing: boolean = false;
	public userForm: FormGroup = new FormGroup({});
	public subscription = new Subscription();

	public cellphoneValidators: ValidatorFn[] = [];
	public emailValidators: ValidatorFn[] = [];

	constructor(
		private userService: UserService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private softTokenService: SoftTokenService,
	) {	}

	ngOnInit() {
		this.emailValidators = [
			Validators.required,
			Validators.pattern(REGEXP.EMAIL)
		];
		this.cellphoneValidators = [
			Validators.pattern(REGEXP.NUMERIC),
			Validators.maxLength(CONTRAINTS.CELLPHONE.MAX_LENGTH)
		];

		if (!this.data.user) {
			this.data.user = this.userService.getUserState().value.user;
		}
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	initializeForm() {
		this.userForm = new FormGroup({
			cellphone: new FormControl(this.data.user.cellPhone, this.cellphoneValidators),
			email: new FormControl(this.data.user.email, this.emailValidators)
		});
	}

	onEditClick(): void {
		this.isEditing = true;
		this.initializeForm();
	}

	closeSidenav(): void {
		this.sidenavService.close();
	}

	onCloseEditClick(): void {
		this.isEditing = false;
	}

	onSubmitToken(softToken: string): Observable<IProfileDataResponse> {
		const user = { 
			...this.data.user,
			cellPhone: this.userForm.value.cellphone,
			email: this.userForm.value.email,
		};

		return this.userService.updateUserDetails(user, softToken).pipe(
			tap(response => {
				if(response.success) {
					this.userService.updateUserState({ user });
				} else {
					this.softTokenService.handleErrors(response, (token) => this.onSubmitToken(token), 'userDetailsUpdate');
				}
			}),
			catchError((responseError: HttpErrorResponse) => {
				this.softTokenService.handleErrors(responseError.error, (token) => this.onSubmitToken(token), 'userDetailsUpdate');
				return of(responseError.error);
			})
		);
	}

	openUserDetails() {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.userDetails.details'),
			component: UserDetailsComponent,
			data: {
				user: this.userService.getUserState().value.user,
				enterpriseState: this.data.enterpriseState
			}
		});
	}

	onSaveClick(): void {
		this.isEditing = false;
		this.sidenavService.nextStep({
			title: this.translateService.instant('sidenav.tokenValidation.title'),
			component: SoftTokenConfirmComponent,
			data: {
				onConfirm: (token: string) => this.onSubmitToken(token),
				confirmLabel: this.translateService.instant('sidenav.userDetails.validateAndSave'),
				onClose: () => this.openUserDetails(),
			},
			closeAction: makeSidenavClose({
				text: this.translateService.instant('sidenav.softokenConfirm.sidenavCancelConfirmation.message'),
				cancelText: this.translateService.instant('sidenav.softokenConfirm.sidenavCancelConfirmation.cancel'),
				confirmText: this.translateService.instant('sidenav.softokenConfirm.sidenavCancelConfirmation.confirm')
			})
		});
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.PROFILE.WRITE);
	}
}
