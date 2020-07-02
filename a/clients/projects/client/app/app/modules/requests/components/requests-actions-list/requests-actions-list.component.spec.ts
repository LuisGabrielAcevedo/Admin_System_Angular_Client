import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { RequestsActionsListComponent } from './requests-actions-list.component';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeRequest, makeTransfer } from 'client/app/app/models';

describe('RequestsActionsListComponent', () => {
	let component: RequestsActionsListComponent;
	let fixture: ComponentFixture<RequestsActionsListComponent>;
	let utilsService: UtilsService;
	let requestsService: RequestsService;
	let translateService: TranslateService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestsActionsListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), PipesModule],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TranslateService, useClass: TranslateService }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestsActionsListComponent);
		utilsService = TestBed.get(UtilsService);
		requestsService = TestBed.get(RequestsService);
		translateService = TestBed.get(TranslateService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call to getOperationText in requestsService', () => {
		spyOn(requestsService, 'getOperationText');
		component.getOperation(makeRequest({}));
		expect(requestsService.getOperationText).toHaveBeenCalled();
	});

	it('should call to formatDate in utilsService', () => {
		spyOn(utilsService, 'formatDate');
		component.formatDate(new Date());
		expect(utilsService.formatDate).toHaveBeenCalled();
	});

	it('should call to translate pages.requests.signStatus.signedSuccessfully', () => {
		spyOn(translateService, 'instant');
		component.action = 'SIGN';
		component.getStateText(makeRequest({}));
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.signStatus.signedSuccessfully');
	});

	it('should call to translate pages.requests.cancelStatus.cancelled', () => {
		spyOn(translateService, 'instant');
		component.action = 'CANCEL';
		component.getStateText(makeRequest({}));
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.cancelStatus.cancelled');
	});

	it('should call to translate pages.requests.rejectStatus.rejected', () => {
		spyOn(translateService, 'instant');
		component.action = 'REJECT';
		component.getStateText(makeRequest({}));
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.rejectStatus.rejected');
	});

	it('should call to translate pages.requests.signStatus.error', () => {
		spyOn(translateService, 'instant');
		component.action = 'SIGN';
		component.errors = {
			['123456'] : 'Error en la firma'
		}
		component.getStateText(makeRequest({id: '123456'}));
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.signStatus.error');
	});

	it('isOpenRow should be true when the index exists in openRows', () => {
		component.showStatus = true;
		component.openRows = [2];
		const resp = component.isOpenRow(2);
		expect(resp).toBeTrue();
	});

	it('isCloseRow should be true when the request has error', () => {
		component.errors = {
			['123456'] : 'Error en la firma'
		};
		component.showStatus = true;
		component.openRows = [1];
		const resp = component.isCloseRow(2, makeRequest({id: '123456'}));
		expect(resp).toBeTrue();
	});

	it('should add a number to the openRows array', () => {
		component.openRow(2);
		expect(component.openRows.length).toBe(1);
	});

	it('should filter the openRows array', () => {
		component.openRows = [1,2,3];
		component.closeRow(1);
		expect(component.openRows.length).toBe(2);
	});

	it('showState should be true when the request has error', () => {
		component.errors = {
			['123456'] : 'Error en la firma'
		};
		const resp = component.showState(makeRequest({id: '123456'}));
		expect(resp).toBeTruthy();
	});

	it('should call the method goToSalaryDetail', () => {
		spyOn(component, 'goToSalaryDetail');
		component.goToDetail(makeRequest({
			type: 'TRANSFER',
			content: makeTransfer({
				conceptCode: 'HAB'
			})
		}));
		expect(component.goToSalaryDetail).toHaveBeenCalled();
	});

	it('should call the method goToTransferDetail', () => {
		spyOn(component, 'goToTransferDetail');
		component.goToDetail(makeRequest({
			type: 'TRANSFER',
			content: makeTransfer({})
		}));
		expect(component.goToTransferDetail).toHaveBeenCalled();
	});

	it('should call the method goToServicePaymentDetail', () => {
		spyOn(component, 'goToServicePaymentDetail');
		component.goToDetail(makeRequest({ type: 'SERVICE_PAYMENT' }));
		expect(component.goToServicePaymentDetail).toHaveBeenCalled();
	});
});
