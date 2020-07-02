import { TestBed } from '@angular/core/testing';
import { DataService } from '@mcy/core/services/data.service';
import { ServicePaymentService } from './service-payment.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { of, throwError } from 'rxjs';
import { IServicePaymentsResponse, IServicePayment } from 'client/app/app/models';
import { makeServiceCategory, makeServicePayment } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { CSVService } from 'client/app/app/services/csv.service';
import { CSVServiceMock } from 'client/app/app/services/csv.service.mock';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { TransactionUtilsService } from './transaction-utils.service';

describe('PaymentService', () => {
	let dataService: DataService;
	let paymentService: ServicePaymentService;
	let toastService: ToastService;
	let translateService: TranslateService;
	let utilsService: UtilsService;
	let csvService: CSVService;

	const servicePaymentsSuccessResponse: IServicePaymentsResponse = {
		success: true,
		status: [],
		data: [makeServicePayment({})]
	};

	const servicePaymentsBussinessResponse: IServicePaymentsResponse = {
		success: false,
		status: [{ code: '1', message: 'foo' }, { code: '2', message: 'foo' }],
		data: []
	};

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: CSVService, useClass: CSVServiceMock },
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: EventService, useClass: EventServiceMock },
				TransactionUtilsService,
				ServicePaymentService
			]
		})
	);

	beforeEach(() => {
		dataService = TestBed.get(DataService);
		paymentService = TestBed.get(ServicePaymentService);
		toastService = TestBed.get(ToastService);
		translateService = TestBed.get(TranslateService);
		utilsService = TestBed.get(UtilsService);
		csvService = TestBed.get(CSVService);
	});

	it('should be created', () => {
		expect(dataService).toBeTruthy();
	});

	it('when getCategories() is called , the function get() in dataService is called 2', () => {
		spyOn(dataService, 'get');
		paymentService.getCategories();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('when getServices() is called , the function get() in dataService is called', () => {
		spyOn(dataService, 'get');
		paymentService.getServices(makeServiceCategory({}));
		expect(dataService.get).toHaveBeenCalled();
	});

	it('when getDebt() is called with a valid id, the function get() in dataService is called', () => {
		spyOn(dataService, 'get');
		paymentService.getDebt('', '');
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(paymentService.subscription, 'unsubscribe');
		paymentService.ngOnDestroy();
		expect(paymentService.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should return service payments', () => {
		spyOn(paymentService, 'getServicePayments').and.returnValue(
			of(servicePaymentsSuccessResponse)
		);
		spyOn(paymentService, 'updateServicePaymentState');
		paymentService.findServicePayments();
		expect(paymentService.getServicePayments).toHaveBeenCalled();
		expect(paymentService.updateServicePaymentState).toHaveBeenCalled();
	});

	it('should fail getting service payments due to a bussiness error', () => {
		spyOn(paymentService, 'getServicePayments').and.returnValue(of(servicePaymentsBussinessResponse));
		spyOn(toastService, 'message');
		paymentService.findServicePayments();
		expect(paymentService.getServicePayments).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalledTimes(2);
	});

	it('should handle a failure response', () => {
		spyOn(paymentService, 'getServicePayments').and.returnValue(throwError('Error'));
		spyOn(toastService, 'message');
		paymentService.findServicePayments();
		expect(paymentService.getServicePayments).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalled();
	});

	it('should load the service payments from API', () => {
		spyOn(dataService, 'get');
		paymentService.getServicePayments();
		expect(dataService.get).toHaveBeenCalled();
	});


	it('should update service payment state', () => {
		spyOn(paymentService.subject, 'next');
		paymentService.updateServicePaymentState({});
		expect(paymentService.subject.next).toHaveBeenCalled();
	});

	it('should return a service payment state', () => {
		const subject = paymentService.getServicePaymentState();
		expect(paymentService.subject).toEqual(subject);
	});

	it('when formattedDate is called with a valid date, should call formatData from utilsService', () => {
		spyOn(utilsService, 'formatDate');
		paymentService.formattedDate(new Date());
		expect(utilsService.formatDate).toHaveBeenCalled();
	})

	it('when formattedDate is called with undefined date, should return empty string', () => {
		const formattedDate = paymentService.formattedDate(undefined);
		expect(formattedDate).toBe('');
	});

	it('when stateDescription is called with APPROVED state, should call to translateService', () => {
		spyOn(translateService, 'instant');
		paymentService.stateDescription('APPROVED');
		expect(translateService.instant).toHaveBeenCalledWith('pages.payments.state.successful');
	});

	it('when stateDescription is called with DENIED state, should call to translateService', () => {
		spyOn(translateService, 'instant');
		paymentService.stateDescription('DENIED');
		expect(translateService.instant).toHaveBeenCalledWith('pages.payments.state.rejected');
	});

	it('when serializeService is called, should call to formatAmount from utilsService', () => {
		spyOn(utilsService, 'formatAmount');
		const service: IServicePayment = makeServicePayment({});
		paymentService.serializeService(service);
		expect(utilsService.formatAmount).toHaveBeenCalledWith(service.amount);
	});

	it('when serializeService is called, should call to formattedDate', () => {
		spyOn(paymentService, 'formattedDate');
		const service: IServicePayment = makeServicePayment({});
		paymentService.serializeService(service);
		expect(paymentService.formattedDate).toHaveBeenCalledWith(service.date);
	});

	it('when serializeService is called, should call to stateDescription', () => {
		spyOn(paymentService, 'stateDescription');
		const service: IServicePayment = makeServicePayment({});
		paymentService.serializeService(service);
		expect(paymentService.stateDescription).toHaveBeenCalledWith(service.state);
	});

	it('when exportToCSV is called, should call to instant from translateService', () => {
		spyOn(translateService, 'instant');
		const service: IServicePayment = makeServicePayment({});
		paymentService.exportToCSV([service]);
		expect(translateService.instant).toHaveBeenCalledWith('pages.payments.servicePaymentsList.servicePaymentFileName');
	});

	it('when exportToCSV is called, should call to subscribe from getTableHeaders', () => {
		spyOn(paymentService, 'getTableHeaders').and.returnValue([]);
		spyOn(paymentService, 'serializeService');
		spyOn(csvService, 'downloadCSV');
		const service: IServicePayment = makeServicePayment({});
		paymentService.exportToCSV([service]);
		expect(paymentService.getTableHeaders).toHaveBeenCalled();
		expect(paymentService.serializeService).toHaveBeenCalled();
		expect(csvService.downloadCSV).toHaveBeenCalled();
	});
});
