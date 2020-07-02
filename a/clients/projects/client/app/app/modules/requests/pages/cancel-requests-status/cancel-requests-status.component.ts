import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITransaction, ITransactionsErrors } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { RequestsService } from 'client/app/app/services/requests.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
	selector: 'mcy-cancel-requests-status',
	templateUrl: './cancel-requests-status.component.html',
	styleUrls: ['./cancel-requests-status.component.scss'],
})
export class CancelRequestsStatusComponent implements OnInit, OnDestroy {
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
			.subscribe(state => {
				this.transactions = state.lastTransactions;
				this.errors = this.transactionService.hasErrors();
				this.formattedErrors = this.transactionService.getErrors();
				this.requestsService.resetSelectedState();
				this.transactionService.resetState();
			})
		)
	}

	requests() {
		return this.transactions.map(transaction => transaction.transaction);
	}

	title() {
		return this.errors === this.transactions.length
			? this.translateService.instant('pages.requests.cancelStatus.errorTitle')
			: this.translateService.instant('pages.requests.cancelStatus.successTitle');
	}

	description() {
		return this.errors
			? this.translateService.instant('pages.requests.cancelStatus.errorDescriptionMessage')
			: this.translateService.instant('pages.requests.cancelStatus.successDescriptionMessage');
	}

	goToLanding() {
		this.router.navigateByUrl('app/requests');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
