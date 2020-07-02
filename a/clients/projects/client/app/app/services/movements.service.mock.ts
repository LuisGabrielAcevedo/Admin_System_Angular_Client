import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IMovementsResponse, IMovementDetailResponse, IAccountMovement, IAccountMovementState, makeAccountMovementState } from 'client/app/app/modules/accounts/models';
import { IAccount } from 'client/app/app/models';

@Injectable()
export class MovementsServiceMock {
	private movementsSubject = new BehaviorSubject<IAccountMovementState>(makeAccountMovementState({}));

	getMovements(_account: IAccount): Observable<IMovementsResponse> {
		return new Observable();
	}

	getMovementDetail(_movement: IAccountMovement, _account: IAccount): Observable<IMovementDetailResponse> {
		return new Observable();
	}

	exportToCSV(){}

	updateMovementsState(_data: Partial<IAccountMovementState>) {}

	getMovementsState(): BehaviorSubject<IAccountMovementState> {
		return this.movementsSubject;
	}

	findMovements(_account: IAccount): Observable<boolean> {
		return new Observable();
	}
}
