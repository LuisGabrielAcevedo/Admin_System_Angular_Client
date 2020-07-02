import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecksDiscountedComponent } from './checks-discounted.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChecksService } from 'client/app/app/services/checks.service';
import { ChecksServiceMock } from 'client/app/app/services/checks.service.mock';
import { ICheckDiscounted, makeCheckDiscounted, makeCurrency } from 'client/app/app/models';
import { IChecksFilters } from 'client/app/app/modules/checkbooks/models/checks-filters';

describe('ChecksDiscountedComponent', () => {
	let component: ChecksDiscountedComponent;
	let fixture: ComponentFixture<ChecksDiscountedComponent>;
	const filters: IChecksFilters = {
		searchField: '123456',
		startDate: new Date(),
		endDate: new Date()
	};

	const checkDiscountedList: ICheckDiscounted[] = [
		makeCheckDiscounted(
			{
				number: '1234567890123456',
				debitAccount: {number:'0000001', type: 'CC'},
				deadline:'deadlineTest',
				finishDate: new Date(),
				tna: 123456,
				cftea: 'cfteaTest',
				accreditationDate: new Date('1/3/2020'),
				amount: 12340,
				currency: makeCurrency({symbol:'ARS'})
			}
		),
		makeCheckDiscounted(
			{
				number: '1234567890123456',
				debitAccount: {number:'0000001', type: 'CC'},
				deadline:'deadlineTest',
				finishDate: new Date(),
				tna: 123456,
				cftea: 'cfteaTest',
				accreditationDate: new Date('1/2/2020'),
				amount: 12340,
				currency: makeCurrency({symbol:'ARS'})
			}
		)
	];

	const checkDiscountedOrdered: ICheckDiscounted[] = [
		makeCheckDiscounted(
			{
				number: '1234567890123456',
				debitAccount: {number:'0000001', type: 'CC'},
				deadline:'deadlineTest',
				finishDate: new Date(),
				tna: 123456,
				cftea: 'cfteaTest',
				accreditationDate: new Date('1/1/2020'),
				amount: 12340,
				currency: makeCurrency({symbol:'ARS'})
			}
		),
		makeCheckDiscounted(
			{
				number: '1234567890123456',
				debitAccount: {number:'0000001', type: 'CC'},
				deadline:'deadlineTest',
				finishDate: new Date(),
				tna: 123456,
				cftea: 'cfteaTest',
				accreditationDate: new Date('1/3/2020'),
				amount: 12340,
				currency: makeCurrency({symbol:'ARS'})
			}
		)
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports:[TranslateModule.forRoot(), CoreModule.forRoot()],
			declarations: [ ChecksDiscountedComponent ],
			providers:[
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: ChecksService, useClass: ChecksServiceMock }

			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChecksDiscountedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	it('should call sort', () => {
		spyOn(Array.prototype, 'sort').and.callThrough();
		component.orderList(checkDiscountedList);
		expect(Array.prototype.sort).toHaveBeenCalled();
	});

	it('should call unsubscribe of Subscription', ()=>{
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();

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
		expect(component.paginatedChecksDiscounted.length).toEqual(0);
	});

	it('should call filterData with filters', () => {
		spyOn(component, 'resetPagination');
		spyOn(component, 'orderList').and.returnValue(checkDiscountedOrdered);
		component.checksDiscountedOrigin = checkDiscountedList;
		component.filterData(filters);
		expect(component.resetPagination).toHaveBeenCalled();
		expect(component.orderList).toHaveBeenCalled();
		expect(component.filteredCheckDiscounted ).toEqual(checkDiscountedOrdered);
	});

});
