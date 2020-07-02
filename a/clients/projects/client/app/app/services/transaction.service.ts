import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITransactionState, makeTransactionState, ITransactionsResponse, ITransactionsErrors, IRequest } from 'client/app/app/models';
import { DataService } from '@mcy/core/services/data.service';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';

@Injectable()
export class TransactionService extends StatefulService {
	public subject = new BehaviorSubject<ITransactionState>(
		makeTransactionState({})
	);

	constructor(
		public eventService: EventService,
		private dataService: DataService,
	) {
		super(eventService);
	}

	updateTransactionState(data: Partial<ITransactionState>) {
		this.subject.next(
			makeTransactionState({
				...this.getTransactionState().value,
				...data,
			})
		);
	}

	getTransactionState(): BehaviorSubject<ITransactionState> {
		return this.subject;
	}

	sign(requestIds: string[], softToken?: string): Observable<ITransactionsResponse> {
		return this.dataService.patch('v1/transactions/transactions/signatures', {
			body: {
				transactionIds: requestIds
			},
			headers: {
				softToken: softToken ? softToken : null
			}
		});
	}

	cancel(requestIds: string[], softToken?: string): Observable<ITransactionsResponse> {
		return this.dataService.patch('v1/transactions/transactions/cancellations',
		{
			body: {
				transactionIds: requestIds
			},
			headers: {
				softToken: softToken ? softToken : null
			}
		});
	}

	reject(request: IRequest, reason: string, softToken?: string): Observable<ITransactionsResponse> {
		return this.dataService.patch(`v1/transactions/transactions/${request.id}/rejection`, {
			body: {
				reason
			},
			headers: {
				softToken: softToken ? softToken : null
			}
		});
	}

	transactionsWithErrros() {
		return this.getTransactionState().value.lastTransactions.filter(transaction => transaction.transactionStatus);
	}

	hasErrors() {
		return this.transactionsWithErrros().length;
	}

	getErrors(): ITransactionsErrors {
		const errors: ITransactionsErrors = {};
		this.getTransactionState().value.lastTransactions.forEach(transaction => {
			if (transaction.transactionStatus) {
				errors[transaction.transaction.id] = transaction.transactionStatus
			}
		});
		return errors;
	}

	resetState() {
		this.updateTransactionState(makeTransactionState({}));
	}
}
