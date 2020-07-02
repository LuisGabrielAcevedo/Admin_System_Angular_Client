import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import { IAccount } from 'client/app/app/models';
import { IStatementResponse } from 'client/app/app/modules/accounts/models';
import { IStatementPdfResponse, IStatement, IStatementsState, makeStatementsState } from 'client/app/app/modules/accounts/models/statement';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StatementsService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IStatementsState>(makeStatementsState({}));
	public subscription: Subscription;

	constructor(
		public eventService: EventService,
		private dataService: DataService)
	{
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getStatements(account: IAccount): Observable<IStatementResponse> {
		return this.dataService.get('v1/statements/directories', {
			params: {
				accountNumber: account.number
			}
		});
	}

	getStatement(statement: IStatement, account: IAccount): Observable<IStatementPdfResponse> {
		return this.dataService.get(`v1/statements/statements/${statement.id}`, {
			params: {
				accountNumber: account.number
			}
		});
	}

	findStatements(account: IAccount): Observable<boolean> {
		this.updateStatementsState({ loading: true });
		return this.getStatements(account).pipe(
			map((res: IStatementResponse) => {
				if (res.success && res.data) {
					this.updateStatementsState({
						statements: res.data,
						searched: true,
						loading: false,
						hasErrorStatements: false,
						selectedAccount: account });
					return true;
				} else {
					this.updateStatementsState({
						searched: true,
						loading: false,
						hasErrorStatements: true,
						selectedAccount: null });
					return false
				}

			}),
			catchError(() => {
				this.updateStatementsState({
					searched: true,
					loading: false,
					hasErrorStatements: true,
					selectedAccount: null });
				return of(false);
			})
		);
	}

	updateStatementsState(data: Partial<IStatementsState>) {
		this.subject.next(
			makeStatementsState({ ...this.getStatementsState().value, ...data })
		);
	}

	getStatementsState(): BehaviorSubject<IStatementsState> {
		return this.subject;
	}

	resetState(){
		this.updateStatementsState(makeStatementsState({}));
	}
}
