import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputComponent],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
			providers: [FormBuilder]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when setDisabledState have true the inputField.disabled should be true', () => {
		component.setDisabledState(true);
		expect(component.inputField.disabled).toBeTruthy();
		component.setDisabledState(false);
		expect(component.inputField.disabled).toBeFalsy();
	});

	it('when writeValue have value the inputField should have value', () => {
		component.writeValue(123);
		expect(component.inputField.value).toBe(123);
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
