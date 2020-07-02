import { Component, OnInit, forwardRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import {
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	ControlValueAccessor,
	Validator,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ISelectOption {
	value: any;
	viewValue: string
}
@Component({
	selector: 'mcy-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SelectComponent),
			multi: true
		}
	]
})
export class SelectComponent
	implements OnInit, OnDestroy, ControlValueAccessor, Validator {
	@Input() public label = '';
	@Input() public id = '';
	@Input() public required = false;
	@Input() public data: ISelectOption[] = [];
	@Input() public suffix: string = '';
	@Input() public multiple :boolean = false;
	@Input() public selected : any[]=[];
	@Output() handleChange = new EventEmitter();
	public selectField: FormControl;
	public subscription = new Subscription();
	constructor(private fb: FormBuilder) {
		this.selectField = this.fb.control(null);
	}

	ngOnInit() {
		this.selectField.setValidators(this.required ? [Validators.required] : []);
	}

	public onTouched: () => void = () => {};

	writeValue(value: any): void {
		this.selectField.patchValue(value);
	}

	registerOnChange(fn: any): void {
		this.subscription = this.selectField.valueChanges.subscribe(fn);
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.selectField.disable() : this.selectField.enable();
	}

	validate() {
		return this.selectField.errors;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onChange() {
		this.handleChange.emit();
	}
}
