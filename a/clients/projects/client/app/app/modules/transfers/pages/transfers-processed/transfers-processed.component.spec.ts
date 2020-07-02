import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersProcessedComponent } from './transfers-processed.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { AccountService } from 'client/app/app/services/account.service';
import { CoreModule } from '@mcy/core/core.module';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { Router } from '@angular/router';
import { makeAccountState, makeTransferFilters, makeTransfer } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';
import { CSVService } from 'client/app/app/services/csv.service';
import { CSVServiceMock } from 'client/app/app/services/csv.service.mock';
import { TranslateService } from '@ngx-translate/core';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { Observable } from 'rxjs';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';

describe('TransfersProcessedComponent', () => {
	let component: TransfersProcessedComponent;
	let fixture: ComponentFixture<TransfersProcessedComponent>;
	let router: Router;
	let transfersService: TransferService;
	let utilsService: UtilsService;
	let accountService: AccountService;
	let translateService: TranslateService;
	let receiptsService: ReceiptsService;
	let csvService: CSVService;
	let sidenavService: SidenavService;

	const transferList = [
		makeTransfer({})
	];

	const transfer = makeTransfer({
		destinationHolder: 'foo',
		id: '123',
		state: 'APPROVED',
		date: new Date('03/01/2020')
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TransfersProcessedComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				CoreModule.forRoot(),
				PipesModule
			],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: CSVService, useClass: CSVServiceMock},
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				RouterTestingModule
			]

		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransfersProcessedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.get(Router);
		utilsService = TestBed.get(UtilsService);
		transfersService = TestBed.get(TransferService);
		accountService = TestBed.get(AccountService);
		translateService = TestBed.get(TranslateService);
		receiptsService = TestBed.get(ReceiptsService);
		csvService = TestBed.get(CSVService);
		sidenavService = TestBed.get(SidenavService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should find accounts and transfers', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(new BehaviorSubject(makeAccountState({ searchedAccounts: false })))
		spyOn(accountService, 'findAccounts');
		spyOn(transfersService, 'findTransfers');
		component.ngOnInit();
		expect(accountService.findAccounts).toHaveBeenCalled();
		expect(transfersService.findTransfers).toHaveBeenCalled();
	});

	it('should not find accounts and transfers', () => {
		spyOn(transfersService, 'findTransfers');
		component.ngOnInit();
		expect(transfersService.findTransfers).toHaveBeenCalled();
	});

	it('should handle navigation to new transfer with multiple accounts with the same currency', () => {
		spyOnProperty(accountService, 'hasMultipleSameCurrencyAccounts').and.returnValue(true);
		spyOn(router, 'navigate');
		component.onNewTransferClick();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/new']);
	});

	it('should handle navigation to new transfer without multiple accounts with the same currency', () => {
		spyOnProperty(accountService, 'hasMultipleSameCurrencyAccounts').and.returnValue(false);
		spyOn(router, 'navigate');
		component.onNewTransferClick();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferContact']);
	});

	it('should handle navigation to transfers', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers']);
	});

	it('should return the date with the standard format', () => {
		spyOn(utilsService, 'formatDate');
		component.formatDate(new Date('2020-01-12T03:00:00.000Z'));
		expect(utilsService.formatDate).toHaveBeenCalled();
	});

	it('should handle onFiltersChange', () => {
		spyOnProperty(component, 'filteredTransfers').and.returnValue(transferList);
		component.onFiltersChange(makeTransferFilters({}));
		expect(component.transfersListTableSource.data).toEqual(transferList);
	})

	it('should handle showMoreTransfersProcessed', () => {
		spyOnProperty(component, 'filteredTransfers').and.returnValue(transferList);
		component.showMoreTransfersProcessed();
		expect(component.transfersListTableSource.data).toEqual(transferList);
	});

	it('should handle validateTransferKeyword', () => {
		component.transferFilters.searchKeyword = '';
		expect(component.validateTransferKeyword(transfer)).toBeTrue();

		component.transferFilters.searchKeyword = 'fo';
		expect(component.validateTransferKeyword(transfer)).toBeTrue();

		component.transferFilters.searchKeyword = 'bar';
		expect(component.validateTransferKeyword(transfer)).toBeFalse();

		component.transferFilters.searchKeyword = '123';
		expect(component.validateTransferKeyword(transfer)).toBeTrue();

		component.transferFilters.searchKeyword = '124';
		expect(component.validateTransferKeyword(transfer)).toBeFalse();
	});

	it('should handle validateTransferStatus', () => {
		component.transferFilters.transferStatus = '';
		expect(component.validateTransferStatus(transfer)).toBeTrue();

		component.transferFilters.transferStatus = 'APPROVED';
		expect(component.validateTransferStatus(transfer)).toBeTrue();

		component.transferFilters.transferStatus = 'DENIED';
		expect(component.validateTransferStatus(transfer)).toBeFalse();
	});

	it('should handle validateTransferFromDate', () => {
		component.transferFilters.transferExecutionDateFrom = '';
		expect(component.validateTransferFromDate(transfer)).toBeTrue();

		component.transferFilters.transferExecutionDateFrom = '01/01/2020'
		expect(component.validateTransferFromDate(transfer)).toBeTrue();

		component.transferFilters.transferExecutionDateFrom = '05/01/2020'
		expect(component.validateTransferFromDate(transfer)).toBeFalse();
	});

	it('should handle validateTransferToDate', () => {
		component.transferFilters.transferExecutionDateTo  = '';
		expect(component.validateTransferToDate(transfer)).toBeTrue();

		component.transferFilters.transferExecutionDateTo  = '05/01/2020'
		expect(component.validateTransferToDate(transfer)).toBeTrue();

		component.transferFilters.transferExecutionDateTo  = '01/01/2020'
		expect(component.validateTransferToDate(transfer)).toBeFalse();
	});

	it('should handle onFilterClick', () => {
		spyOnProperty(component, 'filteredTransfers').and.returnValue(transferList);

		component.isFilterActive = false;
		component.onFilterClick();
		expect(component.transfersListTableSource.data).not.toEqual(transferList);

		component.isFilterActive = true;
		component.onFilterClick();
		expect(component.transfersListTableSource.data).toEqual(transferList);
	});

	it('should return the correct table header', () => {
		const spy = spyOn(translateService, 'instant').and.returnValue('test');
		const tableHeader = component.tableHeader;

		expect(spy.calls.allArgs()).toEqual([
			['pages.transfers.transfersProcessed.nameCSV'],
			['pages.transfers.transfersProcessed.amountCSV'],
			['pages.transfers.transfersProcessed.dateCSV'],
			['pages.transfers.transfersProcessed.operationNumberCSV'],
			['pages.transfers.transfersProcessed.stateCSV']
		]);

		expect(tableHeader).toEqual(['test', 'test', 'test', 'test', 'test']);

	});

	it('should return the correct table header', () => {
		spyOn(csvService, 'downloadCSV');
		component.onExportClick();

		expect(csvService.downloadCSV).toHaveBeenCalled();
	});

	it('should call the pdf generation service', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(new Observable());
		const sampleTransfer = makeTransfer({});
		sampleTransfer.id = 'test'
		component.downloadReceipt(sampleTransfer);
		expect(receiptsService.getReceipt).toHaveBeenCalledWith('test');
	});


	it('should open the sworn declaration sidenav', () => {
		spyOn(sidenavService, 'open');
		component.showDetails(transfer);
		expect(sidenavService.open).toHaveBeenCalled();
	});

});
