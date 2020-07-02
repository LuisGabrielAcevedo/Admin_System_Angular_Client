import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { TransactionServiceMock } from 'client/app/app/services/transaction.service.mock';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { makeRequestState, ITransactionsResponse } from 'client/app/app/models';
import { CancelRequestsComponent } from './cancel-requests.component';

describe('CancelRequestsComponent', () => {
	let component: CancelRequestsComponent;
	let fixture: ComponentFixture<CancelRequestsComponent>;
	let requestsService: RequestsService;
	let transactionService: TransactionService;
	let router: Router;
	let location: Location;

	const transactionSuccessResp : ITransactionsResponse = {
		success: true,
		status: [],
		data: []
	}

	const transactionErrorResp : ITransactionsResponse = {
		success: false,
		status: [],
		data: []
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CancelRequestsComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(), RouterTestingModule],
			providers: [
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: TransactionService, useClass: TransactionServiceMock },
				Location
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CancelRequestsComponent);
		requestsService = TestBed.get(RequestsService);
		transactionService = TestBed.get(TransactionService);
		router = TestBed.get(Router);
		location = TestBed.get(Location);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call to getRequestsState', () => {
		spyOn(requestsService, 'getRequestsState').and.returnValue(
			new BehaviorSubject(makeRequestState({}))
		);
		component.ngOnInit();
		expect(requestsService.getRequestsState).toHaveBeenCalled();
	});

	it('should call back in location when goToLanding is clicked', () => {
		spyOn(requestsService, 'resetSelectedState');
		spyOn(transactionService, 'resetState');
		spyOn(location, 'back');
		component.goToLanding();
		expect(requestsService.resetSelectedState).toHaveBeenCalled();
		expect(transactionService.resetState).toHaveBeenCalled();
		expect(location.back).toHaveBeenCalled();
	});

	it('should call back in location when edit is clicked', () => {
		spyOn(location, 'back');
		component.edit();
		expect(location.back).toHaveBeenCalled();
	});

	it('should call the router when the response is valid', () => {
		spyOn(transactionService, 'cancel').and.returnValue(of(transactionSuccessResp));
		spyOn(router, 'navigateByUrl');
		component.cancel();
		expect(router.navigateByUrl).toHaveBeenCalledWith('app/requests/cancel/status');
	});

	it('I shouldnt call the router when the response is valid', () => {
		spyOn(transactionService, 'cancel').and.returnValue(of(transactionErrorResp));
		spyOn(router, 'navigateByUrl');
		component.cancel();
		expect(router.navigateByUrl).not.toHaveBeenCalled();
	});
});
