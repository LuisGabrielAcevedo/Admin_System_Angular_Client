import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessPage } from './signup-success.page';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SignupService } from 'client/app/signup/services/signup.service';
import { SignupServiceMock } from 'client/app/signup/services/signup.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { makeSignupState, ISignupState } from 'client/app/signup/models';
import { BehaviorSubject } from 'rxjs';

describe('SignupSuccessPage', () => {
	let component: SignupSuccessPage;
	let fixture: ComponentFixture<SignupSuccessPage>;
	let router: Router;
	let signupService: SignupService;
	const state: BehaviorSubject<ISignupState> = new BehaviorSubject(makeSignupState({}));

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SignupSuccessPage ],
			imports: [
				RouterTestingModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: SignupService, useClass: SignupServiceMock }
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignupSuccessPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		signupService = TestBed.get(SignupService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should redirect to login', () => {
		spyOn(signupService, 'getSignupState').and.returnValue(state);
		component.ngOnInit();
		expect(signupService.getSignupState).toHaveBeenCalled();
	});

	it('should redirect to login', () => {
		spyOn(router, 'navigate');
		component.redirectToLogin();
		expect(router.navigate).toHaveBeenCalledWith(['/']);
	});
});
