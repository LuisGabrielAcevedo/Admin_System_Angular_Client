import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryComponent } from './salary.page';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import {
	ISalaryPaymentState,
	makeSalaryPaymentState
} from 'client/app/app/modules/payments/models/salary-payment';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { makeRequestState, makeRequest, makeRequestFilters } from 'client/app/app/models';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

const filters: IPaymentFilters = {
	searchField: 'Jhon',
	state: 'APPROVED',
	startDate: new Date('2020-01-01T12:45:25.648Z'),
	endDate: new Date()
};

const listSalary: ISalaryPaymentState[] = [
	makeSalaryPaymentState({
		salaryPayments: [
			{
				id: '11111118',
				amount: 1510,
				conceptCode: '001',
				controlNumber: '123456',
				destinationHolder: 'Jhon Doe',
				originCuilt: '20111111115',
				originCbvu: '2591234610678911123452',
				destinationCuilt: '20666666665',
				destinationCbvu: '2591234620123456789112',
				date: new Date('2020-02-26T12:45:25.648Z'),
				state: 'APPROVED',
				currency: {
					code: '032',
					symbol: 'ARS',
					description: 'a small transfer example'
				}
			},
			{
				id: '11111118',
				amount: 1510,
				conceptCode: '001',
				controlNumber: '123456',
				destinationHolder: 'Jose Altuve',
				originCuilt: '20111111115',
				originCbvu: '2591234610678911123452',
				destinationCuilt: '20666666665',
				destinationCbvu: '2591234620123456789112',
				date: new Date('2020-02-20T12:45:25.648Z'),
				state: 'DENIED',
				currency: {
					code: '032',
					symbol: 'ARS',
					description: 'a small transfer example'
				}
			}
		]
	})
];
describe('SalaryComponent', () => {
	let component: SalaryComponent;
	let fixture: ComponentFixture<SalaryComponent>;
	let service: SalaryPaymentService;
	let router: Router;
	let utilsService: UtilsService;
	let requestsService: RequestsService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), RouterTestingModule],
			providers: [
				{ provide: SalaryPaymentService, useClass: SalaryPaymentServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(SalaryPaymentService);
		requestsService = TestBed.get(RequestsService)
		router = TestBed.get(Router);
		utilsService =  TestBed.get(UtilsService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call router whit app/payments/service/history', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToNewSalaryPayment();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary');
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
		expect(component.paginatedSalaryPaymentsList.length).toEqual(0);
	});

	it('should call getSalaryPaymentState', () => {
		spyOn(service, 'getSalaryPaymentState').and.returnValue(
			new BehaviorSubject(makeSalaryPaymentState({}))
		);
		component.ngOnInit();
		expect(service.getSalaryPaymentState).toHaveBeenCalled();
	});

	it('should call filterData with filters', () => {
		spyOn(component, 'resetPagination');
		spyOn(component, 'orderList').and.returnValue(listSalary[0].salaryPayments);
		component.filterData(filters);
		expect(component.resetPagination).toHaveBeenCalled();
		expect(component.orderList).toHaveBeenCalled();
		expect(component.filteredSalaryPayments).toEqual(
			listSalary[0].salaryPayments
		);
	});

	it('should call validateSearchField with filters and return true', () => {
		const validateSearchField = component.validateSearchField(
			listSalary[0].salaryPayments[0],
			filters
		);
		expect(validateSearchField).toBeTruthy();
	});

	it('should call validateSearchField with filters and return false', () => {
		spyOn(utilsService, 'removeSpecialCharater').and.returnValues('Jose Altuve','Jhon Doe');
		const validateSearchField = component.validateSearchField(
			listSalary[0].salaryPayments[1],
			filters
		);
		expect(utilsService.removeSpecialCharater).toHaveBeenCalled();
		expect(validateSearchField).toBeFalse();
	});

	it('should call validateState with filters and return true', () => {
		const validateState = component.validateState(
			listSalary[0].salaryPayments[0],
			filters
		);
		expect(validateState).toBeTruthy();
	});

	it('should call validateState with filters and return false', () => {
		const validateState = component.validateState(
			listSalary[0].salaryPayments[1],
			filters
		);
		expect(validateState).toBeFalsy();
	});

	it('should call sort', () => {
		spyOn(Array.prototype, 'sort').and.callThrough();
		component.orderList(listSalary[0].salaryPayments);
		expect(Array.prototype.sort).toHaveBeenCalled();
		component.orderList(listSalary[0].salaryPayments);
		expect(Array.prototype.sort).toHaveBeenCalled();
	});

	it('should call to getRequestState', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({}))
		);
		component.ngOnInit();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('should call to filterRequests', () => {
		spyOn(requestsService, 'filterRequests').and.returnValue([makeRequest({})]);
		component.filterRequests(makeRequestFilters({}));
		expect(requestsService.filterRequests).toHaveBeenCalled();
	});
});
