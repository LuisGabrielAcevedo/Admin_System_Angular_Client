import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SignupStepperComponent } from './signup-stepper.component';

describe('SignupStepperComponent', () => {
	let component: SignupStepperComponent;
	let fixture: ComponentFixture<SignupStepperComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignupStepperComponent],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: []
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignupStepperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
