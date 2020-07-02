import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperGuidelinesComponent } from './stepper-guidelines.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('StepperGuidelinesComponent', () => {
	let component: StepperGuidelinesComponent;
	let fixture: ComponentFixture<StepperGuidelinesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StepperGuidelinesComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StepperGuidelinesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
