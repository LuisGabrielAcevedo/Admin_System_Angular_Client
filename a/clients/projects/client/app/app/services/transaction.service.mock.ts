import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactionState, ITransactionsResponse, ITransactionsErrors, IRequest } from 'client/app/app/models';

@Injectable()
export class TransactionServiceMock {

	updateTransactionState(_data: Partial<ITransactionState>) {
		return new Observable();
	}

	getTransactionState(): Observable<ITransactionState> {
		return new Observable();
	}

	sign(): Observable<ITransactionsResponse> {
		return new Observable();
	}

	cancel(): Observable<ITransactionsResponse> {
		return new Observable();
	}

	reject(_request: IRequest, _reason: string): Observable<ITransactionsResponse> {
		return new Observable();
	}

	transactionsWithErrros() {
		return []
	}

	hasErrors() {
		return 0;
	}

	getErrors(): ITransactionsErrors {
		return {};
	}

	resetState(): void {}
}
