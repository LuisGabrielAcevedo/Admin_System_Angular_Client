import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestsService } from 'client/app/app/services/requests.service';
import { IRequest, ITransaction } from 'client/app/app/models';
import { TransactionService } from 'client/app/app/services/transaction.service';

@Injectable()
export class LastTransactionsGuard implements CanActivate {
	constructor(
		private requestsService: RequestsService,
		private transactionService: TransactionService,
		private router: Router
	) {}

	get selectedRequests(): IRequest[] {
		return this.requestsService.getRequestsState().value.selectedRequests;
	}

	get lastTransactions(): ITransaction[] {
		return this.transactionService.getTransactionState().value.lastTransactions;
	}

	canActivate(): boolean {
		if (!this.selectedRequests.length || !this.lastTransactions.length) {
			this.router.navigateByUrl('app/requests');
		}
		return true;
	}
}
