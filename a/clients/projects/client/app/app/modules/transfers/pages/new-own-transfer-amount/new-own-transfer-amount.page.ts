import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';
import { ITransfer, makeTransfer, ITransferState, makeTransferState } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IAmountTransferForm } from 'client/app/app/modules/transfers/models/transfers';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';

@Component({
	templateUrl: './new-own-transfer-amount.page.html',
	styleUrls: ['./new-own-transfer-amount.page.scss']
})
export class NewOwnTransferAmountPage implements OnInit, OnDestroy  {
	public subscription = new Subscription();
	public complete: boolean = false;
	public lastTransfer: ITransfer = makeTransfer({});
	public lastTransferDate: string = '';
	public balance = {
		amount: 0,
		description: ''
	};
	public transferState: ITransferState = makeTransferState({});

	constructor(
		private router: Router,
		private transferService: TransferService,
		private utilsService: UtilsService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
			this.balance.amount = this.transferState.newTransferFormValue.amount;
			this.balance.description = this.transferState.newTransferFormValue.paymentDescription;
		}));
		this.setLastTransfer();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	back() {
		this.router.navigate(['/app/transfers/ownTransferAccounts']);
	}

	next() {
		this.router.navigate(['/app/transfers/ownTransferSummary']);
		this.transferState.newTransferFormValue.amount = this.balance.amount;
		this.transferState.newTransferFormValue.paymentDescription = this.balance.description;
		this.transferService.updateTransferState(this.transferState);
	}

	setLastTransfer() {
		// TODO: Set real last Trasfer data
		this.lastTransferDate = this.utilsService.formatDate(this.lastTransfer.date);
		this.lastTransfer.currency = this.transferState.newTransferFormValue.sourceAccount.currency;
	}

	setBalance(value: IAmountTransferForm) {
		this.balance = value;
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
