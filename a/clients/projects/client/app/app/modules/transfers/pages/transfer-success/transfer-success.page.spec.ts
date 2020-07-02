import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TransferSuccessPage } from './transfer-success.page';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { TransferService } from 'client/app/app/services/transfer.service';
import { AccountService } from 'client/app/app/services/account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { BehaviorSubject } from 'rxjs';
import { makeAccount, makeAccountState, makeRequest, makeTransfer } from 'client/app/app/models';
import { Router } from '@angular/router';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { Observable } from 'rxjs';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { ConceptService } from 'client/app/app/services/concept.service';
import { ConceptServiceMock } from 'client/app/app/services/concept.service.mock';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';

describe('TransferSuccessPage', () => {
	let component: TransferSuccessPage;
	let fixture: ComponentFixture<TransferSuccessPage>;
	let accountService: AccountService;
	let receiptsService: ReceiptsService;
	let router: Router;

	const accountStateWithAccounts = makeAccountState({
		searchedAccounts: true,
		accounts: [makeAccount({
			cbvu: '1',
			number: '123456789101',
			type: 'CC'
		})],
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransferSuccessPage],
			imports: [
				TranslateModule.forRoot(),
				CoreModule,
				RouterTestingModule,
				PipesModule,
			],
			providers: [
				{provide: TransferService, useClass: TransferServiceMock},
				{provide: AccountService, useClass: AccountServiceMock},
				{provide: UtilsService, useClass: UtilsServiceMock},
				{provide: PdfService, useClass: PdfServiceMock },
				{provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{provide: StorageService, useClass: StorageServiceMock },
				{provide: ConceptService, useClass: ConceptServiceMock},
				{provide: SidenavService, useClass: SidenavServiceMock}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransferSuccessPage);
		component = fixture.componentInstance;
		accountService = TestBed.get(AccountService);
		receiptsService = TestBed.get(ReceiptsService);
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the account state', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(
			new BehaviorSubject(makeAccountState({})),
		);
		component.ngOnInit();
		expect(accountService.getAccountState).toHaveBeenCalled();
	});

	it('should get an origin account number from a cbvu 1', () => {
		component.accountState = accountStateWithAccounts;
		spyOn(component, 'formatAccountNumber').and.returnValue('12345678-910/1');
		component.lastTransfer =  makeRequest({
			content: makeTransfer({
				originCbvu: '1',
			})
		});

		expect(component.originAccount).toEqual('CC 12345678-910/1');
	});

	it('should get an origin account number from a cbvu', () => {
		component.accountState = accountStateWithAccounts;
		spyOn(component, 'formatAccountNumber').and.returnValue('12345678-910/1');
		component.lastTransfer =  makeRequest({
			content: makeTransfer({
				destinationCbvu: '1',
			})
		});
		expect(component.destinationAccount).toEqual('CC 12345678-910/1');
	});

	it('should navigate on primary button click', () => {
		spyOn(router, 'navigate');
		component.onPrimaryButtonClick();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should navigate on cancel button click', () => {
		spyOn(router, 'navigate');
		component.goToSelectTransfer();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should navigate on secondary button click', () => {
		spyOn(router, 'navigate');
		component.onSecondaryButtonClick();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should call the pdf generation service', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(new Observable());
		component.lastTransfer = makeRequest({
			id: 'test'
		});
		component.downloadReceipt();
		expect(receiptsService.getReceipt).toHaveBeenCalledWith('test');
	});
});
