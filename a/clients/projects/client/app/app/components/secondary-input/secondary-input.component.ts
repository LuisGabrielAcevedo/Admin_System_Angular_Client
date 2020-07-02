import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, Validator, ValidatorFn, FormControl, FormBuilder, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-secondary-input',
	templateUrl: './secondary-input.component.html',
	styleUrls: ['./secondary-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SecondaryInputComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SecondaryInputComponent),
			multi: true
		}
	]
})
export class SecondaryInputComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
	@Input() validators: ValidatorFn[] = [];
	@Input() clearButton = false;
	@Input() placeholder: string = '';
	@Input() icon: string = '';
	@Input() id: string = '';
	@Output() handleChange = new EventEmitter();
	@Output() handleEnterKey = new EventEmitter();
	@Output() handleClear = new EventEmitter();

	public formControl: FormControl;
	private subscription = new Subscription();

	constructor(private fb: FormBuilder) {
		this.formControl = this.fb.control(null);
	}

	onEnter() {
		this.handleEnterKey.emit();
	}

	onClear() {
		this.handleClear.emit();
	}

	onChange() {
		this.handleChange.emit();
	}

	ngOnInit() {
		this.formControl.setValidators(this.validators);
	}

	public onTouched: () => void = () => {};

	writeValue(value: number | string): void {
		this.formControl.patchValue(value);
	}

	registerOnChange(fn: any): void {
		this.subscription.add(this.formControl.valueChanges.subscribe(fn));
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.formControl.disable() : this.formControl.enable();
	}

	validate() {
		return this.formControl.errors;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get didSearch(): boolean {
		return this.formControl.value && this.formControl.value.length > 0;
	}
}
