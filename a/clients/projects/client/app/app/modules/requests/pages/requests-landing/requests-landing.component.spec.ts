import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RequestsLandingComponent } from './requests-landing.component';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { makeRequestState, IRequest, makeRequest, makeCurrency, makeRequestFilters } from 'client/app/app/models';

describe('RequestsLandingComponent', () => {
	let component: RequestsLandingComponent;
	let fixture: ComponentFixture<RequestsLandingComponent>;
	let requestsService: RequestsService;
	let router: Router;

	const requests: IRequest[] = [
		makeRequest({
			currency: makeCurrency({
				symbol: 'ARS'
			}),
			amount: 500
		}),
		makeRequest({
			currency: makeCurrency({
				symbol: 'ARS'
			}),
			amount: 500
		})
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestsLandingComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [CoreModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestsLandingComponent);
		requestsService = TestBed.get(RequestsService);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call to getRequestsState', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({
				requests
			}))
		);
		component.getRequest();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('when requests in state is empty, should call findRequests in requestsService', () => {
		spyOn(requestsService, 'findRequests')
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({
				requests: [],
				loading: false
			}))
		);
		component.getRequest();
		expect(requestsService.findRequests).toHaveBeenCalled();
	});

	it('when select is called, selectRequest in requestsService is called', () => {
		spyOn(requestsService, 'selectRequest');
		component.select(makeRequest({}));
		expect(requestsService.selectRequest).toHaveBeenCalled();
	});

	it('when changePagination is called, setPagination is called', () => {
		spyOn(component, 'setPagination');
		component.changePagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(2);
	});


	it('when resetPagination is called, page should be 1', () => {
		spyOn(component, 'setPagination');
		component.resetPagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(1);
	});

	it('when goTo is called, navigateByUrl in the router is called', () => {
		spyOn(requestsService, 'updateRequestsState');
		spyOn(router, 'navigateByUrl');
		component.goTo('app/requests/sign/status');
		expect(requestsService.updateRequestsState).toHaveBeenCalled();
		expect(router.navigateByUrl).toHaveBeenCalledWith('app/requests/sign/status');
	});

	it('when onMyRequestsToggle is called with true, myRequests in currentFilters is true', () => {
		spyOn(component, 'filterRequests');
		component.onMyRequestsToggle(true);
		expect(component.filterRequests).toHaveBeenCalled();
		expect(component.currentFilters.myRequests).toBeTruthy();
	});

	it('when resetSelection si called, selectedRequests is empty', () => {
		component.resetSelection();
		expect(component.selectedRequests.length).toBe(0);
	});

	it('when filterRequests is called, filterData, resetSelection are called', () => {
		spyOn(component, 'filterData');
		spyOn(component, 'resetSelection');
		component.filterRequests(makeRequestFilters({}));
		expect(component.filterData).toHaveBeenCalled();
		expect(component.resetSelection).toHaveBeenCalled();
	});

	it('when filterData is called, filterRequests and orderList in requestsService are called', () => {
		spyOn(requestsService, 'filterRequests').and.returnValue(requests);
		spyOn(requestsService, 'orderList').and.returnValue(requests);
		component.filterData(makeRequestFilters({}));
		expect(requestsService.filterRequests).toHaveBeenCalled();
		expect(requestsService.orderList).toHaveBeenCalled();
		expect(component.totalRequest).toBe(2);
	});
});
