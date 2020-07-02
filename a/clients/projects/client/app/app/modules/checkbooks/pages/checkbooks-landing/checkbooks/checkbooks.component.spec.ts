import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckbooksComponent } from './checkbooks.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { makeRequestState, makeRequest, makeRequestFilters, IRequest } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

describe('CheckbooksComponent', () => {
	let component: CheckbooksComponent;
	let fixture: ComponentFixture<CheckbooksComponent>;
	let requestsService: RequestsService;
	let router: Router;
	let sidenavService: SidenavService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CheckbooksComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(),
						RouterTestingModule
					],
			providers: [
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock},
				{ provide: UserService, useClass: UserServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckbooksComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		requestsService = TestBed.get(RequestsService)
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call to getRequestState', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({}))
		);
		component.ngOnInit();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('when requests in state IS empty, should call findRequests in requestsService', () => {
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

	it('when requests in state NOT empty, should call filterRequests and filterCheckbooks', () => {
		const _requests: IRequest[] = [makeRequest({})];
		spyOn(component, 'filterRequests')
		spyOn(component, 'filterCheckbooks')
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({
				requests: _requests,
				loading: false
			}))
		);
		component.getRequest();
		expect(component.filterRequests).toHaveBeenCalled();
		expect(component.filterCheckbooks).toHaveBeenCalled();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('should clear selected requests', () => {
		component.selectedRequests = [makeRequest({})];
		component.resetSelection();
		expect(component.selectedRequests.length).toBe(0);
	});

	it('should call changePagination, setPagination and increment page in one', () => {
		spyOn(component, 'setPagination');
		component.page = 1;
		component.changePagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(2);
	});

	it('should call resetPagination, setPagination, assign paginatedCheckbookRequestList empty and setter page in 1', () => {
		spyOn(component, 'setPagination');
		component.resetPagination();
		expect(component.setPagination).toHaveBeenCalled();
		expect(component.page).toEqual(1);
		expect(component.paginatedCheckbookRequestList.length).toEqual(0);
	});

	it('should call to updateRequestsState when go to path', () => {
		spyOn(requestsService, 'updateRequestsState');
		spyOn(router, 'navigateByUrl');
		const path = '';
		component.goTo(path);
		expect(requestsService.updateRequestsState).toHaveBeenCalled();
		expect(router.navigateByUrl).toHaveBeenCalled();
	})

	it('should call to filterRequests', () => {
		spyOn(requestsService, 'filterRequests').and.returnValue([makeRequest({})]);
		component.filterRequests(makeRequestFilters({}));
		expect(requestsService.filterRequests).toHaveBeenCalled();
	});

	it('should call to selectRequest', () => {
		spyOn(requestsService, 'selectRequest').and.returnValue([makeRequest({})]);
		component.select(makeRequest({}));
		expect(requestsService.selectRequest).toHaveBeenCalled();
	});

	it('when request checkbook is clicked, the function open in the sidenav is called', () => {
		spyOn(sidenavService, 'open');
		component.goToRequestCheckbooks();
		fixture.detectChanges();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call router whit app/requests/', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToRequestsLanding();
		expect(navigateSpy).toHaveBeenCalledWith('app/requests');
	});
});
