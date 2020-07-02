import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MainModule } from '@mcy/main/main.module';
import { CoreModule } from '@mcy/core/core.module';
import { LoginPage } from './login.page';
import { LoginService } from 'client/app/login/services/login.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { DataService } from '@mcy/core/services/data.service';
import { ToastService } from '@mcy/core/services/toast.service';
import { LoginServiceMock } from 'client/app/login/services/login.service.mock';
import { IUserAccount, makeLoginState } from 'client/app/login/models/login';
import { FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { LoginModule } from 'client/app/login/login.module';
import { RootModule } from 'client/app/root.module';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('LoginComponent', () => {
	let component: LoginPage;
	let storage: StorageService;
	let loginService: LoginService;
	let fixture: ComponentFixture<LoginPage>;
	let router: Router;
	let userService: UserService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				// TODO improve it
				MainModule.forRoot({}),
				CoreModule,
				LoginModule,
				RootModule,
				TranslateModule.forRoot(),
			],
			providers: [
				{ provide: LoginService, useClass: LoginServiceMock },
				StorageService,
				DataService,
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;
		component.loginForm = new FormGroup({
			user: new FormControl(null),
			password: new FormControl(null)
		})
		storage = TestBed.get(StorageService);
		loginService = TestBed.get(LoginService);
		router = TestBed.get(Router);
		userService = TestBed.get(UserService);
	});

	it('should create the login', () => {
		expect(component).toBeTruthy();
	});

	// TODO move to entperise.resolver
	// it('#submitForm should set inside the localstorage the user data when the user has logged in correctly', () => {
	// 	spyOn(storage, 'setData');
	// 	spyOn(router, 'navigate');
	// 	spyOn(loginService, 'validateAccount').and.returnValue(of(true));
	// 	const accountMock: IUserAccount = {
	// 		user: '232323',
	// 		password: 'asd'
	// 	};
	// 	component.loginForm.value.user = accountMock.user;
	// 	component.loginForm.value.password = accountMock.password;
	// 	component.submitForm();
	// 	expect(storage.setData).toHaveBeenCalledWith('documentNumber', '30797979798');
	// 	expect(storage.setData).toHaveBeenCalledWith('documentType', 'CUIT');
	// });

	it('#submitForm should validate an account', () => {
		spyOn(storage, 'setData');
		spyOn(router, 'navigate');
		spyOn(loginService, 'validateAccount').and.returnValue(of(true));
		const accountMock: IUserAccount = {
			user: '232323',
			password: 'asd'
		}
		component.loginForm.value.user = accountMock.user;
		component.loginForm.value.password = accountMock.password;
		component.submitForm();
		expect(loginService.validateAccount).toHaveBeenCalledWith(accountMock);
	});

	it('#submitForm should redirect if no errors are presented in account validation', () => {
		spyOn(router, 'navigate');
		spyOn(loginService, 'validateAccount').and.returnValue(of(true));
		spyOn(userService, 'getEnterprises').and.returnValue(of(true));
		const accountMock: IUserAccount = {
			user: '232323',
			password: 'asd'
		}
		component.loginForm.value.user = accountMock.user;
		component.loginForm.value.password = accountMock.password;
		component.submitForm();
		expect(userService.getEnterprises).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledWith(['/app']);
	});

	it('#submitForm should reset form if login failed', () => {
		spyOn(component, 'resetForm');
		spyOn(loginService, 'validateAccount').and.returnValue(of(false));
		const accountMock: IUserAccount = {
			user: '232323',
			password: 'asd'
		}
		component.loginForm.value.user = accountMock.user;
		component.loginForm.value.password = accountMock.password;
		component.submitForm();
		expect(component.resetForm).toHaveBeenCalled();
	});

	it('#onErrorCloseClick should update login state', () => {
		spyOn(loginService, 'updateLoginState');
		component.onErrorCloseClick();
		expect(loginService.updateLoginState).toHaveBeenCalled();
	});

	it('#error should return login errors', () => {
		const error = { code: '1', description: 'error' };
		component.loginState = makeLoginState({ error })
		expect(component.error).toEqual(error);
	});

	it('#resetForm should reset login form', () => {
		spyOn(component.loginForm, 'reset');
		component.resetForm();
		expect(component.loginForm.reset).toHaveBeenCalled();
	});
});
