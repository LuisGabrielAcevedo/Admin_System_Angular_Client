import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChanges, SimpleChange } from '@angular/core';
import { AccountMovementsComponent } from './account-movements.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { IAccountsFilters } from 'client/app/app/modules/accounts/models/accounts-filters';
import { IAccountMovement, makeAccountMovement } from 'client/app/app/modules/accounts/models';
import { MovementsService } from 'client/app/app/services/movements.service';
import { MovementsServiceMock } from 'client/app/app/services/movements.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
const filters: IAccountsFilters = {
	searchField: 'Pago',
	startDate: new Date('2020-01-01T00:00:00.648Z'),
	endDate: new Date()
};

const filtersSpecific: IAccountsFilters = {
	searchField: 'Pago',
	startDate: new Date('2020-01-01T00:00:00.648Z'),
	endDate: new Date('2020-01-01T23:59:00.648Z')
};

const accountsMovementsList: IAccountMovement[] = [
	makeAccountMovement({
		id: '1234566789',
		amount: 1000,
		balance: 1000,
		accountingDate: new Date('2020-02-24T12:45:25.648Z'),
		valueDate: new Date('2020-01-10T12:45:25.648Z'),
		description: 'Pago de Haberes'
	}),
	makeAccountMovement({
		id: '1234566788',
		amount: 1000,
		balance: 1000,
		accountingDate: new Date('2020-02-01T12:45:25.648Z'),
		valueDate: new Date('2020-02-10T12:45:25.648Z'),
		description: 'Acreditación cheque #XX00001'
	}),
	makeAccountMovement({
		id: '1234566787',
		amount: 1000,
		balance: 1000,
		accountingDate: new Date('2020-02-01T12:45:25.648Z'),
		valueDate: new Date('2020-02-10T12:45:25.648Z'),
		description: 'Acreditación cheque #XX00001'
	}),
	makeAccountMovement({
		id: '1234566786',
		amount: 1000,
		balance: 1000,
		accountingDate: new Date('2020-02-01T12:45:25.648Z'),
		valueDate: new Date('2020-02-10T12:45:25.648Z')
	})
];


describe('AccountMovementsComponent', () => {
	let component: AccountMovementsComponent;
	let fixture: ComponentFixture<AccountMovementsComponent>;
	let utilsService: UtilsService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountMovementsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [{ provide: MovementsService, useClass: MovementsServiceMock },
						{ provide: UtilsService, useClass: UtilsServiceMock }]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountMovementsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		utilsService = TestBed.get(UtilsService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should change state of visibleFilters setter filteredListAccountMovement,totalAccountsMovements and call resetPagination', () => {
		spyOn(component, 'resetPagination');
		component.visibleFilters = true;
		component.showFilters();
		expect(component.visibleFilters).toEqual(false);
		expect(component.resetPagination).toHaveBeenCalled();
	});

	it('should call changePagination, setPagination and increment page in one', () => {
		component.page = 1;
		component.changePagination();
		expect(component.page).toEqual(2);
	});

	it('should call changePagination, setPagination and increment page in one', () => {
		component.page = 1;
		component.changePagination();
		expect(component.page).toEqual(2);
	});

	it('should call validateSearchField with filters and return true', () => {
		const validateSearchField = component.validateSearchField(
			accountsMovementsList[0],
			filters
		);
		expect(validateSearchField).toBeTruthy();
	});

	it('should call validateSearchField with filters and return false', () => {
		spyOn(utilsService, 'removeSpecialCharater').and.returnValues('Cablevision','Telecentro');
		const validateSearchField = component.validateSearchField(
			accountsMovementsList[2],
			filters
		);
		expect(utilsService.removeSpecialCharater).toHaveBeenCalled();
		expect(validateSearchField).toBeFalse();
	});

	it('should call ngOnChanges', () => {
		fixture.detectChanges();
		const changes: SimpleChanges = {movements:new SimpleChange(null,accountsMovementsList,true)};
		component.ngOnChanges(changes);
	});

	it('should call validateDateRange with filters, accountsMovementsList and return true', () => {
		const validateRange = component.validateDateRange(
			accountsMovementsList[0],
			filters
		);

		expect(validateRange).toBeTruthy();
	});

	it('should call validateDateRange with filters, accountsMovementsList and return false', () => {
		const validateRange = component.validateDateRange(
			accountsMovementsList[2],
			filtersSpecific
		);
		expect(validateRange).toBeFalsy();
	});

	it('should call filterData with filters', () => {
		spyOn(component, 'resetPagination');
		component.filterData(filters);
		expect(component.resetPagination).toHaveBeenCalled();
	});

	it('should call resetPagination, setPagination, assign paginatedAccountMovementsList empty and setter page in 1', () => {
		component.resetPagination();
		expect(component.page).toEqual(1);
		expect(component.paginatedAccountMovementsList.length).toEqual(0);
	});


	it('should call changePagination, setPagination and increment page in one', () => {
		component.page = 1;
		component.changePagination();
		expect(component.page).toEqual(2);
	});
});
