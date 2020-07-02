import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAccount, IEnablementCheckbook, IEnablementCheckbookResponse } from 'client/app/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'client/app/app/services/account.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { EnableCheckbookConfirmComponent } from 'client/app/app/sidenav/enable-checkbook-confirm/enable-checkbook-confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of } from 'rxjs';
import { CheckbooksService } from 'client/app/app/services/checkbooks.service';
import { tap, catchError } from 'rxjs/operators';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MISSING_SIGNATURE } from 'client/app/app/constants';

@Component({
	selector: 'mcy-enable-checkbook',
	templateUrl: './enable-checkbook.component.html',
	styleUrls: ['./enable-checkbook.component.scss'],
})
export class EnableCheckbookComponent implements OnInit, OnDestroy {
	public accounts: IAccount[] = [];
	public subscriptions: Subscription = new Subscription();
	public pesosCode = '032';
	public enableForm: FormGroup;
	constructor(
		private fb: FormBuilder,
		private accountService: AccountService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private checkbooksService: CheckbooksService,
		private softTokenService: SoftTokenService,
	) {
		this.enableForm = this.fb.group({
			account: [null, Validators.required],
			initialNumber: [null, Validators.required],
			lastNumber: [null, Validators.required],
		});
	}

	ngOnInit() {
		this.loadAccounts();
	}

	loadAccounts() {
		this.accountService.findAccounts();
		this.subscriptions.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.accounts = state.accounts.filter(
					(account) => account.currency.code === this.pesosCode
				);
			})
		);
	}

	cancel() {
		this.sidenavService.close();
	}

	onEnabledCheckbookClick(): void {
		this.softTokenService.requestSoftToken((token: string) => this.enable(token), 'enableCheckbook');
	}

	enable(softToken?: string) {
		const data: IEnablementCheckbook = {
			account: {
				type: this.enableForm.value.account.type,
				number: this.enableForm.value.account.number
			},
			initialNumber: this.enableForm.value.initialNumber,
			lastNumber: this.enableForm.value.lastNumber
		}
		return this.checkbooksService.enableCheckbook(data, softToken).pipe(
			tap((response) => {
				if (response.success) {
					this.sidenavService.nextStep({
						title: this.translateService.instant(
							'pages.checkbooks.checkbooks.enableCheckbook'
						),
						component: EnableCheckbookConfirmComponent,
						data: response
					});
				} else {
					this.handleEnableError(response);
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				this.handleEnableError(errorResponse.error);
				return of(errorResponse.error);
			})
		);
	}

	handleEnableError(response: IEnablementCheckbookResponse) {
		const errorHandled = this.softTokenService.handleErrors(response, (token: string) => this.enable(token), 'enableCheckbook');
		if (!errorHandled) {
			if (response.status[0].code === MISSING_SIGNATURE.CHECKBOOK) {
				this.sidenavService.onError(
					() => this.sidenavService.close(), 
					{ 
						subtitle: this.translateService.instant('pages.checkbooks.enableCheckbook.ErrorDescription'),
						message: response.status[0].message, 
						actionLabel: this.translateService.instant('pages.checkbooks.enableCheckbook.ErrorAction'),
					}
				);
			}
		}
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}
}
