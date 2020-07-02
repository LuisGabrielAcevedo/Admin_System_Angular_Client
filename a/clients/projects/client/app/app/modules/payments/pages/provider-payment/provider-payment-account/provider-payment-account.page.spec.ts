import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProviderPaymentAccountPage } from './provider-payment-account.page';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from '@mcy/core/services/modal.service';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ProviderPaymentServiceMock } from 'client/app/app/services/provider-payment.service mock';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { Router } from '@angular/router';
import { makeProviderPaymentState, makeAccountState, makeProviderPaymentFormValue, makeAccount } from 'client/app/app/models';
import { BehaviorSubject } from 'rxjs';

describe('SalaryPaymentAmountComponent', () => {
	let component: ProviderPaymentAccountPage;
	let fixture: ComponentFixture<ProviderPaymentAccountPage>;
	let router: Router;
	let providerPaymentService: ProviderPaymentService;
	let modalService: ModalService;
	let accountService: AccountService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProviderPaymentAccountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: ProviderPaymentService, useClass: ProviderPaymentServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
			],
			imports: [TranslateModule.forRoot(), RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProviderPaymentAccountPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		providerPaymentService = TestBed.get(ProviderPaymentService);
		modalService = TestBed.get(ModalService);
		accountService = TestBed.get(AccountService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the provider payment state without data', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(
			new BehaviorSubject(makeAccountState({searchedAccounts: true})),
		);
		spyOn(providerPaymentService, 'getProviderPaymentState').and.returnValue(
			new BehaviorSubject(makeProviderPaymentState({
				newProviderPaymentFormValue: makeProviderPaymentFormValue({
					sourceAccount: makeAccount({ number: '001' })
				})
			}))
		);
		const spyFormAccount = spyOn(component.sourceAccountsForm.get('sourceAccount')!, 'patchValue');
		component.ngOnInit();
		expect(accountService.getAccountState).toHaveBeenCalled();
		expect(spyFormAccount).toHaveBeenCalledWith(makeAccount({ number: '001' }));
		expect(providerPaymentService.getProviderPaymentState).toHaveBeenCalled();
	});

	it('#ngOnInit should look for accounts on init', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(
			new BehaviorSubject(makeAccountState({searchedAccounts: false})),
		);
		spyOn(accountService, 'findAccounts');
		component.ngOnInit();
		expect(accountService.getAccountState).toHaveBeenCalled();
		expect(accountService.findAccounts).toHaveBeenCalled();
	});

	it('should go to the landing page', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments']);
	});

	it('should go to previus page', () => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/amount']);
	});

	it('should go to next page', () => {
		spyOn(providerPaymentService, 'updateProviderPaymentState');
		spyOn(router, 'navigate');
		component.next();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/confirmation']);
		expect(providerPaymentService.updateProviderPaymentState).toHaveBeenCalled();
	});

	it('should show the cancel modal', () => {
		spyOn(modalService, 'openDialog');
		component.onCancel();
		expect(modalService.openDialog).toHaveBeenCalled();
	});

	it('should filter accounts with balance', () => {
		component.accountState.accounts = [makeAccount({balance: 1})];
		const filterValidAccounts = component.filterValidAccounts;
		expect(filterValidAccounts.length).toBe(1);
	});


	it('should retry to get accounts', () => {
		spyOn(accountService, 'findAccounts');
		component.retryGetAccounts();
		expect(accountService.findAccounts).toHaveBeenCalled();
	});
});
