import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import { makeAccount, ITransferState, makeTransferState } from 'client/app/app/models';
import { IAccountsTransferForm } from 'client/app/app/modules/transfers/models/transfers';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';

@Component({
	templateUrl: './new-own-transfer-accounts.page.html',
	styleUrls: ['./new-own-transfer-accounts.page.scss']
})
export class NewOwnTransferAccountsPage implements OnInit, OnDestroy {
	public complete: boolean = false;
	public subscription = new Subscription();
	public accounts = {
		sourceAccount: makeAccount({}),
		destinationAccount: makeAccount({}),
	};
	public transferState: ITransferState = makeTransferState({});

	constructor(
		private router: Router,
		private transferService: TransferService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
			const accountState = transferState.newTransferFormValue;
			this.complete = !!accountState.sourceAccount.number.length && !!accountState.destinationAccount.number.length;
			this.accounts.sourceAccount = accountState.sourceAccount;
			this.accounts.destinationAccount = accountState.destinationAccount;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	back() {
		this.router.navigate(['/app/transfers/new']);
	}

	next() {
		this.transferState.newTransferFormValue.sourceAccount = this.accounts.sourceAccount;
		this.transferState.newTransferFormValue.destinationAccount = this.accounts.destinationAccount;
		this.transferState.newTransferFormValue.amount = 0;
		this.transferState.newTransferFormValue.paymentDescription = '';
		this.transferService.updateTransferState(this.transferState);
		this.router.navigate(['/app/transfers/ownTransferAmount']);
	}

	setAccounts(value: IAccountsTransferForm) {
		this.accounts = value;
	}

	setValidation(value: boolean) {
		this.complete = value;
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
			title: this.translateService.instant('pages.transfers.exitModal.ownAccount.title'),
			description: this.translateService.instant('pages.transfers.exitModal.ownAccount.description'),
			cancel: this.translateService.instant('pages.transfers.exitModal.ownAccount.cancel'),
			confirm: this.translateService.instant('pages.transfers.exitModal.ownAccount.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				goToLanding ? this.goToLanding() : this.goToSelectTransfer();
			}
		}));
	}
}
