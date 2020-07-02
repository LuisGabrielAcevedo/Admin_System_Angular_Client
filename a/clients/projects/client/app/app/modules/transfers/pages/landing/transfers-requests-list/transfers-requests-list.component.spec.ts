import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfersRequestsListComponent } from './transfers-requests-list.component';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { makeRequestState, makeRequest, makeRequestFilters } from 'client/app/app/models/request';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

describe('TransfersRequestsListComponent', () => {
	let component: TransfersRequestsListComponent;
	let fixture: ComponentFixture<TransfersRequestsListComponent>;
	let service: RequestsService;
	let router:Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransfersRequestsListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				CoreModule.forRoot(),
				TranslateModule.forRoot(),
				RouterTestingModule
			],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: RequestsService, useClass: RequestsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransfersRequestsListComponent);
		service = TestBed.get(RequestsService);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call to getRequestState', () => {
		spyOn(service, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({}))
		);
		component.ngOnInit();
		expect(service.getRequestsState).toHaveBeenCalled();
	});

	it('should call to filterRequests', () => {
		spyOn(service, 'filterRequests').and.returnValue([makeRequest({})]);
		component.filterData(makeRequestFilters({}));
		expect(service.filterRequests).toHaveBeenCalled();
	});

	it('should call to selectRequest', () => {
		spyOn(service, 'selectRequest').and.returnValue([makeRequest({})]);
		component.select(makeRequest({}));
		expect(service.selectRequest).toHaveBeenCalled();
	});

	it('should clear selected requests', () => {
		component.selectedRequests = [makeRequest({})];
		component.resetSelection();
		expect(component.selectedRequests.length).toBe(0);
	});

	it('should call to updateRequestsState', () => {
		spyOn(service, 'updateRequestsState');
		spyOn(router, 'navigateByUrl');
		component.goToRequestsLanging();
		expect(service.updateRequestsState).toHaveBeenCalled();
	});

	it('should call to updateRequestsState', () => {
		spyOn(service, 'updateRequestsState');
		spyOn(router, 'navigateByUrl');
		const path = 'app/path';
		component.goTo(path);
		expect(service.updateRequestsState).toHaveBeenCalled();
	})
});
