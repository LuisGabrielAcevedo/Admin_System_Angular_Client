import { TestBed } from '@angular/core/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { RequestsService } from './requests.service';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { makeRequest, IRequest, makeRequestState, IRequestsResponse } from 'client/app/app/models/request';
import { makeRequestFilters, makeTransfer, makeCurrency } from 'client/app/app/models';
import { SignaturesService } from './signatures.service';
import { SignaturesServiceMock } from './signatures.service.mock';
import { of, throwError } from 'rxjs';
import { makeUserRequest } from 'client/app/app/models/user';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { TransferService } from './transfer.service';
import { TransferServiceMock } from './transfer.service.mock';
import { UserServiceMock } from './user.service.mock';
import { UserService } from './user.service';


describe('RequestsService', () => {
	let requestsService: RequestsService;
	let dataService: DataService;

	const requests: IRequest[] = [
		makeRequest({
			currency: makeCurrency({
				symbol: 'ARS'
			}),
			amount: 500
		}),
		makeRequest({
			currency: makeCurrency({
				symbol: 'ARS'
			}),
			amount: 500
		})
	];

	const requestsSuccessResponse: IRequestsResponse = {
		success: true,
		status: [],
		data: requests
	};

	const requestsBussinessResponse: IRequestsResponse = {
		success: false,
		status: [
			{ code: '1', message: 'foo' },
			{ code: '2', message: 'foo' }
		],
		data: []
	};

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SignaturesService, useClass: SignaturesServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
				RequestsService,
				{provide: UserService, useClass: UserServiceMock }
			],
			imports: [TranslateModule.forRoot()]
		})
	);

	beforeEach(() => {
		requestsService = TestBed.get(RequestsService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(requestsService).toBeTruthy();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(requestsService.subscription, 'unsubscribe');
		requestsService.ngOnDestroy();
		expect(requestsService.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should return true if request documentNumber and type are equals to user ones', () => {
		requestsService.documentNumber = '12345';
		requestsService.documentType = 'CUIT';
		const request = makeRequest({});
		request.user = makeUserRequest({
			document: {
				number: requestsService.documentNumber,
				type: requestsService.documentType
			}
		});

		const filters = makeRequestFilters({myRequests: true});
		const result = requestsService.validateMyRequests(request, filters);
		expect(result).toBeTrue();
	});

	it('should return false if request documentNumber and type are NOT equals to user ones', () => {
		requestsService.documentNumber = '12345';
		requestsService.documentType = 'CUIT';
		const request = makeRequest({});
		request.user = makeUserRequest({
			document: {
				number: '99999',
				type: 'CUIT'
			}
		});

		const filters = makeRequestFilters({myRequests: true});
		const result = requestsService.validateMyRequests(request, filters);
		expect(result).toBeFalse();
	});

	it('should call sort', () => {
		spyOn(Array.prototype, 'sort').and.callThrough();
		requestsService.orderList(requests);
		expect(Array.prototype.sort).toHaveBeenCalled();
	});

	it('should update request state', () => {
		spyOn(requestsService.subject, 'next');
		requestsService.updateRequestsState({});
		expect(requestsService.subject.next).toHaveBeenCalledWith(makeRequestState({}));
	});

	it('should return a request state', () => {
		const subject = requestsService.getRequestsState();
		expect(requestsService.subject).toEqual(subject);
	});

	it('should load the requests from API', () => {
		spyOn(dataService, 'get');
		requestsService.getRequests();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should be true when the request is Service payment', () => {
		const resp = requestsService.isServicePayment(makeRequest({ type: 'SERVICE_PAYMENT' }));
		expect(resp).toBeTruthy();
	});

	it('should be true when the request is Transfer', () => {
		const resp = requestsService.isTransfer(makeRequest({
			type: 'TRANSFER',
			content: makeTransfer({})
		}));
		expect(resp).toBeTruthy();
	});

	it('should be true when the request is Service payment and the concept is HAB', () => {
		const resp = requestsService.isSalary(makeRequest({
			type: 'TRANSFER',
			content: makeTransfer({
				conceptCode: 'HAB'
			})
		}));
		expect(resp).toBeTruthy();
	});

	it('should return requests', () => {
		spyOn(requestsService, 'getRequests').and.returnValue(
			of(requestsSuccessResponse)
		);
		spyOn(requestsService, 'updateRequestsState');
		requestsService.findRequests();
		expect(requestsService.getRequests).toHaveBeenCalled();
		expect(requestsService.updateRequestsState).toHaveBeenCalled();
	});

	it('should fail getting requests due to a bussiness error', () => {
		spyOn(requestsService, 'getRequests').and.returnValue(of(requestsBussinessResponse));
		requestsService.findRequests();
		expect(requestsService.getRequests).toHaveBeenCalled();
	});

	it('should handle a failure response', () => {
		spyOn(requestsService, 'getRequests').and.returnValue(throwError('Error'));
		requestsService.findRequests();
		expect(requestsService.getRequests).toHaveBeenCalled();
	});

	it('should return pooled currencies from requests', () => {
		requestsService.updateRequestsState({
			selectedRequests: requests
		});
		const requestCurrencySummary = requestsService.requestCurrencySummary;
		expect(requestCurrencySummary[0].amount).toBe(1000);
	});

	it('should be true when the request is Provider payment and the type is SUPPLIER_PAYMENT', () => {
		const resp = requestsService.isProviderPayment(makeRequest({
			type: 'SUPPLIER_PAYMENT',
			content: makeTransfer({})
		}));
		expect(resp).toBeTruthy();
	});
});
