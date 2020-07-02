import { TestBed } from '@angular/core/testing';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { XHRService } from '@mcy/main/services/xhr.service';
import { ISignInResponse, IUserAccount, makeUserAccount } from 'backoffice/src/app/models/login';
import { of, throwError } from 'rxjs';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { LoginService } from 'backoffice/src/app/services/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginService', () => {
	let loginService: LoginService;
	let dataService: XHRService;
	let storage: StorageService;
	let router: Router;
	const token: string = 'token'
	const account: IUserAccount = makeUserAccount({
		user: 'test',
		password: '123456'
	});
	const responseSuccess: ISignInResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: { token }
	};
	const responseError: ISignInResponse = {
		success: false,
		status: [
			{ code: '500', message: 'error 500' },
			{ code: '501', message: 'error 501' }
		],
		data: { token }
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LoginService,
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock }
			],
			imports: [
				RouterTestingModule
			]
		});
	});

	beforeEach(() => {
		loginService = TestBed.get(LoginService);
		dataService = TestBed.get(XHRService);
		storage = TestBed.get(StorageService);
		router = TestBed.get(Router);
	});

	it('should be created', () => {
		expect(loginService).toBeTruthy();
	});

	it('#logout should logout sesion', () => {
		spyOn(storage, 'clear');
		spyOn(router, 'navigate');
		loginService.logout();
		expect(storage.clear).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledWith(['/']);
	});

	it('#getAccount should post the account with its credentials', () => {
		spyOn(dataService, 'post');
		loginService.getAccount(account);
		expect(dataService.post).toHaveBeenCalledWith('v1/agents/sign-in', {
			body: {
				username: account.user,
				password: account.password
			}
		});
	});

	it('#validateAccount if the account is valid, validateAccount should return TRUE and the login state should be updated', () => {
		spyOn(loginService, 'getAccount').and.returnValue(of(responseSuccess));
		loginService.validateAccount(account).subscribe((isValid) => {
			expect(isValid.success).toBeTruthy();
		});
	});

	it('#validateAccount if the account is valid, validateAccount should return FALSE and the login state should NOT be updated', () => {
		spyOn(loginService, 'getAccount').and.returnValue(of(responseError));
		loginService.validateAccount(account).subscribe((isValid) => {
			expect(isValid.success).toBeFalsy();
		});
	});

	it('#validateAccount should catch errors', () => {
		spyOn(loginService, 'getAccount').and.returnValue(throwError(responseSuccess));
		loginService.validateAccount(account).subscribe((isValid) => {
			expect(isValid.success).toBeFalsy();
		});
	});
});
