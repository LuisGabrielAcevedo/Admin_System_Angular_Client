import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServiceComponent } from './service.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceDebtService } from 'client/app/app/services/service-debt.service';
import { ServiceDebtServiceMock } from 'client/app/app/services/service-debt.service.mock';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { makeServiceDebtState } from 'client/app/app/models';
import { IServiceDebt, makeServiceDebt } from 'client/app/app/models';
import { IPaymentFilters } from 'client/app/app/modules/payments/models/payments-filters'
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ServiceServiceMock } from 'client/app/app/services/service.service.mock';
import { ServiceService } from 'client/app/app/services/service.service';
import { ServiceCategoryService } from 'client/app/app/services/service-category.service';
import { ServiceCategoryServiceMock } from 'client/app/app/services/service-category.service.mock';
xdescribe('ServiceComponent', () => {
	let component: ServiceComponent;
	let fixture: ComponentFixture<ServiceComponent>;
	let router: Router;
	let service: ServiceDebtService;
	const filters: IPaymentFilters = {
		searchField: 'Cable',
		startDate: new Date(),
		endDate: new Date()
	};
	const debts: IServiceDebt[] = [
		makeServiceDebt({
			banelcoClientId: '545620333433456675723766',
			serviceId: '5dfa20333d33cde6c5f23e66',
			description: 'Cablevisión',
			usdPayment: false,
			expirationDate: new Date('1/2/2020'),
			amount: 5000
		}),
		makeServiceDebt({
			banelcoClientId: '545620333433456675723765',
			serviceId: '5dfa20333d33cde6c5f23e67',
			description: 'Telecentro',
			usdPayment: false,
			expirationDate: new Date('1/1/2020'),
			amount: 5000
		})
	];

	const debtsOrdered: IServiceDebt[] = [
		makeServiceDebt({
			banelcoClientId: '545620333433456675723766',
			serviceId: '5dfa20333d33cde6c5f23e66',
			description: 'Cablevisión',
			usdPayment: false,
			expirationDate: new Date('1/1/2020'),
			amount: 5000
		}),
		makeServiceDebt({
			banelcoClientId: '545620333433456675723765',
			serviceId: '5dfa20333d33cde6c5f23e67',
			description: 'Telecentro',
			usdPayment: false,
			expirationDate: new Date('1/2/2020'),
			amount: 5000
		})
	];
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServiceComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: ServiceDebtService, useClass: ServiceDebtServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: SidenavService, useClass: ServiceServiceMock },
				{ provide: ServiceService, useClass: ServiceServiceMock },
				{ provide: ServiceCategoryService, useClass: ServiceCategoryServiceMock },

			],
			imports: [TranslateModule.forRoot(), RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.get(Router);
		service = TestBed.get(ServiceDebtService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call router whit app/payments/service/history', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToServicePaymentHistory();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/service/history');
	});

	it('should change state of visibleFilters setter filteredDebList,totalServicesSoonExpired and call resetPagination', () => {
		spyOn(component, 'resetPagination');
		component.visibleFilters = true;
		component.showFilters();
		expect(component.visibleFilters).toEqual(false);
		expect(component.resetPagination).toHaveBeenCalled();
	});

	xit('should call getServiceDebtState', () => {
		spyOn(service, 'getServiceDebtState').and.returnValue(
			new BehaviorSubject(makeServiceDebtState({}))
		);
		component.getServiceDebt();
		expect(service.getServiceDebtState).toHaveBeenCalled();
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
		expect(component.paginatedDebtsList.length).toEqual(0);
	});

	it('should call newPay', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.newPay();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/service/debt');
	});

	it('should call open with payServiceDebt', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.newPay();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/service/debt');
	});

	it('should call filterData with filters', () => {
		spyOn(component, 'resetPagination');
		spyOn(component, 'orderList').and.returnValue(debtsOrdered);
		component.debtsListOrigin = debts;
		component.filterData(filters);
		expect(component.resetPagination).toHaveBeenCalled();
		expect(component.orderList).toHaveBeenCalled();
		expect(component.filteredDebtsList ).toEqual(debtsOrdered);
	});

	it('should call sort', () => {
		spyOn(Array.prototype, 'sort').and.callThrough();
		component.orderList(debts);
		expect(Array.prototype.sort).toHaveBeenCalled();
		component.orderList(debtsOrdered);
		expect(Array.prototype.sort).toHaveBeenCalled();
	});
});
