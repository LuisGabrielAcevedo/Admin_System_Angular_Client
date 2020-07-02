import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
	ISalaryPaymentState
} from 'client/app/app/modules/payments/models/salary-payment';
import { ITransferResponse, ITransfersResponse, INewTransfer } from 'client/app/app/models';

@Injectable()
export class SalaryPaymentServiceMock implements OnDestroy {
	ngOnDestroy(): void {}

	getSalaryPaymentState(): Observable<ISalaryPaymentState> {
		return new Observable();
	}

	updateSalaryPaymentState(_data: Partial<ISalaryPaymentState>) {}

	paySalary(_data: INewTransfer, _softToken: string): Observable<ITransferResponse> {
		return new Observable();
	}

	getSalaryPayments(): Observable<ITransfersResponse> {
		return new Observable();
	}

	findSalaryPayments(): void {}
}
