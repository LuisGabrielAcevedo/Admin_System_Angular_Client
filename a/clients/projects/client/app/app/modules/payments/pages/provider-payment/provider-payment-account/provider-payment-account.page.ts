import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount, IAccountState, makeAccountState, IProviderPaymentState, makeProviderPaymentState } from 'client/app/app/models';
import { AccountService } from 'client/app/app/services/account.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { makeFlowExitModal } from 'client/app/signup/models/modal';

@Component({
	templateUrl: './provider-payment-account.page.html',
	styleUrls: ['./provider-payment-account.page.scss']
})
export class ProviderPaymentAccountPage implements OnInit, OnDestroy {
	public sourceAccountsForm: FormGroup;
	public sourceAccounts: IAccount[] = [];
	public accounts: IAccount[] = [];
	public dayInput: string = '';
	private subscription: Subscription = new Subscription();
	public accountState: IAccountState = makeAccountState({});
	public providerPaymentState: IProviderPaymentState = makeProviderPaymentState({});

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private accountService: AccountService,
		private providerPaymentService: ProviderPaymentService,
		private modalService: ModalService,
		private translateService: TranslateService,
	) {
		this.sourceAccountsForm = this.fb.group({
			sourceAccount: [null, Validators.required],
		})
	}

	ngOnInit() {
		this.accountService.findAccounts();
		this.subscription.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.accountState = state;
				this.subscription.add(this.providerPaymentService.getProviderPaymentState().subscribe((providerPaymentState: IProviderPaymentState) => {
					this.providerPaymentState = providerPaymentState;
					if (this.providerPaymentState.newProviderPaymentFormValue.sourceAccount.number.length) {
						this.sourceAccountsForm.get('sourceAccount')!.patchValue(this.providerPaymentState.newProviderPaymentFormValue.sourceAccount);
					}
				}));
				this.accounts = this.filterValidAccounts;
				this.sourceAccounts = this.accounts;
			})
		);
	}

	retryGetAccounts() {
		this.accountService.findAccounts();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get filterValidAccounts(): IAccount[] {
		const userInputBalance = this.providerPaymentService.getProviderPaymentState().value.newProviderPaymentFormValue.amount;
		return this.accountState.accounts.filter(account => {
			let balance = 0;
			if (account.balance) {
				balance = account.balance;
			}
			return balance >= userInputBalance && account.currency.symbol === this.providerPaymentState.newProviderPaymentFormValue.currency.symbol;
		});
	}

	back() {
		this.router.navigate(['/app/payments/provider/amount']);
	}

	next() {
		const providerPaymentValue = this.providerPaymentService.getProviderPaymentState().value.newProviderPaymentFormValue;
		this.providerPaymentService.updateProviderPaymentState({
			newProviderPaymentFormValue: {
				...providerPaymentValue,
				sourceAccount: this.sourceAccountsForm.getRawValue().sourceAccount
			}
		});
		this.router.navigate(['/app/payments/provider/confirmation']);
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	onCancel() {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.payments.providers.exitModal.title'),
			description: this.translateService.instant('pages.payments.providers.exitModal.description'),
			cancel: this.translateService.instant('pages.payments.providers.exitModal.cancel'),
			confirm: this.translateService.instant('pages.payments.providers.exitModal.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				this.goToLanding();
			}
		}));
	}
}
