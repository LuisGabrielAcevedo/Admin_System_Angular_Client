import { IAccount } from 'client/app/app/models/account';
import { Component, Input, forwardRef, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import {
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	ControlValueAccessor,
	Validator,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { Utils } from '@mcy/main/polyfills';
import { Subscription } from 'rxjs';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-account-select',
	templateUrl: './account-select.component.html',
	styleUrls: ['./account-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AccountSelectComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => AccountSelectComponent),
			multi: true
		}
	]
})
export class AccountSelectComponent
	implements OnInit, OnDestroy, ControlValueAccessor, Validator {
	@Input() public accounts: IAccount[] = [];
	@Input() public label = '';
	@Input() public id: string = '';
	@Input() public balanceText = '';
	@Input() public required = false;
	@Input() public hiddenBalance = false;

	@Output() handleChange = new EventEmitter();
	public selectedAccount: FormControl;
	public subscription = new Subscription();
	constructor(
		private fb: FormBuilder,
		private utilService: UtilsService,
	) {
		this.selectedAccount = this.fb.control(null);
	}

	ngOnInit() {
		this.selectedAccount.setValidators(
			this.required
				? [Validators.required]
				: []
		);
	}

	public onTouched: () => void = () => {};

	writeValue(value: IAccount): void {
		this.selectedAccount.patchValue(value);
	}

	registerOnChange(fn: any): void {
		this.subscription.add(this.selectedAccount.valueChanges.subscribe(fn));
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.selectedAccount.disable() : this.selectedAccount.enable();
	}

	validate() {
		return this.selectedAccount.errors;
	}

	selectAccountLabel() {
		return this.selectedAccount.value ?
			this.formattedAccountType(this.selectedAccount.value) + ' ' +
			this.formatAccountNumber(this.selectedAccount.value.number)
			: '';
	}

	formatAccountNumber(accountNumber: string): string {
		return this.utilService.formatAccountNumber(accountNumber);
	}

	formattedAccountType(account: IAccount) {
		return account.type;
	}

	compareAccounts(account1: IAccount, account2: IAccount): boolean {
		return Utils.compareField('number', account1, account2);
	}

	formattedAccountAmount(): string {
		return this.selectedAccount.value
			? this.accountBalance(this.selectedAccount.value)
			: '';
	}

	accountBalance(account: IAccount) {
		return `${this.balanceText} ${account.currency.symbol} ${account.balance}`;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onChange(account: IAccount) {
		this.handleChange.emit(account);
	}
}
