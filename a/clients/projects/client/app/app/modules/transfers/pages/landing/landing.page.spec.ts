import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LandingPage } from './landing.page';
import { TranslateModule } from '@ngx-translate/core';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@mcy/core/core.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { AccountService } from 'client/app/app/services/account.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { makeAccountState, ITransfer, makeTransfer, makeRequestState, makeTransferState } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { Observable } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('LandingPage', () => {
	let component: LandingPage;
	let fixture: ComponentFixture<LandingPage>;
	let accountService: AccountService;
	let transfersService: TransferService;
	let router: Router;
	let utilsService: UtilsService;
	let sidenavService: SidenavService;
	let receiptsService: ReceiptsService;
	let requestsService: RequestsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LandingPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
				RouterTestingModule,
				PipesModule],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: UserService, useClass: UserServiceMock },
				RouterTestingModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LandingPage);
		component = fixture.componentInstance;
		accountService = TestBed.get(AccountService);
		transfersService = TestBed.get(TransferService);
		receiptsService = TestBed.get(ReceiptsService);
		utilsService = TestBed.get(UtilsService);
		sidenavService = TestBed.get(SidenavService);
		requestsService = TestBed.get(RequestsService);
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should find accounts', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(new BehaviorSubject(makeAccountState({ searchedAccounts: false })))
		spyOn(accountService, 'findAccounts');
		spyOn(transfersService, 'findTransfers');
		component.ngOnInit();
		expect(accountService.findAccounts).toHaveBeenCalled();
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

	it('should handle navigation to transfers processed', () => {
		spyOn(router, 'navigate');
		component.showMoreTransfersProcessed();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/transfersProcessed']);
	});

	it('should return the date with the standard format', () => {
		spyOn(utilsService, 'formatDate');
		component.formatDate(new Date('2020-01-12T03:00:00.000Z'));
		expect(utilsService.formatDate).toHaveBeenCalled();
	});

	it('should open the sworn declaration sidenav', () => {
		spyOn(sidenavService, 'open');
		const transfer: ITransfer = makeTransfer({});
		component.showDetails(transfer);
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call the pdf generation service', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(new Observable());
		const sampleTransfer = makeTransfer({});
		sampleTransfer.id = 'test'
		component.downloadReceipt(sampleTransfer);
		expect(receiptsService.getReceipt).toHaveBeenCalledWith('test');
	});

	it('should return isLoading true when component is initialized', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(new BehaviorSubject(makeRequestState({loading: true})));
		spyOn(transfersService, 'getTransferState').and.returnValue(new BehaviorSubject(makeTransferState({loading: true})));
		component.ngOnInit();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
		expect(transfersService.getTransferState).toHaveBeenCalled();
		expect(component.isLoading).toBeTrue();
	})

	it('should return isLoading false when services get information', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(new BehaviorSubject(makeRequestState({loading: false})));
		spyOn(transfersService, 'getTransferState').and.returnValue(new BehaviorSubject(makeTransferState({loading: false})));
		component.ngOnInit();
		expect(component.isLoading).toBeFalse();
	})
});
