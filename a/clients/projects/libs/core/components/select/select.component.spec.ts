import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('SelectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			declarations: [SelectComponent],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
			providers: [FormBuilder]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when setDisabledState have true the selectField.disabled should be true', () => {
		component.setDisabledState(true);
		expect(component.selectField.disabled).toBeTruthy();
		component.setDisabledState(false);
		expect(component.selectField.disabled).toBeFalsy();
	});

	it('when writeValue have value the selectField should have value', () => {
		component.writeValue('12345');
		expect(component.selectField.value).toBe('12345');
	});

	it('registerOnChange()', () => {
		const onChangeEvent = (change: any) => {
			console.log('There were changes', change);
		};
		component.registerOnChange(onChangeEvent);
		expect(component.subscription).toBeTruthy();
	});

	it('registerOnTouched()', () => {
		component.onTouched();
		const onTouchedEvent = (touched: any) => {
			console.log('There were touched', touched);
		};
		component.registerOnTouched(onTouchedEvent);
		expect(component.subscription).toBeTruthy();
	});

	it('when selectedAccount is valid the function validate() should return null', () => {
		component.required = true;
		component.ngOnInit();
		component.selectField.patchValue(null);
		const resp = component.validate();
		expect(resp).toEqual({ required: true });
	});
});
