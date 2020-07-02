import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITransaction, ITransactionsErrors } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { RequestsService } from 'client/app/app/services/requests.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
	selector: 'mcy-reject-requests-status',
	templateUrl: './reject-requests-status.component.html',
	styleUrls: ['./reject-requests-status.component.scss'],
})
export class RejectRequestsStatusComponent implements OnInit, OnDestroy {
	public transactions: ITransaction[] = [];
	public subscription = new Subscription();
	public errors: number = 0;
	public formattedErrors: ITransactionsErrors = {};
	constructor(
		private transactionService: TransactionService,
		private requestsService: RequestsService,
		private translateService: TranslateService,
		private router: Router
	) {}

	ngOnInit() {
		this.subscription.add(
			this.transactionService.getTransactionState()
			.pipe(first())
			.subscribe((state) => {
				this.transactions = state.lastTransactions;
				this.errors = this.transactionService.hasErrors();
				this.formattedErrors = this.transactionService.getErrors();
				this.requestsService.resetSelectedState();
				this.transactionService.resetState();
			})
		);
	}

	requests() {
		return this.transactions.map((transaction) => transaction.transaction);
	}

	title() {
		return this.errors
			? this.translateService.instant('pages.requests.rejectStatus.errorTitle')
			: this.translateService.instant('pages.requests.rejectStatus.successTitle');
	}

	description() {
		return this.errors
			? this.translateService.instant('pages.requests.rejectStatus.errorDescriptionMessage')
			: this.translateService.instant('pages.requests.rejectStatus.successDescriptionMessage');
	}

	goToLanding() {
		this.router.navigateByUrl('app/requests');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
