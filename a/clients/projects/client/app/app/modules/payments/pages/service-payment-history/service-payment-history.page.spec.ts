import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServicePaymentHistoryComponent } from './service-payment-history.page';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { makeServicePayment, IRequest, makeRequest, makeRequestState } from 'client/app/app/models';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters'
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';

const filters: IPaymentFilters = {
	searchField: 'Telecentro',
	state: 'APPROVED',
	startDate: new Date('2020-01-01T12:45:25.648Z'),
	endDate: new Date()
};
const listServices: IRequest[] = [
	makeRequest({
		detail: 'Telecentro',
		content: makeServicePayment({
			amount: 12333,
			banelcoClientId: '545620333433456675723765',
			invoiceId: '0000000002',
			otherAmount: 0,
			account: { number: '96854567-343/7', type: 'CC' },
			currency: { code: '032', symbol: 'ARS', description: 'Pesos argentinos' },
			expirationDate: new Date('2019-01-12T03:00:00.000Z'),
			controlNumber: '1212221212',
			transactionNumber: '232339090000',
			date: new Date('2020-01-12T03:00:00.000Z'),
			state: 'APPROVED'
		})
	}),
	makeRequest({
		detail: 'Telecentro',
		content: makeServicePayment({
			amount: 12333,
			banelcoClientId: '545620333433456675723765',
			invoiceId: '0000000002',
			otherAmount: 0,
			account: { number: '96854567-343/7', type: 'CC' },
			currency: { code: '032', symbol: 'ARS', description: 'Pesos argentinos' },
			expirationDate: new Date('2020-01-02T03:00:00.000Z'),
			controlNumber: '1212221212',
			transactionNumber: '232339090000',
			date: new Date('2020-01-02T03:00:00.000Z'),
			state: 'DENIED'
		})
	}),
	makeRequest({
		detail: 'Cablevisión',
		content: makeServicePayment({
			amount: 12333,
			banelcoClientId: '545620333433456675723765',
			invoiceId: '0000000002',
			otherAmount: 0,
			account: { number: '96854567-343/7', type: 'CC' },
			currency: { code: '032', symbol: 'ARS', description: 'Pesos argentinos' },
			expirationDate: new Date('2020-01-02T03:00:00.000Z'),
			controlNumber: '1212221212',
			transactionNumber: '232339090000',
			date: new Date('2020-01-02T03:00:00.000Z'),
			state: 'DENIED'
		})
	})
];

describe('ServicePaymentHistoryComponent', () => {
	let component: ServicePaymentHistoryComponent;
	let fixture: ComponentFixture<ServicePaymentHistoryComponent>;
	let service: ServicePaymentService;
	let requestsService: RequestsService;
	let router: Router;
	let utilsService: UtilsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServicePaymentHistoryComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
				RouterTestingModule
			],
			providers: [
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentHistoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(ServicePaymentService);
		router = TestBed.get(Router);
		utilsService = TestBed.get(UtilsService);
		requestsService = TestBed.get(RequestsService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call router whit app/payments/service/history', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToLanding();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments');
	});

	it('should change state of visibleFilters setter filteredSalaryPayments,totalSalariesSoonExpired and call resetPagination', () => {
		spyOn(component, 'resetPagination');
		component.visibleFilters = true;
		component.showFilters();
		expect(component.visibleFilters).toEqual(false);
		expect(component.resetPagination).toHaveBeenCalled();
	});

	it('should call changePagination, setPagination and increment page in one', () => {
		spyOn(component, 'setPagination');
		component.page = 1;
		component.changePagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(2);
	});

	it('should call resetPagination, setPagination, assign paginatedDebtsList empty and setter page in 1', () => {
		spyOn(component, 'setPagination');
		component.resetPagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(1);
		expect(component.paginatedHistoryList.length).toEqual(0);
	});

	it('should call getServicePaymentState', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({}))
		);
		component.getServicePayments();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('should call newPay', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.newPay();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/service/debt');
	});

	it('should call filterData with filters', () => {
		spyOn(component, 'resetPagination');
		spyOn(component, 'orderList').and.returnValue(listServices);
		component.servicePaymentsOrigin = listServices;
		component.filterData(filters);
		expect(component.resetPagination).toHaveBeenCalled();
		expect(component.orderList).toHaveBeenCalled();
		expect(component.filteredServicePayments).toEqual(listServices);
	});

	it('should call validateSearchField with filters and return true', () => {
		const validateSearchField = component.validateSearchField(
			listServices[0],
			filters
		);
		expect(validateSearchField).toBeTruthy();
	});

	it('should call validateSearchField with filters and return false', () => {
		spyOn(utilsService, 'removeSpecialCharater').and.returnValues('Cablevision','Telecentro');
		const validateSearchField = component.validateSearchField(
			listServices[2],
			filters
		);
		expect(utilsService.removeSpecialCharater).toHaveBeenCalled();
		expect(validateSearchField).toBeFalse();
	});

	it('should call validateState with filters and return true', () => {
		const validateState = component.validateState(listServices[0], filters);
		expect(validateState).toBeTruthy();
	});

	it('should call validateState with filters and return false', () => {
		const validateState = component.validateState(listServices[1], filters);
		expect(validateState).toBeFalsy();
	});

	it('should call exportToCSV ', () => {
		spyOn(service, 'exportToCSV');
		component.filteredServicePayments = listServices;
		component.exportServiceList();
		expect(service.exportToCSV).toHaveBeenCalled();
	});

	it('should call sort', () => {
		spyOn(Array.prototype, 'sort').and.callThrough();
		component.orderList(listServices);
		expect(Array.prototype.sort).toHaveBeenCalled();
		component.orderList(listServices);
		expect(Array.prototype.sort).toHaveBeenCalled();
	});
});
