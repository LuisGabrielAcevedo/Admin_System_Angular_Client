import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'client/app/app/services/account.service';
import { IAccountState, makeAccountState, ITransferState, makeTransferState, makeTransferFormValue } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TransferService } from 'client/app/app/services/transfer.service';

@Component({
	templateUrl: './transfer-type-selection.page.html',
	styleUrls: ['./transfer-type-selection.page.scss']
})
export class TransferTypeSelectionPage implements OnInit, OnDestroy {
	public accountState: IAccountState = makeAccountState({});
	public transferState: ITransferState = makeTransferState({});
	private subscription: Subscription = new Subscription();

	constructor(
		private router: Router,
		private transferService: TransferService,
		private accountService: AccountService
	) {}

	ngOnInit() {
		this.transferService.updateTransferState({
			lastTransfer: null,
			newTransferFormValue: makeTransferFormValue({}),
		});
		this.accountService.findAccounts();
		this.subscription.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.accountState = state;
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	goToLanding() {
		this.router.navigate(['/app/transfers']);
	}

	goToOwnAccountTransfers() {
		this.router.navigate(['/app/transfers/ownTransferAccounts']);
	}

	goToThirdPartyTransfers() {
		this.router.navigate(['app/transfers/thirdPartyTransferContact']);
	}

	get isOwnAccountTransfersEnabled(): boolean {
		return this.accountService.hasMultipleSameCurrencyAccounts;
	}
}
