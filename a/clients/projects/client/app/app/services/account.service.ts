import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription, Observable, of } from 'rxjs';
import {
	IAccountState,
	makeAccountState,
	IAccountsResponse,
	IAccount,
	IAccountBalanceByCurrency,
	IBalanceDetailResponse,
	IAccountAliasRequest,
} from 'client/app/app/models';
import { DataService } from '@mcy/core/services/data.service';
import groupBy from 'lodash/groupBy';
import { StorageService } from '@mcy/main/services/storage.service';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { IBalanceDetailState, makeBalanceDetailState, IAccountAliasResponse } from 'client/app/app/models/account';
import { SAME_ALIAS_ERROR_STATUS, DUPLICATED_ALIAS_ERROR_STATUS } from 'client/app/app/constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AccountService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IAccountState>(makeAccountState({}));
	public subjectBalanceDetail = new BehaviorSubject<IBalanceDetailState>(makeBalanceDetailState({}));
	public subscription: Subscription;

	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private storage: StorageService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	findAccounts(): void {
		if (!this.getAccountState().value.loading) {
			this.updateAccountState({ loading: true });
			this.subscription.add(
				this.getAccounts().subscribe(
					(res: IAccountsResponse) => {
						if (res.success && res.data.length) {
							this.updateAccountState({
								accounts: res.data,
								searchedAccounts: true,
								loading: false,
								hasErrorAccounts: false
							});
						} else {
							this.updateAccountState({
								searchedAccounts: true,
								loading: false,
								hasErrorAccounts: true });
						}
					},
					() => {
						this.updateAccountState({
							searchedAccounts: true,
							loading: false,
							hasErrorAccounts: true });
					}
				)
			);
		}
	}

	findBalanceDetail(account: IAccount): Observable<boolean> {
		this.updateBalanceDetailState({ loadingBalance: true })
		return this.getbalanceDetail(account).pipe(
			map((res: IBalanceDetailResponse) => {
				if (res.success && res.data) {
					this.updateBalanceDetailState(
						{ 	balanceDetail: res.data,
							searchedBalance: true,
							loadingBalance: false,
							hasErrorBalance: false,
							selectedAccount: account });
					return true;
				} else {
					this.updateBalanceDetailState(
						{ 	searchedBalance: true,
							loadingBalance: false,
							hasErrorBalance: true,
							selectedAccount: null });
					return false;
				}
			}),
			catchError(() => {
				this.updateBalanceDetailState(
					{	searchedBalance: true,
						loadingBalance: false,
						hasErrorBalance: true,
						selectedAccount: null });
				return of(false);
			})
		);
	}

	get hasMultipleSameCurrencyAccounts(): boolean {
		const accounts = this.getAccountState().value.accounts;
		const groupedAccountsByCurrency = groupBy(
			accounts,
			account => account.currency.code
		);
		for (const currency in groupedAccountsByCurrency) {
			if (groupedAccountsByCurrency[currency].length > 1) {
				return true;
			}
		}
		return false;
	}

	get totalBalanceByCurrency(): IAccountBalanceByCurrency[] {
		const accountsGroupByCurrency = groupBy(
			this.getAccountState().value.accounts,
			(account: IAccount) => account.currency.symbol
		);
		const currencyCodes = Object.keys(accountsGroupByCurrency);
		const totalBalances: IAccountBalanceByCurrency[] = currencyCodes.map(
			currencyCode => {
				const balance = accountsGroupByCurrency[currencyCode]
					.map(account => account.balance || 0)
					.reduce(
						(totalBalance, currentBalance) => totalBalance + currentBalance
					);

				const accountBalance: IAccountBalanceByCurrency = {
					currency: currencyCode,
					balance
				};

				return accountBalance;
			}
		);

		return totalBalances;
	}

	updateAccountState(data: Partial<IAccountState>) {
		this.subject.next(
			makeAccountState({ ...this.getAccountState().value, ...data })
		);
	}

	updateBalanceDetailState(data: Partial<IBalanceDetailState>) {
		this.subjectBalanceDetail.next(
			makeBalanceDetailState({ ...this.getBalanceDetailState().value, ...data })
		);
	}

	getAccountState(): BehaviorSubject<IAccountState> {
		return this.subject;
	}

	getBalanceDetailState(): BehaviorSubject<IBalanceDetailState> {
		return this.subjectBalanceDetail;
	}

	getAccounts(): Observable<IAccountsResponse> {
		return this.dataService.get('v1/accounts/accounts', {
			params: {
				// TODO remove in the future
				documentNumber: this.storage.getData('documentNumber')
			}
		});
	}

	getbalanceDetail(account: IAccount): Observable<IBalanceDetailResponse> {
		return this.dataService.get(
			`v1/accounts/${account.number}/detailed-balance`
		);
	}

	editAlias(account: IAccountAliasRequest): Observable<IAccountAliasResponse> {
		return this.dataService.put('v1/accounts/alias', {
			body: account
		})
	}

	changeAlias(account: IAccountAliasRequest): Observable <IAccountAliasResponse>  {
		return this.editAlias(account).pipe(
			map((res: IAccountAliasResponse) => {
				if (res.success) {
					this.updateAccountState ({
						editAlias: {
							isAliasAlreadyInUse: false
						}
					});
					return res;
				} else {
					this.updateAccountState ({
						editAlias: {
							isAliasAlreadyInUse: true
						}
					});
					return res;
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				this.updateAccountState ({
					editAlias: {
						isAliasAlreadyInUse: true
					}
				});
				return of(errorResponse.error);
			})
		);
	}

	isDuplicatedAliasError(error: IAccountAliasResponse): boolean {
		const hasDuplicatedError = error.status.find((status)=>
			status.code.includes(DUPLICATED_ALIAS_ERROR_STATUS) || status.code.includes(SAME_ALIAS_ERROR_STATUS)
		);
		return !!hasDuplicatedError;
	}

	duplicateAliasValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			if (control.dirty) {
				this.updateAccountState({editAlias: {isAliasAlreadyInUse: false}});
				const value = control.value;
				control.reset();
				control.patchValue(value);
			} else {
				control.markAsTouched();
			}
			const isAliasAlreadyInUse = this.getAccountState().value.editAlias.isAliasAlreadyInUse;
			return !isAliasAlreadyInUse ? null : { duplicateAlias: {value: control.value} };
		}
	}


	resetState() {
		this.updateAccountState(makeAccountState({}));
	}
}
