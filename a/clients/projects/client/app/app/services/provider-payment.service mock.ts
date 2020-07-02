import { BehaviorSubject, Observable } from 'rxjs';
import { IProviderPaymentState, makeProviderPaymentState, ITransfersResponse, IRequestResponse } from '../models';
import { OnDestroy } from '@angular/core';

export class ProviderPaymentServiceMock implements OnDestroy {
	private subject = new BehaviorSubject<IProviderPaymentState>(makeProviderPaymentState({}));

	constructor() {}

	ngOnDestroy(): void {}

	getProviderPaymentState(): BehaviorSubject<IProviderPaymentState> {
		return this.subject;
	}

	updateProviderPaymentState(_data: Partial<IProviderPaymentState>) {}

	resetFormState() {}

	resetState() {}

	getProviderPayments(): Observable<ITransfersResponse> {
		return new Observable();
	}

	findProviderPayments() : void {};

	submitProviderPayment(): Observable<IRequestResponse> {
		return new Observable();
	}
}
