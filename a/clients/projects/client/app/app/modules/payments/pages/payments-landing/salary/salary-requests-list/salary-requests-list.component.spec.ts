import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryRequestsListComponent } from './salary-requests-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { makeRequest } from 'client/app/app/models';
import { Router } from '@angular/router';

describe('SalaryRequestsListComponent', () => {
	let component: SalaryRequestsListComponent;
	let fixture: ComponentFixture<SalaryRequestsListComponent>;
	let service: RequestsService;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryRequestsListComponent],
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
		fixture = TestBed.createComponent(SalaryRequestsListComponent);
		service = TestBed.get(RequestsService);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
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
		const path = '';
		component.goTo(path);
		expect(service.updateRequestsState).toHaveBeenCalled();
	})
});
