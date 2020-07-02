import { TestBed } from '@angular/core/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ITransfersResponse, makeTransfer, makeNewTransfer, ITransfer } from '../models';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { of, throwError } from 'rxjs';
import { SalaryPaymentService } from './salary-payment.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { CSVService } from './csv.service';
import { CSVServiceMock } from './csv.service.mock';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { TransferServiceMock } from './transfer.service.mock';
import { TransferService } from './transfer.service';

describe('SalaryPaymentService', () => {
	let dataService: DataService;
	let salaryPaymentService: SalaryPaymentService;
	let csvService: CSVService;
	let translateService: TranslateService;
	let utilsService: UtilsService;

	const salaryPaymentsSuccessResponse: ITransfersResponse = {
		success: true,
		status: [],
		data: [makeTransfer({})]
	};

	const salaryPaymentsBussinessResponse: ITransfersResponse = {
		success: false,
		status: [
			{ code: '1', message: 'foo' },
			{ code: '2', message: 'foo' }
		],
		data: []
	};

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: DataService, useClass: DataServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: CSVService, useClass: CSVServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
				SalaryPaymentService
			]
		})
	);

	beforeEach(() => {
		dataService = TestBed.get(DataService);
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		csvService = TestBed.get(CSVService);
		translateService = TestBed.get(TranslateService);
		utilsService = TestBed.get(UtilsService);
	});

	it('should be created', () => {
		expect(dataService).toBeTruthy();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(salaryPaymentService.subscription, 'unsubscribe');
		salaryPaymentService.ngOnDestroy();
		expect(salaryPaymentService.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should return salary payments', () => {
		spyOn(salaryPaymentService, 'getSalaryPayments').and.returnValue(
			of(salaryPaymentsSuccessResponse)
		);
		spyOn(salaryPaymentService, 'updateSalaryPaymentState');
		salaryPaymentService.findSalaryPayments();
		expect(salaryPaymentService.getSalaryPayments).toHaveBeenCalled();
		expect(salaryPaymentService.updateSalaryPaymentState).toHaveBeenCalled();
	});

	it('should fail getting salary payments due to a bussiness error', () => {
		spyOn(salaryPaymentService, 'getSalaryPayments').and.returnValue(
			of(salaryPaymentsBussinessResponse)
		);
		salaryPaymentService.findSalaryPayments();
		expect(salaryPaymentService.getSalaryPayments).toHaveBeenCalled();
	});

	it('should handle a failure response', () => {
		spyOn(salaryPaymentService, 'getSalaryPayments').and.returnValue(
			throwError('Error')
		);
		salaryPaymentService.findSalaryPayments();
		expect(salaryPaymentService.getSalaryPayments).toHaveBeenCalled();
	});

	it('should load the salary payments from API', () => {
		spyOn(dataService, 'get');
		salaryPaymentService.getSalaryPayments();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should update salary payment state', () => {
		spyOn(salaryPaymentService.subject, 'next');
		salaryPaymentService.updateSalaryPaymentState({});
		expect(salaryPaymentService.subject.next).toHaveBeenCalled();
	});

	it('should return a salary payment state', () => {
		const subject = salaryPaymentService.getSalaryPaymentState();
		expect(salaryPaymentService.subject).toEqual(subject);
	});

	it('should call the post of service payments from API', () => {
		spyOn(dataService, 'post').and.returnValue(of(salaryPaymentsSuccessResponse));
		salaryPaymentService.paySalary(makeNewTransfer({}), '');
		expect(dataService.post).toHaveBeenCalled();
	});

	it('when formattedDate is called with undefined date, should return empty string', () => {
		const formattedDate = salaryPaymentService.formattedDate(undefined);
		expect(formattedDate).toBe('');
	});

	it('when stateDescription is called with APPROVED state, should call to translateService', () => {
		spyOn(translateService, 'instant');
		salaryPaymentService.stateDescription('APPROVED');
		expect(translateService.instant).toHaveBeenCalledWith('pages.payments.state.successful');
	});

	it('when stateDescription is called with DENIED state, should call to translateService', () => {
		spyOn(translateService, 'instant');
		salaryPaymentService.stateDescription('DENIED');
		expect(translateService.instant).toHaveBeenCalledWith('pages.payments.state.rejected');
	});

	it('when serializeService is called, should call to formatAmount from utilsService', () => {
		spyOn(utilsService, 'formatAmount');
		const salaryPayment: ITransfer = makeTransfer({});
		salaryPaymentService.serializeService(salaryPayment);
		expect(utilsService.formatAmount).toHaveBeenCalledWith(salaryPayment.amount);
	});

	it('when serializeService is called, should call to formattedDate', () => {
		spyOn(salaryPaymentService, 'formattedDate');
		const salaryPayment: ITransfer = makeTransfer({});
		salaryPaymentService.serializeService(salaryPayment);
		expect(salaryPaymentService.formattedDate).toHaveBeenCalledWith(salaryPayment.date);
	});

	it('when serializeService is called, should call to stateDescription', () => {
		spyOn(salaryPaymentService, 'stateDescription');
		const salaryPayment: ITransfer = makeTransfer({});
		salaryPaymentService.serializeService(salaryPayment);
		expect(salaryPaymentService.stateDescription).toHaveBeenCalledWith(salaryPayment.state);
	});

	it('when exportToCSV is called, should call to instant from translateService', () => {
		spyOn(translateService, 'instant');
		const salaryPayment: ITransfer = makeTransfer({});
		salaryPaymentService.exportToCSV([salaryPayment]);
		expect(translateService.instant).toHaveBeenCalledWith('pages.payments.salaryPaymentsList.salaryPaymentFileName');
	});

	it('when exportToCSV is called, should call to subscribe from getTableHeaders', () => {
		spyOn(salaryPaymentService, 'getTableHeaders').and.returnValue([]);
		spyOn(salaryPaymentService, 'serializeService');
		spyOn(csvService, 'downloadCSV');
		const salaryPayment: ITransfer = makeTransfer({});
		salaryPaymentService.exportToCSV([salaryPayment]);
		expect(salaryPaymentService.getTableHeaders).toHaveBeenCalled();
		expect(salaryPaymentService.serializeService).toHaveBeenCalled();
		expect(csvService.downloadCSV).toHaveBeenCalled();
	});
});
