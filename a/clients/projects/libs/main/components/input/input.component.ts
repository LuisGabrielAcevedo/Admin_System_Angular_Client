import {
	Component,
	Input,
	forwardRef,
	OnDestroy,
	OnChanges,
	SimpleChanges,
	EventEmitter,
	Output
} from '@angular/core';
import {
	FormControl,
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	Validator,
	ValidationErrors,
	ValidatorFn,
	FormBuilder,
	AsyncValidatorFn
} from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

export interface IValidatorMessage {
	[key: string]: string;
}

@Component({
	selector: 'mcy-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	]
})



export class InputComponent
	implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
	@Input() label: string = '';
	@Input() validatorMessage : IValidatorMessage = {};
	@Input() placeholder: string = '';
	@Input() type: string = 'text';
	@Input() required: boolean = false;
	@Input() validators: ValidatorFn[] = [];
	@Input() maxLength: number = 100;
	@Input() minLength: number = 0;
	@Input() icon: string = '';
	@Input() prefixIcon: string = '';
	@Input() prefixSufuix: string = 'matSuffix';
	@Input() id: string = '';
	@Input() asyncValidators: AsyncValidatorFn[] = []
	@Output() handleChange = new EventEmitter();

	public subscription = new Subscription();
	public showPasswordMask: boolean = true;

	inputField: FormControl;
	constructor(private fb: FormBuilder) {
		this.inputField = this.fb.control(null, this.validators, this.asyncValidators);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.validators && changes.validators.currentValue) {
			setTimeout(() => {
				this.inputField.setValidators(changes.validators.currentValue);
				this.inputField.updateValueAndValidity();
			}, 0);
		}
		if (changes.asyncValidators && changes.asyncValidators.currentValue) {
			setTimeout(() => {
				this.inputField.setAsyncValidators(changes.asyncValidators.currentValue);
				this.inputField.updateValueAndValidity();
			}, 0);
		}
	}

	writeValue(value: number | string): void {
		this.inputField.patchValue(value);
	}

	public onTouched: () => void = () => {};

	registerOnChange(fn: any): void {
		this.subscription = this.inputField.valueChanges.subscribe(fn);
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.inputField.disable() : this.inputField.enable();
	}

	validate(): ValidationErrors | null {
		return this.inputField.errors;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onChange(value: string) {
		this.handleChange.emit(value);
	}

	onPasswordIconClick() {
		this.showPasswordMask = !this.showPasswordMask;
	}

	get passwordIcon(): string {
		return this.showPasswordMask ? 'olho_inativo_outline' : 'olho_ativo_outline'
	}

	get passwordType(): string {
		if (this.showPasswordMask) {
			return 'password'
		} else {
			return 'text'
		}
	}

	get inputType(): string {
		if (this.type !== 'password') {
			return this.type;
		} else {
			return this.passwordType
		}
	}

	get errors(): string[] {
		const errors = this.inputField.errors;
		if (errors) {
			return Object.keys(errors);
		}
		return [];
	}
}
