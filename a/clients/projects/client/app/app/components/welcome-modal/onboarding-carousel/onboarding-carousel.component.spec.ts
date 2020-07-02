import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCarouselComponent } from './onboarding-carousel.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';

describe('OnboardingCarouselComponent', () => {
	let component: OnboardingCarouselComponent;
	let fixture: ComponentFixture<OnboardingCarouselComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ OnboardingCarouselComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), PipesModule, CoreModule.forRoot()]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OnboardingCarouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
