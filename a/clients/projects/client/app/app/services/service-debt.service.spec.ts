import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import {
	makeServiceDebt,
	IServiceDebtsResponse,
	makeServiceDebtState
} from 'client/app/app/models';
import { of, throwError } from 'rxjs';
import { ServiceDebtService } from './service-debt.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';

describe('ServiceDebtService', () => {
	let service: ServiceDebtService;
	let toastService: ToastService;
	let dataService: DataService;

	const serviceDebtsSuccessResponse: IServiceDebtsResponse = {
		success: true,
		status: [],
		data: [makeServiceDebt({})]
	};

	const serviceDebtsBussinessResponse: IServiceDebtsResponse = {
		success: false,
		status: [{ code: '1', message: 'foo' }, { code: '2', message: 'foo' }],
		data: []
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([])],
			providers: [
				ServiceDebtService,
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: EventService, useClass: EventServiceMock }
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(ServiceDebtService);
		toastService = TestBed.get(ToastService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(service.subscription, 'unsubscribe');
		service.ngOnDestroy();
		expect(service.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should return service debts', () => {
		spyOn(service, 'getServiceDebts').and.returnValue(
			of(serviceDebtsSuccessResponse)
		);
		spyOn(service, 'updateServiceDebtState');
		service.findServiceDebts();
		expect(service.getServiceDebts).toHaveBeenCalled();
		expect(service.updateServiceDebtState).toHaveBeenCalled();
	});

	it('should fail getting service debts due to a bussiness error', () => {
		spyOn(service, 'getServiceDebts').and.returnValue(of(serviceDebtsBussinessResponse));
		service.findServiceDebts();
		expect(service.getServiceDebts).toHaveBeenCalled();
	});

	it('should handle a failure response', () => {
		spyOn(service, 'getServiceDebts').and.returnValue(throwError('Error'));
		service.findServiceDebts();
		expect(service.getServiceDebts).toHaveBeenCalled();
	});

	it('should return service debts', () => {
		spyOn(service, 'getServiceDebt').and.returnValue(
			of(serviceDebtsSuccessResponse)
		);
		spyOn(service, 'updateServiceDebtState');
		service.findServiceDebt('', '');
		expect(service.getServiceDebt).toHaveBeenCalled();
		expect(service.updateServiceDebtState).toHaveBeenCalled();
	});

	it('should fail getting service debts due to a bussiness error', () => {
		spyOn(service, 'getServiceDebt').and.returnValue(of(serviceDebtsBussinessResponse));
		spyOn(toastService, 'message');
		service.findServiceDebt('', '');
		expect(service.getServiceDebt).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalledTimes(2);
	});

	it('should handle a failure response', () => {
		spyOn(service, 'getServiceDebt').and.returnValue(throwError('Error'));
		spyOn(toastService, 'message');
		service.findServiceDebt('', '');
		expect(service.getServiceDebt).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalled();
	});

	it('should load the service debts from API', () => {
		spyOn(dataService, 'get');
		service.getServiceDebts();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should load the service debts from API', () => {
		spyOn(dataService, 'get');
		service.getServiceDebt('', '');
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should update service debt state', () => {
		spyOn(service.subject, 'next');
		service.updateServiceDebtState({});
		expect(service.subject.next).toHaveBeenCalledWith(makeServiceDebtState({}));
	});

	it('should return a service debt state', () => {
		const subject = service.getServiceDebtState();
		expect(service.subject).toEqual(subject);
	});
});
