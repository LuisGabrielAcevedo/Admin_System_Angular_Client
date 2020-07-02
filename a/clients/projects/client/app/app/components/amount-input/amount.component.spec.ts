import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AmountInputComponent } from './amount-input.component';

describe('AmountInputComponent', () => {
	let component: AmountInputComponent;
	let fixture: ComponentFixture<AmountInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AmountInputComponent],
			imports: [ReactiveFormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [FormBuilder]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AmountInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when setDisabledState have true the amount.disabled should be true', () => {
		component.setDisabledState(true);
		expect(component.amount.disabled).toBeTruthy();
		component.setDisabledState(false);
		expect(component.amount.disabled).toBeFalsy();
	});

	it('when amount is valid the function validate() should return null', () => {
		component.validators = [Validators.required];
		component.ngOnInit();
		component.amount.patchValue(123);
		const resp1 = component.validate();
		expect(resp1).toBeNull();
	});

	it('when writeValue have value the amount should have value', () => {
		component.writeValue(123);
		expect(component.amount.value).toBe(123);
	});

	it('registerOnChange()', () => {
		const onChangeEvent = (change: any) => { console.log('There were changes', change); };
		component.registerOnChange(onChangeEvent);
		expect(component.subscription).toBeTruthy();
	});

	it('registerOnTouched()', () => {
		component.onTouched();
		const onTouchedEvent = (touched: any) => { console.log('There were touched', touched); };
		component.registerOnTouched(onTouchedEvent);
		expect(component.subscription).toBeTruthy();
	});
});
