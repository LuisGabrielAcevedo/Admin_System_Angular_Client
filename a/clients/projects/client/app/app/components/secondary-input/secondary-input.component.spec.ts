import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SecondaryInputComponent } from './secondary-input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SecondaryInputComponent', () => {
	let component: SecondaryInputComponent;
	let fixture: ComponentFixture<SecondaryInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SecondaryInputComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				FormsModule,
				ReactiveFormsModule,
			],
			providers: [FormBuilder]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SecondaryInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle onEnter', () => {
		spyOn(component.handleEnterKey, 'emit');
		component.onEnter();
		expect(component.handleEnterKey.emit).toHaveBeenCalled();
	});

	it('should handle onClear', () => {
		spyOn(component.handleClear, 'emit');
		component.onClear();
		expect(component.handleClear.emit).toHaveBeenCalled();
	});

	it('should handle setDisableState', () => {
		component.setDisabledState(true);
		expect(component.formControl.disabled).toBeTruthy();
		component.setDisabledState(false);
		expect(component.formControl.disabled).toBeFalsy();
	});
});
