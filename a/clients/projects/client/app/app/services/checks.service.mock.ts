import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	IChecksIssuedResponse,
	IAccount,
	IChecksDiscountedResponse,
	IChecksReceivedResponse,
	ICheckState,
} from 'client/app/app/models';

@Injectable()
export class ChecksServiceMock {
	getChecksIssued(_account: IAccount): Observable<IChecksIssuedResponse> {
		return new Observable();
	}

	getChecksReceived(_account: IAccount): Observable<IChecksReceivedResponse> {
		return new Observable();
	}

	getChecksDiscounted(
		_account: IAccount
	): Observable<IChecksDiscountedResponse> {
		return new Observable();
	}

	getCheckState(): Observable<ICheckState> {
		return new Observable();
	}

	updateCheckState(_data: Partial<ICheckState>) {}

	findChecksIssued(_account: IAccount): void {}

	findChecksReceived(_account: IAccount): void {}

	findChecksDiscounted(): void {}

	resetState() {}
}
