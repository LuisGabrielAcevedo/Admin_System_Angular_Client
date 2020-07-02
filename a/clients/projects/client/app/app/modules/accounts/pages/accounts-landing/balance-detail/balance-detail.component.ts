import { Component, Input, OnInit } from '@angular/core';
import { IAccount, makeAccount, IBalanceDetail, makeBalanceDetail } from 'client/app/app/models';
import { Subscription } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import { makeBalanceDetailState, IBalanceDetailState } from 'client/app/app/models/account';

@Component({
	selector: 'mcy-balance-detail',
	templateUrl: './balance-detail.component.html',
	styleUrls: ['./balance-detail.component.scss']
})
export class BalanceDetailComponent implements OnInit  {
	@Input() account: IAccount = makeAccount({});
	public balanceDetailState: IBalanceDetailState = makeBalanceDetailState({});
	public subscription: Subscription = new Subscription();
	public balanceDetail: IBalanceDetail | null = makeBalanceDetail({})

	constructor(
		private accountService: AccountService
	) {	}

	ngOnInit() {
		this.subscription.add(this.accountService.getBalanceDetailState().subscribe(state => {
			this.balanceDetailState = state;
			this.balanceDetail = this.balanceDetailState.balanceDetail;
		}));
	}

	onSubmitBalanceDetail() {
		this.subscription.add(
			this.accountService.findBalanceDetail(this.account).subscribe()
		);
	}
}
