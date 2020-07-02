import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { IAccount, makeCheckState, ICheckState, IAccountState, makeAccountState } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import { ChecksService } from 'client/app/app/services/checks.service';

@Component({
	selector: 'mcy-checkbooks-landing',
	templateUrl: './checkbooks-landing.component.html',
	styleUrls: ['./checkbooks-landing.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckbooksLandingComponent implements OnInit, OnDestroy {
	private pesosCode = '032';
	public subscription: Subscription = new Subscription();
	public accountList: IAccount[] = [];
	public checkState: ICheckState = makeCheckState({});
	public accountsState : IAccountState = makeAccountState({});
	constructor(
		private accountService: AccountService,
		private checksService: ChecksService,
	) {}

	ngOnInit() {
		this.loadAccounts();
		this.subscription.add(this.checksService.getCheckState().subscribe(state => {
			this.checkState = state;
		}));
	}

	loadAccounts() {
		this.accountService.findAccounts();
		this.subscription.add(
			this.accountService.getAccountState()
				.subscribe(state => {
					this.accountsState = state;
					this.accountList = state.accounts.filter(account => account.currency.code === this.pesosCode)
				})
		)
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
