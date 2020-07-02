import { Injectable } from '@angular/core';
import { ITransferState, ITransfersResponse, makeTransferState, INewTransfer, makeNewTransfer, IRequest, ITransferResponse } from 'client/app/app/models';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TransferServiceMock {
	private subject = new BehaviorSubject<ITransferState>(makeTransferState({}));

	updateTransferState(_data: Partial<ITransferState>) {
		return new Observable();
	}

	getTransferState(): BehaviorSubject<ITransferState> {
		return this.subject;
	}

	getTransfers(): Observable<ITransfersResponse> {
		return new Observable();
	}

	getTransferById(_id: string, _conceptId: string): Observable<ITransferResponse> {
		return new Observable();
	}

	submitTransfer(_data: INewTransfer): Observable<boolean> {
		return new Observable();
	}

	submitRequestTransfer(_data: INewTransfer): Observable<IRequest> {
		return new Observable();
	}

	getNewTransferFromForm(): INewTransfer {
		return makeNewTransfer({});
	}

	findTransfers(): void {}
}
