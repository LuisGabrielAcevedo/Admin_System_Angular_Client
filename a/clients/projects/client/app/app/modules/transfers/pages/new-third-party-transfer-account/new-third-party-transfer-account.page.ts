import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount, IAccountState, makeAccountState, ITransferState, makeTransferState } from 'client/app/app/models';
import { AccountService } from 'client/app/app/services/account.service';
import { Subscription } from 'rxjs';
import {
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';

import { TransferService } from 'client/app/app/services/transfer.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';

@Component({
	templateUrl: './new-third-party-transfer-account.page.html',
	styleUrls: ['./new-third-party-transfer-account.page.scss']
})
export class NewThirdPartyTransferAccountPage implements OnInit, OnDestroy {
	public sourceAccountsForm: FormGroup;
	public sourceAccounts: IAccount[] = [];
	public accounts: IAccount[] = [];
	public dayInput: string = '';
	private subscription: Subscription = new Subscription();
	public accountState: IAccountState = makeAccountState({});
	public transferState: ITransferState = makeTransferState({});

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private accountService: AccountService,
		private transferService: TransferService,
		private utilsService: UtilsService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {
		this.sourceAccountsForm = this.fb.group({
			sourceAccount: [null, Validators.required],
			executionDate: [{
				value: null,
				disabled: true
			}, Validators.required]
		})
	}

	ngOnInit() {
		this.accountService.findAccounts();
		this.subscription.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.accountState = state;
				this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
					this.transferState = transferState;
					if (this.transferState.newTransferFormValue.sourceAccount.number.length) {
						this.sourceAccountsForm.get('sourceAccount')!.patchValue(this.transferState.newTransferFormValue.sourceAccount);
						const formatedDate = this.utilsService.formatDate(this.transferState.newTransferFormValue.executionDate, false, 'dd-MM-yyyy');
						this.sourceAccountsForm.get('executionDate')!.patchValue(formatedDate);
					}
				}));
				this.accounts = this.filterValidAccounts;
				this.sourceAccounts = this.accounts;
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get filterValidAccounts(): IAccount[] {
		const userInputBalance = this.transferService.getTransferState().value.newTransferFormValue.amount;
		return this.accountState.accounts.filter(account => {

			let balance = 0;

			// TODO potential bug! review, balance can be null!
			if (account.balance) {
				balance = account.balance;
			}
			return balance >= userInputBalance && account.currency.symbol === this.transferState.newTransferFormValue.currency.symbol;
		});
	}

	onChangeSourceAccount() {
		this.sourceAccountsForm.patchValue({
			executionDate: this.utilsService.formatDate(new Date(), false, 'dd-MM-yyyy')
		});
	}

	back() {
		this.router.navigate(['/app/transfers/thirdPartyTransferAmount']);
	}

	next() {
		const transferFormValue = this.transferService.getTransferState().value.newTransferFormValue;
		this.transferService.updateTransferState({
			newTransferFormValue: {
				...transferFormValue,
				sourceAccount: this.sourceAccountsForm.getRawValue().sourceAccount,
				executionDate: new Date()
			}
		});
		this.router.navigate(['/app/transfers/thirdPartyTransferSummary']);
	}

	goToLanding() {
		this.router.navigate(['/app/transfers']);
	}

	goToSelectTransfer() {
		this.router.navigate(['/app/transfers/new']);
	}

	onCancel(goToLanding: boolean) {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.transfers.exitModal.thirdParty.title'),
			description: this.translateService.instant('pages.transfers.exitModal.thirdParty.description'),
			cancel: this.translateService.instant('pages.transfers.exitModal.thirdParty.cancel'),
			confirm: this.translateService.instant('pages.transfers.exitModal.thirdParty.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				goToLanding ? this.goToLanding() : this.goToSelectTransfer();
			}
		}));
	}
}
