import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewThirdPartyTransferSummaryPage } from './new-third-party-transfer-summary.page';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { IRequestResponse, makeRequest } from 'client/app/app/models';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('NewThirdPartyTransferSummaryPage', () => {
	let component: NewThirdPartyTransferSummaryPage;
	let fixture: ComponentFixture<NewThirdPartyTransferSummaryPage>;
	let router: Router;
	let transferService: TransferService;

	const request: IRequestResponse = {
		data: makeRequest({}),
		status: [
			{
				code: 'WIREMOCK:000',
				message: 'Operation successfully.',
				traceId: 'BFF-ACC:1581965136670'
			}
		],
		success: true
	};

	const requestError: IRequestResponse = {
		data: makeRequest({}),
		status: [],
		success: false
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				PipesModule
			],
			declarations: [NewThirdPartyTransferSummaryPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewThirdPartyTransferSummaryPage);
		component = fixture.componentInstance;
		transferService = TestBed.get(TransferService)
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should go to the previous page', () => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferAccount']);
	});

	it('should call onSubmitToken', async(() => {
		spyOn(router, 'navigateByUrl');
		spyOn(transferService, 'submitRequestTransfer').and.returnValue(of(request));
		component.submitTransfer('123456').subscribe(() => {
			expect(transferService.submitRequestTransfer).toHaveBeenCalled();
			expect(router.navigateByUrl).toHaveBeenCalledWith('app/transfers/thirdPartyTransferSuccess');
		})
	}));

	it('should call onSubmitToken with Error', async(() => {
		spyOn(transferService, 'submitRequestTransfer').and.returnValue(of(requestError));
		component.submitTransfer('111111').subscribe(() => {
			expect(transferService.submitRequestTransfer).toHaveBeenCalled();
		});
	}));

	it('should go to the destinatary selection page', () => {
		spyOn(router, 'navigate');
		component.backToEditDestinatary();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferContact']);
	});

	it('should go to the edit transfer amount page', () => {
		spyOn(router, 'navigate');
		component.backToEditBalance();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferAmount']);
	});

	it('should go to the source account selection page', () => {
		spyOn(router, 'navigate');
		component.backToEditSource();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/thirdPartyTransferAccount']);
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers']);
	});

	it('should navigate on goToSelectTransfer', () => {
		spyOn(router, 'navigate');
		component.goToSelectTransfer();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/new']);
	});
});
