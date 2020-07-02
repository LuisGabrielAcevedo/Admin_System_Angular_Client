import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryScheduledRequestsComponent } from './salary-scheduled-requests.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { TransactionServiceMock } from 'client/app/app/services/transaction.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { makeRequest, ITransactionsResponse } from 'client/app/app/models';
import { IRequestCarouselAction } from 'client/app/app/models';
import { of } from 'rxjs';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';

describe('SalaryScheduledRequestsComponent', () => {
	let component: SalaryScheduledRequestsComponent;
	let fixture: ComponentFixture<SalaryScheduledRequestsComponent>;
	let transactionService: TransactionService;
	let toastService: ToastService;
	let requestsService: RequestsService;
	let sidenavService: SidenavService;

	const transactionSuccessResp: ITransactionsResponse = {
		success: true,
		status: [],
		data: []
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryScheduledRequestsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: TransactionService, useClass: TransactionServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: SoftTokenService, useClas: SoftTokenServiceMock}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryScheduledRequestsComponent);
		component = fixture.componentInstance;
		transactionService = TestBed.get(TransactionService);
		toastService = TestBed.get(ToastService);
		requestsService = TestBed.get(RequestsService);
		sidenavService = TestBed.get(SidenavService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call cancelRequestModal for action CANCEL and open the cancel request modal', () => {
		spyOn(component, 'cancelRequestModal');
		const cancelRequest: IRequestCarouselAction = { action: 'CANCEL', request: makeRequest({})};
		component.requestAction(cancelRequest);
		expect(component.cancelRequestModal).toHaveBeenCalled();
	});

	it('should call goToRequestDetail for action DETAIL and open the request detail', () => {
		spyOn(component, 'goToRequestDetail');
		const detailRequest: IRequestCarouselAction = { action: 'DETAIL', request: makeRequest({}) };
		component.requestAction(detailRequest);
		expect(component.goToRequestDetail).toHaveBeenCalled();
	});

	it('should call open from sidenavService', () => {
		spyOn(sidenavService, 'open');
		component.goToRequestDetail(makeRequest({}));
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call updateTransactionState on transactionService, cancelRequest on requestsService and show a toast msg', () => {
		spyOn(toastService, 'success');
		spyOn(requestsService, 'cancelRequest');
		spyOn(transactionService, 'updateTransactionState');
		spyOn(transactionService, 'cancel').and.returnValue(of(transactionSuccessResp));
		component.cancelRequest(makeRequest({})).subscribe(() => {
		expect(transactionService.updateTransactionState).toHaveBeenCalled();
		expect(requestsService.cancelRequest).toHaveBeenCalled();
		expect(toastService.success).toHaveBeenCalled();
		});
	});
});
