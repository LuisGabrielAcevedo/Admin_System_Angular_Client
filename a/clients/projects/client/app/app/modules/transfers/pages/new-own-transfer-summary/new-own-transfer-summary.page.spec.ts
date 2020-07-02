import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NewOwnTransferSummaryPage } from './new-own-transfer-summary.page';
import { TransferService } from 'client/app/app/services/transfer.service';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import {  makeRequest, IRequestResponse } from 'client/app/app/models';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('NewOwnTransferAccounts', () => {
	let component: NewOwnTransferSummaryPage;
	let fixture: ComponentFixture<NewOwnTransferSummaryPage>;
	let router: Router;
	let transferService: TransferService;
	const request: IRequestResponse = {
		data: makeRequest({}),
		status: [
			{
				code : 'WIREMOCK:000',
				message : 'Operation successfully.',
				traceId : 'BFF-ACC:1581965136670'
			}
		],
		success: true
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				PipesModule
			],
			declarations: [NewOwnTransferSummaryPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: TransferService, useClass: TransferServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewOwnTransferSummaryPage);
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
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferAmount']);
	});

	it('should go to the next page', () => {
		spyOn(router, 'navigate');
		spyOn(transferService, 'submitRequestTransfer').and.returnValue(of(request));
		component.submitTransfer();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/success']);
		expect(transferService.submitRequestTransfer).toHaveBeenCalled();
	});

	it('should go to the edit account page', () => {
		spyOn(router, 'navigate');
		component.backToEditAccount();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferAccounts']);
	});

	it('should go to the edit balance page', () => {
		spyOn(router, 'navigate');
		component.backToEditBalance();
		expect(router.navigate).toHaveBeenCalledWith(['/app/transfers/ownTransferAmount']);
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
