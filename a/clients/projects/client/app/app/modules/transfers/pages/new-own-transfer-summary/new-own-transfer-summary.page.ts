import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import {
	ITransferState,
	makeTransferState,
	IAccount,
	makeAccount,
	makeTransferFormValue,
	ITransferFormValue } from 'client/app/app/models';
import { AccountType } from 'client/app/app/models/account';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';

@Component({
	templateUrl: './new-own-transfer-summary.page.html',
	styleUrls: ['./new-own-transfer-summary.page.scss']
})
export class NewOwnTransferSummaryPage implements OnInit, OnDestroy {
	public transfer: ITransferFormValue = makeTransferFormValue({});
	public transferState: ITransferState = makeTransferState({});
	public sourceAccount: IAccount = makeAccount({});
	public destinationAccount: IAccount = makeAccount({});
	public subscription = new Subscription();
	constructor(
		private router: Router,
		private transferService: TransferService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
			this.transfer = transferState.newTransferFormValue;
			this.sourceAccount = transferState.newTransferFormValue.sourceAccount;
			this.destinationAccount = transferState.newTransferFormValue.destinationAccount;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	back() {
		this.router.navigate(['/app/transfers/ownTransferAmount']);
	}

	submitTransfer() {
		const transferFinal = this.transferService.getNewTransferFromForm();
		this.subscription.add(
			this.transferService.submitRequestTransfer(transferFinal).subscribe(res => {
				if (res.success) {
					this.router.navigate(['/app/transfers/success']);
				} else {}
			})
		);
	}

	backToEditAccount() {
		this.router.navigate(['/app/transfers/ownTransferAccounts']);
	}

	backToEditBalance() {
		this.router.navigate(['/app/transfers/ownTransferAmount']);
	}

	formattedAccountType(account: AccountType) {
		return account;
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
