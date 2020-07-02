import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAccount, makeAccountState, IAccountState, ITransferState, makeTransferState, ITransferFormValue } from 'client/app/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import groupBy from 'lodash/groupBy';

@Component({
	selector: 'mcy-select-own-accounts-transfer',
	templateUrl: './select-own-accounts-transfer.component.html',
	styleUrls: ['./select-own-accounts-transfer.component.scss']
})
export class SelectOwnAccountsTransferComponent implements OnInit {
	@Input() complete: boolean = false;
	@Input() transferState: ITransferState = makeTransferState({});
	@Output() changeValidation = new EventEmitter();
	@Output() changeSelection = new EventEmitter();
	public accountForm: FormGroup;
	public sourceAccounts: IAccount[] = [];
	public destinationAccounts: IAccount[] = [];
	public accounts: IAccount[] = [];
	private subscription: Subscription = new Subscription();
	public accountState: IAccountState = makeAccountState({});


	constructor(private fb: FormBuilder, private accountService: AccountService) {
		this.accountForm = this.fb.group({
			sourceAccount: [null, Validators.required],
			destinationAccount: [null, Validators.required]
		});
	}

	ngOnInit() {
		this.subscription.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.accountState = state;
				this.accounts = this.filterValidAccounts(state.accounts);
				this.sourceAccounts = this.accounts;
				this.destinationAccounts = this.accounts;
				this.setAccountsState(this.transferState.newTransferFormValue);
			})
		);
		this.setFormWatcher();
	}

	setFormWatcher() {
		this.subscription.add(
			this.accountForm.statusChanges.subscribe(
				value => this.changeValidation.emit(value === 'VALID')
			)
		);
	}

	setAccountsState(accountState: ITransferFormValue) {
		let sourceAccount: IAccount | null = null;
		let destinationAccount: IAccount | null = null;
		if (!!accountState.sourceAccount.number.length && !!accountState.destinationAccount.number.length) {
			sourceAccount = accountState.sourceAccount;
			destinationAccount = accountState.destinationAccount;
		}
		this.accountForm.get('sourceAccount')!.patchValue(sourceAccount);
		this.accountForm.get('destinationAccount')!.patchValue(destinationAccount);
		if (sourceAccount && destinationAccount) {
			this.changeAccount(sourceAccount, 'sourceAccounts');
			this.changeAccount(destinationAccount, 'destinationAccounts');
		}
	}

	changeAccount(value: IAccount, type: 'sourceAccounts' | 'destinationAccounts') {
		const otherType =  type === 'sourceAccounts' ? 'destinationAccounts' : 'sourceAccounts';
		this[otherType] = this.accounts.filter(account =>
			(account.number !== value.number) && (account.currency.code === value.currency.code)
		);
		this.changeSelection.emit(this.accountForm.value);
	}

	filterValidAccounts(accounts: IAccount[]): IAccount[] {
		let filteredAccounts: IAccount[] = [];
		const groupedAccounts = groupBy(accounts, (account) => {
			return account.currency.code;
		});
		for (const currencyCode in groupedAccounts) {
			if (groupedAccounts[currencyCode].length > 1) {
				filteredAccounts = filteredAccounts.concat(groupedAccounts[currencyCode]);
			}
		}
		return filteredAccounts;
	}
}
