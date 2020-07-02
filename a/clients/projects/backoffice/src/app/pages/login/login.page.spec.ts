import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from 'backoffice/src/app/services/login.service';
import { LoginServiceMock } from 'client/app/login/services/login.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IUserAccount, IUserAccountResponse, makeUserAccountResponse, makeUserAccount } from 'backoffice/src/app/models/login';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginPage', () => {
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	let loginService: LoginService;
	let router: Router;
	const accountMock: IUserAccount = makeUserAccount({
		user: 'test',
		password: '123456'
	});
	const accountResponse:IUserAccountResponse = makeUserAccountResponse({success: true});
	const accountResponseError:IUserAccountResponse = makeUserAccountResponse({
		success: false,
		messages: ['error']
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginPage ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: LoginService, useClass: LoginServiceMock }
			],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				BrowserAnimationsModule,
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;
		loginService = TestBed.get(LoginService);
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('#submitForm should validate an account', () => {
		spyOn(router, 'navigate');
		spyOn(loginService, 'validateAccount').and.returnValue(of(accountResponse));
		component.loginForm.value.user = accountMock.user;
		component.loginForm.value.password = accountMock.password;
		component.submitForm();
		expect(loginService.validateAccount).toHaveBeenCalledWith(accountMock);
	});

	it('#submitForm should redirect if no errors are presented in account validation', () => {
		spyOn(router, 'navigate');
		spyOn(loginService, 'validateAccount').and.returnValue(of(accountResponse));
		component.loginForm.value.user = accountMock.user;
		component.loginForm.value.password = accountMock.password;
		component.submitForm();
		expect(router.navigate).toHaveBeenCalledWith(['backoffice/home']);
	});

	it('#submitForm should reset form if login failed', () => {
		spyOn(component.loginForm, 'reset');
		spyOn(loginService, 'validateAccount').and.returnValue(of(accountResponseError));
		component.loginForm.value.user = accountMock.user;
		component.loginForm.value.password = accountMock.password;
		component.submitForm();
		expect(component.loginForm.reset).toHaveBeenCalled();
	});
});
