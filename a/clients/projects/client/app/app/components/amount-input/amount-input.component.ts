import { Component, Input, forwardRef, OnDestroy, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	ControlValueAccessor,
	Validator,
	FormControl,
	FormBuilder,
	ValidatorFn,
	Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { IValidatorMessage } from '@mcy/main/components/input/input.component';
const currencyMaskConfig: CurrencyMaskConfig = {
	align: 'left',
	allowNegative: false,
	decimal: ',',
	precision: 2,
	prefix: '',
	suffix: '',
	thousands: '.'
};

@Component({
	selector: 'mcy-amount-input',
	templateUrl: './amount-input.component.html',
	styleUrls: ['./amount-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AmountInputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => AmountInputComponent),
			multi: true
		}
	]
})
export class AmountInputComponent
	implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
	@Input() public currency = '';
	@Input() public label = '';
	@Input() public id: string = '';
	@Input() public maxLength = 80;
	@Input() public required: boolean = false;
	@Input() public validators: ValidatorFn[] = [];
	@Input() validatorMessage : IValidatorMessage = {};
	@Output() handleChange = new EventEmitter();
	public amount: FormControl;
	public subscription = new Subscription();
	public currencyOptions = { ...currencyMaskConfig };
	constructor(private fb: FormBuilder) {
		this.amount = this.fb.control(null);
	}

	ngOnInit() {
		this.amount.setValidators([...this.validators, Validators.min(0.01)]);
		this.currencyOptions.prefix = `${this.currency} `;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.currency && changes.currency.currentValue) {
			this.currencyOptions.prefix = `${changes.currency.currentValue} `;
		}
		if (changes.validators && changes.validators.currentValue) {
			setTimeout(() => {
				this.amount.setValidators([...changes.validators.currentValue, Validators.min(0.01)]);
				this.amount.updateValueAndValidity();
			}, 0);
		}
	}

	public onTouched: () => void = () => {};

	writeValue(value: number | string): void {
		this.amount.patchValue(value);
	}

	registerOnChange(fn: any): void {
		this.subscription.add(this.amount.valueChanges.subscribe(fn));
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.amount.disable() : this.amount.enable();
	}

	validate() {
		return this.amount.errors;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onChange(value: string) {
		this.handleChange.emit(value);
	}

	get errors(): string[] {
		const errors = this.amount.errors;
		if (errors) {
			return Object.keys(errors);
		}
		return [];
	}
}
