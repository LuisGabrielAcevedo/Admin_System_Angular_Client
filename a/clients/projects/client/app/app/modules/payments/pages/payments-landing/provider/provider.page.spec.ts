import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPageComponent } from './provider.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { CoreModule } from '@mcy/core/core.module';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { makeTransfer, ITransfer, makeRequestState, makeRequest, makeRequestFilters, IRequest } from 'client/app/app/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { ProviderPaymentServiceMock } from 'client/app/app/services/provider-payment.service mock';
import { UserService } from 'client/app/app/services/user.service';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { XHRService } from '@mcy/main/services/xhr.service';
import { XHRServiceMock } from '@mcy/main/services/xhr.service.mock';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';

describe('ProviderPageComponent', () => {
	let component: ProviderPageComponent;
	let fixture: ComponentFixture<ProviderPageComponent>;
	let router: Router;
	let sidenavService: SidenavService;
	let receiptsService: ReceiptsService;
	let requestsService: RequestsService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProviderPageComponent],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule, CoreModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: ProviderPaymentService, useClass: ProviderPaymentServiceMock },
				RouterTestingModule,
				{ provide: UserService, useClass: UserServiceMock },
				{ provide: EventService, useClass: EventServiceMock },
				{ provide: XHRService, useClass: XHRServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProviderPageComponent);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		sidenavService = TestBed.get(SidenavService);
		receiptsService = TestBed.get(ReceiptsService);
		requestsService = TestBed.get(RequestsService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	
	it('should call router whit app/payments/provider', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToNewProviderPayment();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/provider');
	});

	it('should open sidenav with a tranfer', () => {
		const mockTranfer: ITransfer = makeTransfer({})
		spyOn(sidenavService, 'open');
		component.showDetails(mockTranfer);
		expect(sidenavService.open).toHaveBeenCalled();
	})

	it('should call the pdf generation service', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(new Observable());
		const sampleTransfer = makeTransfer({});
		sampleTransfer.id = 'test'
		component.downloadReceipt(sampleTransfer);
		expect(receiptsService.getReceipt).toHaveBeenCalledWith('test');
	});

	it('should call incrementPagination, setPagination and increment page in one', () => {
		spyOn(component, 'setPagination');
		component.page = 1;
		component.incrementPagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(2);
	});

	it('should call to getRequestState', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({}))
		);
		component.ngOnInit();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('should call to filterRequests', () => {
		const requestArray: IRequest[] = [makeRequest({})];		
		spyOn(requestsService, 'filterRequests').and.returnValue([makeRequest({})]);
		component.filterData(makeRequestFilters({}), requestArray);
		expect(requestsService.filterRequests).toHaveBeenCalled();
	});

	it('should call to updateRequestsState when go to path', () => {
		spyOn(requestsService, 'updateRequestsState');
		spyOn(router, 'navigateByUrl');
		const path = '';
		component.goTo(path);
		expect(requestsService.updateRequestsState).toHaveBeenCalled();
		expect(router.navigateByUrl).toHaveBeenCalled();
	})

	it('should call to updateRequestsState when go to app/requests', () => {
		spyOn(requestsService, 'updateRequestsState');
		spyOn(router, 'navigateByUrl');
		component.goToRequestsLanging();
		expect(requestsService.updateRequestsState).toHaveBeenCalled();
		expect(router.navigateByUrl).toHaveBeenCalled();
	})

	it('should call to selectRequest', () => {
		spyOn(requestsService, 'selectRequest').and.returnValue([makeRequest({})]);
		component.select(makeRequest({}));
		expect(requestsService.selectRequest).toHaveBeenCalled();
	});

	it('should clear selected requests', () => {
		component.selectedRequests = [makeRequest({})];
		component.resetSelection();
		expect(component.selectedRequests.length).toBe(0);
	});

	it('should return only 5 elements', () => {
		component.filteredRequest = [
			makeRequest({}),makeRequest({}),
			makeRequest({}),makeRequest({}),
			makeRequest({}),makeRequest({})]
		expect(component.getRequestPerPage().length).toBe(5);
	});
});
