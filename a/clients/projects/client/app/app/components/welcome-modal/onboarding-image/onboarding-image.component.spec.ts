import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingImageComponent } from './onboarding-image.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';

describe('OnboardingImageComponent', () => {
	let component: OnboardingImageComponent;
	let fixture: ComponentFixture<OnboardingImageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ OnboardingImageComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ PipesModule, CoreModule.forRoot() ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OnboardingImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
