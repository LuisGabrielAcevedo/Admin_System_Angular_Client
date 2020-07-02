import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RequestsService } from 'client/app/app/services/requests.service';
import { RequestsServiceMock } from 'client/app/app/services/requests.service.mock';
import { SignRequestsStatusComponent } from './sign-requests-status.component';
import { TransactionService } from 'client/app/app/services/transaction.service';
import { TransactionServiceMock } from 'client/app/app/services/transaction.service.mock';
import { BehaviorSubject } from 'rxjs';
import { makeTransactionState, makeTransaction, ITransaction, makeRequest, IRequest } from 'client/app/app/models';
import { Router } from '@angular/router';

describe('SignRequestsStatusComponent', () => {
	let component: SignRequestsStatusComponent;
	let fixture: ComponentFixture<SignRequestsStatusComponent>;
	let translateService: TranslateService;
	let transactionService: TransactionService;
	let router: Router

	const transactions: ITransaction[] = [
		makeTransaction({
			transaction: makeRequest({id: '123456'})
		}),
		makeTransaction({
			transaction: makeRequest({id: '654321'})
		})
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignRequestsStatusComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				CoreModule.forRoot(),
				RouterTestingModule,
			],
			providers: [
				{ provide: RequestsService, useClass: RequestsServiceMock },
				{ provide: TransactionService, useClass: TransactionServiceMock }
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SignRequestsStatusComponent);
		translateService = TestBed.get(TranslateService);
		transactionService = TestBed.get(TransactionService);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call to getTransactionState', () => {
		spyOn(transactionService, 'getTransactionState').and.returnValue(
			new BehaviorSubject(makeTransactionState({}))
		);
		component.ngOnInit();
		expect(transactionService.getTransactionState).toHaveBeenCalled();
	});

	it('should call the translate pages.requests.signStatus.successDescriptionMessage', () => {
		spyOn(translateService, 'instant');
		component.errors = 0;
		component.description();
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.signStatus.successDescriptionMessage');
	});

	it('should call the translate pages.requests.signStatus.errorDescriptionMessage', () => {
		spyOn(translateService, 'instant');
		component.errors = 1;
		component.description();
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.signStatus.errorDescriptionMessage');
	});

	it('should call the method navigateByUrl in the router', () => {
		spyOn(router, 'navigateByUrl');
		component.goToLanding();
		expect(router.navigateByUrl).toHaveBeenCalledWith('app/requests');
	});

	it('should call the translate pages.requests.signStatus.errorTitle', () => {
		spyOn(translateService, 'instant');
		component.errors = 2;
		component.transactions = transactions;
		component.title();
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.signStatus.errorTitle');
	});

	it('should call the translate pages.requests.signStatus.successTitle', () => {
		spyOn(translateService, 'instant');
		component.errors = 1;
		component.transactions = [];
		component.title();
		expect(translateService.instant).toHaveBeenCalledWith('pages.requests.signStatus.successTitle');
	});

	it('should return an IRequest array', () => {
		component.transactions = transactions;
		const requests: IRequest[] = component.requests();
		expect(requests[0].id).toBe('123456');
	});
});
