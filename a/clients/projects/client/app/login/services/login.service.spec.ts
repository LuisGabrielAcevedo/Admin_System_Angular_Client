import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { XHRService } from '@mcy/main/services/xhr.service';
import { IUserAccount, ISignInResponse } from 'client/app/login/models';
import { of, throwError } from 'rxjs';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('LoginService', () => {
	let loginService: LoginService;
	let dataService: XHRService;

	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			LoginService,
			{ provide: XHRService, useClass: XHRServiceMock },
			{ provide: StorageService, useClass: StorageServiceMock },
			{ provide: ModalService, useClass: ModalServiceMock}
		],
		});
	});

	beforeEach(() => {
		loginService = TestBed.get(LoginService);
		dataService = TestBed.get(XHRService);
	});

	it('should be created', () => {
		expect(loginService).toBeTruthy();
	});

	it('#getLoginState should return the login state', () => {
		const subject = loginService.getLoginState();
		expect(loginService.subject).toEqual(subject);
	});

	it('#getAccount should post the account with its credentials', () => {
		const account: IUserAccount = {
			user: '32323',
			password: '12312331'
		};
		spyOn(dataService, 'post');
		loginService.getAccount(account);
		expect(dataService.post).toHaveBeenCalledWith('v1/login/sign-in', {
			body: {
				username: account.user,
				password: account.password
			}
		});
	});

	it('#updateLoginState should update the login state', () => {
		spyOn(loginService.subject, 'next');
		loginService.updateLoginState({});
		expect(loginService.subject.next).toHaveBeenCalled();
	});

	it('#validateAccount if the account is valid, validateAccount should return TRUE and the login state should be updated', () => {
		const account: IUserAccount = {
			user: '32323',
			password: '12312331'
		};
		const response: ISignInResponse = {
			success: true,
			status: [{
				code: '0',
				message: 'success'
			}],
			data: {
				token: 'asd'
			}
		};
		spyOn(loginService, 'updateLoginState');
		spyOn(loginService, 'getAccount').and.returnValue(of(response));
		loginService.validateAccount(account).subscribe((isValid) => {
			expect(isValid).toBeTruthy();
		});
	});

	it('#validateAccount if the account is valid, validateAccount should return FALSE and the login state should NOT be updated', () => {
		const account: IUserAccount = {
			user: '32323',
			password: '12312331'
		};
		const response: ISignInResponse = {
			success: false,
			status: [],
			data: {
				token: 'asd'
			}
		};
		spyOn(loginService, 'updateLoginState');
		spyOn(loginService, 'getAccount').and.returnValue(of(response));
		loginService.validateAccount(account).subscribe((isValid) => {
			expect(isValid).toBeFalsy();
		});
	});

	it('#validateAccount should catch errors', () => {
		const account: IUserAccount = {
			user: '32323',
			password: '12312331'
		};
		const response: ISignInResponse = {
			success: false,
			status: [{
				code: '0',
				message: 'success'
			}],
			data: {
				token: 'asd'
			}
		};
		spyOn(loginService, 'updateLoginState');
		spyOn(loginService, 'getAccount').and.returnValue(throwError(response));
		loginService.validateAccount(account).subscribe((isValid) => {
			expect(isValid).toBeFalsy();
			expect(loginService.updateLoginState).toHaveBeenCalled();
		});
	});
});
