import {
	Component,
	forwardRef,
	Input,
	OnDestroy,
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
	FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { MIN_DATE, MAX_DATE } from 'client/app/app/constants';
@Component({
	selector: 'mcy-date',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => DateComponent),
			multi: true
		}
	]
})
export class DateComponent
	implements OnDestroy, ControlValueAccessor, Validator {
	@Input() label: string = '';
	@Input() placeholder: string = '';
	@Input() validators: ValidatorFn[] = [];
	@Input() minDate: Date = MIN_DATE;
	@Input() maxDate: Date = MAX_DATE;
	@Input() icon: string = '';
	@Input() id: string = '';
	@Output() handleChange = new EventEmitter();
	subscription = new Subscription();
	dateField = new FormControl();
	constructor(private fb: FormBuilder) {
		this.dateField = this.fb.control(null);
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	writeValue(value: number | string): void {
		this.dateField.patchValue(value);
	}
	public onTouched: () => void = () => {};
	registerOnChange(fn: any): void {
		this.subscription = this.dateField.valueChanges.subscribe(fn);
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.dateField.disable() : this.dateField.enable();
	}
	validate(): ValidationErrors | null {
		return this.dateField.errors;
	}
	onChange(value: string) {
		this.handleChange.emit(value);
	}
}
