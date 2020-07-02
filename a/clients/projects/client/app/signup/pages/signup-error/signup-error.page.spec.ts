import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SignupErrorPage } from './signup-error.page';
import { Router } from '@angular/router';

describe('SignupErrorPage', () => {
	let component: SignupErrorPage;
	let fixture: ComponentFixture<SignupErrorPage>;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SignupErrorPage ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [ 
				CoreModule,
				RouterTestingModule,
				TranslateModule.forRoot() 
			],

		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignupErrorPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should redirect to the previous step', () => {
		spyOn(router, 'navigate');
		component.redirectToPreviousStep();
		expect(router.navigate).toHaveBeenCalledWith(['/signup']);
	});

	it('should redirect to login', () => {
		spyOn(router, 'navigate');
		component.redirectToLogin();
		expect(router.navigate).toHaveBeenCalledWith(['/']);
	});
});
