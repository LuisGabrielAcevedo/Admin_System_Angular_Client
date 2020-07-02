import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IAccount } from 'client/app/app/models';
import { CURRENCIES } from 'client/app/app/constants';

@Component({
	selector: 'mcy-account-selector',
	templateUrl: './account-selector.component.html',
	styleUrls: ['./account-selector.component.scss']
})
export class AccountSelectorComponent implements OnInit {
	@Input() accountList: IAccount[] = [];
	@Input() title: string = '';
	@Input() isCensored: boolean = false;
	@Output() accountSelected: EventEmitter<IAccount> = new EventEmitter();
	@Input() id: string = '';

	public currentAccount: IAccount | null = null;
	public accountNameList: string[] = [];

	ngOnInit() {
		if (this.accountList.length) {
			let accoundDefault: IAccount = this.accountList[0];
			const pesosAccount = this.accountList.filter(account => account.currency.symbol === CURRENCIES[0].symbol)
			if (pesosAccount.length) {
				accoundDefault = pesosAccount.sort((account, otherAccount) =>
					account.balance !== undefined && otherAccount.balance  !== undefined
						? otherAccount.balance - account.balance
						: 0
				)[0]
			};
			this.selectAccount(accoundDefault);
		}
	}

	selectAccount(account: IAccount) {
		this.currentAccount = account;
		this.accountSelected.emit(account);
	}

	get accountNumber() {
		return this.currentAccount ? this.currentAccount.number : '';
	}
}
