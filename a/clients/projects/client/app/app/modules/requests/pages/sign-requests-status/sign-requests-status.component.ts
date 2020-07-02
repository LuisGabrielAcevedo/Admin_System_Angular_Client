import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { ITransaction, ITransactionsErrors } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RequestsService } from 'client/app/app/services/requests.service';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
	selector: 'mcy-sign-requests-status',
	templateUrl: './sign-requests-status.component.html',
	styleUrls: ['./sign-requests-status.component.scss'],
})
export class SignRequestsStatusComponent implements OnInit, OnDestroy {
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
			? this.translateService.instant('pages.requests.signStatus.errorTitle')
			: this.translateService.instant('pages.requests.signStatus.successTitle');
	}

	description() {
		return this.errors
			? this.translateService.instant('pages.requests.signStatus.errorDescriptionMessage')
			: this.translateService.instant('pages.requests.signStatus.successDescriptionMessage');
	}

	goToLanding() {
		this.router.navigateByUrl('app/requests');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
