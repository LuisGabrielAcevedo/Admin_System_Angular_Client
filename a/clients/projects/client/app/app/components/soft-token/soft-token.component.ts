import {
	Component,
	OnInit,
	ViewChild,
	forwardRef,
	Renderer2,
	ElementRef,
	OnDestroy,
	Input,
	ViewEncapsulation
} from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	FormGroup,
	Validator,
	Validators,
	AbstractControl,
	ValidationErrors,
	FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'mcy-soft-token',
	templateUrl: './soft-token.component.html',
	styleUrls: ['./soft-token.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SoftTokenComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SoftTokenComponent),
			multi: true
		}
	],
	encapsulation: ViewEncapsulation.None
})
export class SoftTokenComponent
	implements OnInit, OnDestroy, ControlValueAccessor, Validator {
	@Input() label: string = '';
	@ViewChild('idFirstField', { static: true }) idFirstField!: ElementRef;
	@ViewChild('idSecondField', { static: true }) idSecondField!: ElementRef;
	@ViewChild('idThirdField', { static: true }) idThirdField!: ElementRef;
	@ViewChild('idFourthField', { static: true }) idFourthField!: ElementRef;
	@ViewChild('idFifthField', { static: true }) idFifthField!: ElementRef;
	@ViewChild('idSixthField', { static: true }) idSixthField!: ElementRef;
	public softTokenForm = new FormGroup({});
	public subscription = new Subscription();
	constructor(
		private fb: FormBuilder,
		private renderer: Renderer2,
	) {}

	ngOnInit() {
		this.softTokenForm = this.fb.group({
			firstField: ['', Validators.compose([Validators.required])],
			secondField: ['', Validators.compose([Validators.required])],
			thirdField: ['', Validators.compose([Validators.required])],
			fourthField: ['', Validators.compose([Validators.required])],
			fifthField: ['', Validators.compose([Validators.required])],
			sixthField: ['', Validators.compose([Validators.required])]
		});
		const firstFieldControl: AbstractControl | null = this.softTokenForm.get(
			'firstField'
		);
		const secondFieldControl: AbstractControl | null = this.softTokenForm.get(
			'secondField'
		);
		const thirdFieldControl: AbstractControl | null = this.softTokenForm.get(
			'thirdField'
		);
		const fourthFieldControl: AbstractControl | null = this.softTokenForm.get(
			'fourthField'
		);
		const fifthFieldControl: AbstractControl | null = this.softTokenForm.get(
			'fifthField'
		);
		const sixthFieldControl: AbstractControl | null = this.softTokenForm.get(
			'sixthField'
		);
		this.renderer.selectRootElement(this.idFirstField.nativeElement).select();
		this.observerChanges(firstFieldControl, null, this.idSecondField);
		this.observerChanges(
			secondFieldControl,
			this.idFirstField,
			this.idThirdField
		);
		this.observerChanges(
			thirdFieldControl,
			this.idSecondField,
			this.idFourthField
		);
		this.observerChanges(
			fourthFieldControl,
			this.idThirdField,
			this.idFifthField
		);
		this.observerChanges(
			fifthFieldControl,
			this.idFourthField,
			this.idSixthField
		);
		this.observerChanges(sixthFieldControl, this.idFifthField, null);
	}
	observerChanges(
		currentFieldControl: AbstractControl | null,
		idPrevField: ElementRef | null,
		idNextField: ElementRef | null
	) {
		if (currentFieldControl) {
			this.subscription.add(
				currentFieldControl.valueChanges.subscribe(val => {
					if (val) {
						this.setSelect(idNextField);
					} else {
						this.setSelect(idPrevField);
					}
				})
			);
		}
	}

	setSelect(idCurrentField: ElementRef | null) {
		if (idCurrentField) {
			this.renderer.selectRootElement(idCurrentField.nativeElement).select();
		}
	}

	public onTouched: () => void = () => {};

	writeValue(value: string | null): void {
		if (!value) {
			this.softTokenForm.patchValue({
				firstField: '',
				secondField: '',
				thirdField: '',
				fourthField: '',
				fifthField: '',
				sixthField: ''
			});
			this.renderer.selectRootElement(this.idFirstField.nativeElement).select();
		}
	}

	registerOnChange(fn: any): void {
		this.subscription.add(
			this.softTokenForm.valueChanges.pipe(
				map(valueSofToken => {
					let formatedValue = '';
					Object.keys(valueSofToken).forEach(key => formatedValue += valueSofToken[key]);
					return formatedValue;
				})
			).subscribe(fn)
		);
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.softTokenForm.disable() : this.softTokenForm.enable();
	}

	validate(): ValidationErrors | null {
		return this.softTokenForm.valid ? null : { invalidForm: true };
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
