import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { CONTRAINTS } from 'client/app/app/constants';
import { Router } from '@angular/router';
import { IAccount, makeAccount, makeTransferState, ITransferState } from 'client/app/app/models';
import { TransferService } from 'client/app/app/services/transfer.service';
import { IAmountTransferForm } from 'client/app/app/modules/transfers/models/transfers';
import { AccountType } from 'client/app/app/models/account';
import { Subscription } from 'rxjs';


@Component({
	selector: 'mcy-select-transfer-amount',
	templateUrl: './select-transfer-amount.component.html',
	styleUrls: ['./select-transfer-amount.component.scss']
})
export class SelectTransferamountComponent implements OnInit, OnDestroy {
	@Input() complete: boolean = false;
	@Output() changeValidation = new EventEmitter();
	@Output() changeBalance = new EventEmitter();
	public amountForm: FormGroup;
	public sourceAccount: IAccount = makeAccount({});
	public destinationAccount: IAccount = makeAccount({});
	public descriptionMaxlength = CONTRAINTS.TRANSFER.PAYMENT_DESCRIPTION.MAX_LENGTH;
	public balanceValidators: ValidatorFn[] = [];
	public descriptionValidators: ValidatorFn[] = [];
	public transferState: ITransferState = makeTransferState({});
	public subscription = new Subscription();

	constructor(
		private router: Router,
		private transferService: TransferService
	) {
		this.amountForm = new FormGroup({});
	}

	ngOnInit() {
		this.setAccountState();

		// TODO potential bug! review, balance can be null!
		let balance = 0;
		if (this.sourceAccount.balance) {
			balance = this.sourceAccount.balance;
		}

		this.balanceValidators = [
			Validators.required, Validators.min(0), Validators.max(balance)
		];
		this.descriptionValidators = [
			Validators.maxLength(this.descriptionMaxlength),
			Validators.pattern(CONTRAINTS.TRANSFER.PAYMENT_DESCRIPTION.PATTERN)
		];

		this.amountForm = new FormGroup({
			amount: new FormControl(this.transferState.newTransferFormValue.amount, this.balanceValidators),
			description: new FormControl(this.transferState.newTransferFormValue.paymentDescription, this.descriptionValidators)
		});

		this.subscription.add(this.amountForm.statusChanges.subscribe(
			value => this.changeValidation.emit(value === 'VALID')
		));

	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	backToEdit() {
		this.router.navigate(['/app/transfers/ownTransferAccounts']);
	}

	setAccountState() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
		}));
		this.sourceAccount = this.transferState.newTransferFormValue.sourceAccount;
		this.destinationAccount = this.transferState.newTransferFormValue.destinationAccount;
	}

	updateAccount(value: IAmountTransferForm) {
		this.changeBalance.emit(value);
	}

	formattedAccountType(account: AccountType): string {
		return account;
	}

}
