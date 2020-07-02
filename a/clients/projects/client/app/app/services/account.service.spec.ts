import { TestBed } from '@angular/core/testing';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { AccountService } from './account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { IAccountsResponse, makeAccount, IAccountState, makeAccountState, IAccount, IAccountAliasRequest, makeAccountAliasRequest } from 'client/app/app/models';
import { of } from 'rxjs/internal/observable/of';
import { throwError, BehaviorSubject } from 'rxjs';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { SidenavService } from './sidenav.service';
import { SidenavServiceMock } from './sidenav.service.mock';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';

describe('AccountService', () => {
	let service: AccountService;
	let dataService: DataService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([]),
			TranslateModule.forRoot(), CoreModule.forRoot(),],
			providers: [
				AccountService,
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock},
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TranslateService, useClass: TranslateService },
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(AccountService);
		dataService = TestBed.get(DataService);
	});

	const accountSuccessResponse: IAccountsResponse = {
		success: true,
		status: [],
		data: [
			makeAccount({}),
		]
	};

	const accountFailBussinessResponse: IAccountsResponse = {
		success: false,
		status: [
			{ code: '1', message: 'foo'},
			{ code: '2', message: 'foo'}
		],
		data: [],
	};

	const accountSameCurrencyState: IAccountState = makeAccountState({
		accounts: [
			makeAccount({ currency: {  code: '032', description: 'foo', symbol: 'USD' }, balance: 1000 }),
			makeAccount({ currency: {  code: '032', description: 'foo', symbol: 'USD' }, balance: 1500 }),
			makeAccount({ currency: {  code: '028', description: 'foo', symbol: 'ARS' }, balance: 4000 }),
			makeAccount({ currency: {  code: '028', description: 'foo', symbol: 'ARS' }, balance: 5000 }),
		],
		searchedAccounts: true,
	});

	const accountDifferentCurrencyState: IAccountState = makeAccountState({
		accounts: [
			makeAccount({ currency: {  code: '084', description: 'foo', symbol: 'bar' }}),
			makeAccount({ currency: {  code: '032', description: 'foo', symbol: 'bar' }}),
		],
		searchedAccounts: true,
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(service.subscription, 'unsubscribe');
		service.ngOnDestroy();
		expect(service.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should return accounts', () => {
		spyOn(service, 'getAccounts').and.returnValue(of(accountSuccessResponse));
		spyOn(service, 'updateAccountState');
		service.findAccounts();
		expect(service.getAccounts).toHaveBeenCalled();
		expect(service.updateAccountState).toHaveBeenCalled();
	});

	it('should fail getting accounts due to a bussiness error', () => {
		spyOn(service, 'getAccounts').and.returnValue(of(accountFailBussinessResponse));
		service.findAccounts();
		expect(service.getAccounts).toHaveBeenCalled();
	});

	it('should handle a failure response', () => {
		spyOn(service, 'getAccounts').and.returnValue(throwError('Error'));
		service.findAccounts();
		expect(service.getAccounts).toHaveBeenCalled();
	});

	it('should return same multiple currency accounts as true', () => {
		spyOn(service, 'getAccountState').and.returnValue(new BehaviorSubject(accountSameCurrencyState));
		const result = service.hasMultipleSameCurrencyAccounts;
		expect(result).toEqual(true);
	});

	it('should return same multiple currency accounts as false', () => {
		spyOn(service, 'getAccountState').and.returnValue(new BehaviorSubject(accountDifferentCurrencyState));
		const result = service.hasMultipleSameCurrencyAccounts;
		expect(result).toEqual(false);
	});

	it('should update account state', () => {
		spyOn(service.subject, 'next');
		service.updateAccountState({});
		expect(service.subject.next).toHaveBeenCalledWith(makeAccountState({}));
	});

	it('should return a account state', () => {
		const subject = service.getAccountState();
		expect(service.subject).toEqual(subject);
	});

	it('should load the accounts from API', () => {
		spyOn(dataService, 'get');
		service.getAccounts();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should group account balances by currency', () => {
		spyOn(service, 'getAccountState').and.returnValue(new BehaviorSubject(accountSameCurrencyState));
		const result = service.totalBalanceByCurrency;
		expect(service.getAccountState).toHaveBeenCalled();
		expect(result.length).toEqual(2);
		expect(result[0].currency).toEqual('USD');
		expect(result[0].balance).toEqual(2500);
		expect(result[1].currency).toEqual('ARS');
		expect(result[1].balance).toEqual(9000);
	});

	it('should load the balance detail of account from API', () => {
		spyOn(dataService, 'get');
		const account: IAccount = makeAccount({});
		service.getbalanceDetail(account);
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should update the alias of account from API', () => {
		spyOn(dataService, 'put');
		const accountAlias: IAccountAliasRequest = makeAccountAliasRequest({});
		service.editAlias(accountAlias);
		expect(dataService.put).toHaveBeenCalled();
	});
});
