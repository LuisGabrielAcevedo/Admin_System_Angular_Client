import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAccount } from 'client/app/app/models';
import { IStatementResponse } from 'client/app/app/modules/accounts/models';
import { makeStatementsState, IStatementsState } from 'client/app/app/modules/accounts/models/statement';
@Injectable()
export class StatementsServiceMock {
	private movementsSubject = new BehaviorSubject<IStatementsState>(makeStatementsState({}));
	getStatements(_account: IAccount): Observable<IStatementResponse> {
		return new Observable();
	}

	getStatementsState(): BehaviorSubject<IStatementsState> {
		return this.movementsSubject;
	}

	findStatements(_account: IAccount): Observable<boolean> {
		return new Observable();
	}

	updateStatementsState(_data: Partial<IStatementsState>) {
	}
}