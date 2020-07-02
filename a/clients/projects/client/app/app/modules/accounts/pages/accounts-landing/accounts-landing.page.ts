import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'client/app/app/services/account.service';
import { IAccountState,
		IAccount,
		makeAccountState,
		makeAccount,
		IAccountBalanceByCurrency,
		IBalanceDetail,
		makeBalanceDetail } from 'client/app/app/models';
import { AccountComponent } from './account/account.component';
import { IStatement, IAccountMovementState, makeAccountMovementState } from 'client/app/app/modules/accounts/models';
import { StatementsService } from 'client/app/app/services/statements.service';
import { Subscription } from 'rxjs';
import { MovementsService } from 'client/app/app/services/movements.service';
import { IStatementsState, makeStatementsState } from 'client/app/app/modules/accounts/models/statement';
import { IBalanceDetailState, makeBalanceDetailState } from 'client/app/app/models/account';


@Component({
	templateUrl: './accounts-landing.page.html',
	styleUrls: ['./accounts-landing.page.scss']
})
export class AccountsLandingPage implements OnDestroy, OnInit {
	public subscription: Subscription = new Subscription();
	public component = AccountComponent;
	public list: Array<IAccount> = [];
	public accountState: IAccountState = makeAccountState({});
	public account: IAccount = makeAccount({});
	public balanceDetail: IBalanceDetail = makeBalanceDetail({});
	public statements: IStatement[] = [];
	public statementsState: IStatementsState = makeStatementsState({});
	public movementsState: IAccountMovementState = makeAccountMovementState({});
	public balanceDetailState: IBalanceDetailState = makeBalanceDetailState({});

	constructor(
		private accountService: AccountService,
		private statementsService: StatementsService,
		private movementsService: MovementsService
	) {	}

	ngOnInit() {
		this.subscription.add(this.movementsService.getMovementsState().subscribe(state => {
			this.movementsState = state;
		}));

		this.subscription.add(this.accountService.getBalanceDetailState().subscribe(state => {
			this.balanceDetailState = state;
		}));

		this.subscription.add(this.statementsService.getStatementsState().subscribe(state => {
			this.statementsState = state;
		}));

		this.accountService.findAccounts();

		this.subscription.add(this.accountService.getAccountState().subscribe(state => {
			this.accountState = state;
			this.list = state.accounts;

			const selectedAccount =
				this.movementsState.selectedAccount ||
				this.balanceDetailState.selectedAccount ||
				this.statementsState.selectedAccount;

			if(selectedAccount) {
				this.onChangeAccount(selectedAccount);
			} else if (this.list.length) {
				this.onChangeAccount(this.list[0]);
			}
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get totalBalanceByCurrency(): IAccountBalanceByCurrency[] {
		return this.accountService.totalBalanceByCurrency;
	}

	onChangeAccount(account: IAccount) {
		this.account = account;

		if (this.balanceDetailState.selectedAccount !== this.account && !this.balanceDetailState.hasErrorBalance) {
			this.subscription.add(
				this.accountService.findBalanceDetail(this.account).subscribe()
			);
		}

		if (this.statementsState.selectedAccount !== this.account && !this.statementsState.hasErrorStatements) {
			this.subscription.add(
				this.statementsService.findStatements(this.account).subscribe()
			);
		}

		if (this.movementsState.selectedAccount !== this.account && !this.movementsState.hasMovementsErrors) {
			this.subscription.add(
				this.movementsService.findMovements(this.account).subscribe()
			);
		}
	}

	onSelected(account: IAccount) {
		this.accountService.updateBalanceDetailState({hasErrorBalance: false});
		this.statementsService.updateStatementsState({hasErrorStatements: false});
		this.movementsService.updateMovementsState({hasMovementsErrors: false});
		this.onChangeAccount(account);
	}

	onSubmitMovements() {
		this.subscription.add(
			this.movementsService.findMovements(this.account).subscribe()
		);
	}

	onSubmitAccounts() {
		this.subscription.add(
			this.accountService.findAccounts()
		);
	}
}
