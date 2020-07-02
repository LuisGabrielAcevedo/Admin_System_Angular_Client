import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'client/app/app/services/user.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SoftTokenConfirmComponent } from 'client/app/app/sidenav/soft-token/soft-token-confirm/soft-token-confirm.component';
import { Observable, of } from 'rxjs';
import { makeSidenavClose, ISoftTokenValidationResponse } from 'client/app/app/models';
import { tap, catchError } from 'rxjs/operators';
import { makeUserState, IUserState } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'mcy-soft-token-email-confirmation',
	templateUrl: './soft-token-email-confirmation.component.html',
	styleUrls: ['./soft-token-email-confirmation.component.scss']
})

export class SoftTokenEmailConfirmationComponent implements OnInit, OnDestroy {
	public userState: IUserState = makeUserState({});
	public subscription: Subscription = new Subscription();

	constructor(
		private userService: UserService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private softTokenService: SoftTokenService
	) { }

	ngOnInit() {
		this.subscription.add(this.userService.getUserState().subscribe((state) => {
			this.userState = state;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onCancel() {
		this.sidenavService.goToStep(2);
	}

	get userEmail(): string {
		return this.userState.user.email;
	}

	onSubmitToken(token: string): Observable<ISoftTokenValidationResponse> {
		const securityToken: string = this.userService.getUserState().value.securityToken;
		return this.userService.getSoftTokenValidation(token, this.userState.user.username, securityToken).pipe(
			tap((response: ISoftTokenValidationResponse) => {
				if (!response.success) {
					this.softTokenService.handleErrors(response, (softToken) => this.onSubmitToken(softToken), 'softTokenRegistration');
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				this.softTokenService.handleErrors(errorResponse.error, (softToken) => this.onSubmitToken(softToken), 'softTokenRegistration');
				return of(errorResponse.error);
			})
		);
	}

	tokenValidation() {
		this.sidenavService.nextStep({
			title: this.translateService.instant('sidenav.tokenValidation.title'),
			component: SoftTokenConfirmComponent,
			data: {
				onConfirm: (token: string) => this.onSubmitToken(token),
				onClose: () => this.onClose(),
				confirmLabel: this.translateService.instant('sidenav.tokenValidation.validate'),
				showSuccess: true
			},
			closeAction: makeSidenavClose({
				text: this.translateService.instant('sidenav.softokenCreateSuccess.closeText'),
				cancelText: this.translateService.instant('sidenav.softokenCreateSuccess.cancelText'),
				confirmText: this.translateService.instant('sidenav.softokenCreateSuccess.closeConfirmText')
			})
		});
	}

	onClose() {
		this.sidenavService.close();
	}

}
