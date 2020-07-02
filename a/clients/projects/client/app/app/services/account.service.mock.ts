import { OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAccountState, IAccountsResponse, IAccountAliasRequest, IAccountResponse, IAccount } from 'client/app/app/models';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IBalanceDetailState, makeBalanceDetailState } from 'client/app/app/models/account';

export class AccountServiceMock implements OnDestroy {
	private subjectBalanceDetail = new BehaviorSubject<IBalanceDetailState>(makeBalanceDetailState({}));

	ngOnDestroy(): void {}

	findAccounts(): void { }

	get hasMultipleSameCurrencyAccounts(): boolean {
		return false;
	}

	updateAccountState(_data: Partial<IAccountState>) {}

	getAccountState(): Observable<IAccountState> {
		return new Observable();
	}

	getAccounts(): Observable<IAccountsResponse> {
		return new Observable();
	}

	editAlias(_account: IAccountAliasRequest): Observable<IAccountResponse> {
		return new Observable();
	}


	duplicateAliasValidator(): ValidatorFn {
		return (_control: AbstractControl): ValidationErrors | null => {
			return null;
		}
	}

	changeAlias(_account: IAccountAliasRequest): Observable<IAccountResponse> {
		return new Observable();
	}

	findBalanceDetail(_account: IAccount): Observable<boolean> {
		return new Observable();
	}

	updateBalanceDetailState(_data: Partial<IBalanceDetailState>) {
	}

	getBalanceDetailState(): BehaviorSubject<IBalanceDetailState> {
		return this.subjectBalanceDetail;
	}
}
