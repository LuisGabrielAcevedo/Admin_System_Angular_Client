import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentNewComponent } from './payment-new.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { HttpClientModule } from '@angular/common/http';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { FormValidationsService } from 'client/app/app/services/form-validations.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { FormValidationsServiceMock } from 'client/app/app/services/form-validations.service.mock';
import { of, BehaviorSubject } from 'rxjs';
import { IService, makeService } from 'client/app/app/models/service';
import { AmountType } from 'client/app/app/models/amount-type';
import { IAccount, makeAccount, makeAccountState } from 'client/app/app/models/account';
import { IServiceCategory } from 'client/app/app/models/service-category';
import { IServiceDebt, makeServiceDebt } from 'client/app/app/models/service-debt';
import { By } from '@angular/platform-browser';
import { MatStepper, MatStep } from '@angular/material';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { makeCurrency } from 'client/app/app/models';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';

describe('PaymentNewComponent', () => {
	let component: PaymentNewComponent;
	let fixture: ComponentFixture<PaymentNewComponent>;
	let paymentService: ServicePaymentService;
	let accountService: AccountService;
	let sidenavService: SidenavService;
	let stepper: MatStepper;
	let step1: MatStep;
	let step2: MatStep;
	const debts: IServiceDebt[] = [
		makeServiceDebt({
			banelcoClientId: '545620333433456675723766',
			serviceId: '5dfa20333d33cde6c5f23e66',
			description: 'Cablevisión',
			usdPayment: false,
			amount: 5000,
		}),
		makeServiceDebt({
			banelcoClientId: '545620333433456675723767',
			serviceId: '5dfa20333d33cde6c5f23e66',
			description: 'Netflix',
			usdPayment: true,
			amount: 10,
		})
	];
	const categories: IServiceCategory[] = [
		{
			id: '5dfa203382106349bdad256b',
			description: 'Telecomunicaciones',
			suggestOrder: 1,
			type: ''
		},
		{
			id: '5dfa203382106349bdad256b',
			description: 'Telecomunicaciones',
			suggestOrder: 1,
			type: ''
		}
	];
	const accounts: IAccount[] = [
		makeAccount({
			number: '34564567-343/7',
			type: 'CC',
			balance: 8000,
			uncoverBalance: 2000,
			currency: makeCurrency({
				symbol: 'ARS'
			})
		}),
		makeAccount({
			number: '22114567-343/7',
			type: 'CA',
			balance: 29.5,
			uncoverBalance: 50000,
			currency: makeCurrency({
				symbol: 'ARS'
			})
		})
	];
	const services: IService[] = [
		makeService({
			id: '5dfa20333d33cde6c5f23e66',
			description: 'Claro'
		}),
		makeService({
			id: '5dfa203382106349bdad256b',
			description: 'Cablevisión',
		})
	];
	const payment = {
		service: services[0],
		category: categories[0],
		debtId: '545620333433456675723766',
		debt: {
			id: '545620333433456675723766',
			serviceId: '5dfa20333d33cde6c5f23e66',
			description: 'Cablevisión',
			alias: '',
			usdPayment: false,
			amount: 5000,
			otherAmountAllowed: 'ANY',
			invoiceId: '1221212121',
			currency: {
				 code: '032',
				symbol: 'ARS',
				description: 'Pesos argentinos'
			},
			expirationDate: new Date()
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaymentNewComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [MatAutocompleteModule, HttpClientModule, PipesModule, TranslateModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: FormValidationsService, useClass: FormValidationsServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
				FormBuilder
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaymentNewComponent);
		component = fixture.componentInstance;
		paymentService = TestBed.get(ServicePaymentService);
		accountService = TestBed.get(AccountService);
		sidenavService = TestBed.get(SidenavService);
		stepper = fixture.debugElement.query(By.css('.vertical-stepper'))!.componentInstance;
		step1 = fixture.debugElement.query(By.css('.step1'))!.componentInstance;
		step2 = fixture.debugElement.query(By.css('.step2'))!.componentInstance;
		spyOn(paymentService, 'getServices').and.returnValue(of({
			status: [
				{
					code: '0',
					message: ''
				}
			], data: services
		}));
		spyOn(accountService, 'getAccounts').and.returnValue(of({
			status: [
				{
					code: '0',
					message: ''
				}
			], data: accounts
		}));
		spyOn(paymentService, 'getCategories').and.returnValue(of({
			status: [
				{
					code: '0',
					message: ''
				}
			], data: categories
		}));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when a category is selected, the function getServices() in Payment servie should be called', () => {
		const categoryControl: AbstractControl | null = component.serviceStepForm.get('category');
		if (categoryControl) {
			categoryControl.patchValue(categories[0]);
		}
		expect(paymentService.getServices).toHaveBeenCalled();
		expect(component.services.length).toBe(2);
	});

	it('when a service is a string, the services list should be filtered', () => {
		let filteredServices: IService[] = [];
		component.filteredServices.subscribe(serivceResp => filteredServices = serivceResp);
		const serviceControl: AbstractControl | null = component.serviceStepForm.get('service');
		const categoryControl: AbstractControl | null = component.serviceStepForm.get('category');
		if (categoryControl) {
			categoryControl.patchValue(categories[0]);
		}
		if (serviceControl) {
			serviceControl.patchValue('cab');
			expect(filteredServices.length).toBe(1);
			serviceControl.patchValue(services[0]);
			expect(component.debtId.value).toBe('');
		}
	});

	it('when amountType is PARTIAL, otherAmountControl should be null', () => {
		const amountTypeControl: AbstractControl | null = component.paymentStepForm.get('amountType');
		const otherAmountControl: AbstractControl | null = component.paymentStepForm.get('otherAmount');
		const accountControl: AbstractControl | null = component.paymentStepForm.get('account');
		if (amountTypeControl && otherAmountControl && accountControl) {
			otherAmountControl.patchValue(1234);
			amountTypeControl.patchValue(AmountType.partial);
			expect(otherAmountControl.value).toBe(1234);
			amountTypeControl.patchValue(AmountType.total);
			expect(otherAmountControl.value).toBeNull();
		}
	});

	it('when exist service the function displayServiceDescription() should return a string with the company name', () => {
		const resp1: string | undefined = component.displayServiceDescription(services[0]);
		expect(resp1).toBe('Claro');
		const resp2: string | undefined = component.displayServiceDescription(undefined);
		expect(resp2).toBe('');
	});

	it('when exist account compareCategories() should return a string with a the number', () => {
		const resp1 = component.compareCategories(categories[0], categories[0]);
		expect(resp1).toBeTruthy();
	});

	it('when exist payment in data, the serviceStepForm should be valid', () => {
		component.data = {
			payment
		};
		component.ngOnInit();
		expect(component.serviceStepForm.valid).toBeTruthy();
	});

	xit('when exist otherAmount in data, the control amount type should be PARTIAL', () => {
		const amountTypeControl: AbstractControl | null = component.serviceStepForm.get('amountType');
		component.data = {
			payment: {
				...payment,
				otherAmount: 300
			}
		};
		component.ngOnInit();
		if (amountTypeControl) {
			expect(amountTypeControl.value).toBe(AmountType.partial);
		}
	});

	it('when dont exist debt un data, debt should be null', () => {
		component.data = {
			payment: {
				...payment,
				debt: null
			}
		};
		component.ngOnInit();
		expect(component.debt).toBeNull();
	});

	it('when the cancel function is activated, unCoverAmountDialog should be false', () => {
		component.unCoverAmountDialog = true;
		component.cancel();
		expect(component.unCoverAmountDialog).toBeFalsy();
	});

	it('when the fucntion nextStep() is called, the function nextStep() in the SidenavService is called', () => {
		spyOn(sidenavService, 'nextStep');
		component.nextStep();
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	xit('when debtId is valid, the function getDebt() in PaymentService should be called', fakeAsync(() => {
		spyOn(paymentService, 'getDebt').and.returnValue(of({
			status: [
				{
					code: '0',
					message: ''
				}
			],
			data: [makeServiceDebt({})]
		}));
		component.debtId.setValue('545620333433456675723767');
		tick(500);
		expect(paymentService.getDebt).toHaveBeenCalled();
		const resp = component.displayDebtIdErrors();
		expect(resp).toBe('');
	}));

	it('when debtId is valid and the service response is a debt with usd amountType should be PARTIAL', fakeAsync(() => {
		const amountTypeControl: AbstractControl | null = component.serviceStepForm.get('amountType');
		spyOn(paymentService, 'getDebt').and.returnValue(of({
			status: [
				{
					code: '0',
					message: ''
				}
			],
			data: [makeServiceDebt({})]
		}));
		component.serviceStepForm.get('service')!.patchValue(makeService({id: ''}));
		component.debtId.setValue('545620333433456675723767');
		tick(500);
		if (amountTypeControl) {
			expect(amountTypeControl.value).toBe(AmountType.partial);
		}
	}));

	it('when debtId is invalid, the debt is null', fakeAsync(() => {
		spyOn(paymentService, 'getDebt').and.returnValue(of({
			status: [
				{
					code: '422',
					message: 'Número inválido'
				}
			],
			data: []
		}));
		component.serviceStepForm.get('service')!.patchValue(makeService({id: ''}));
		component.debtId.setValue('545620333433456675723716');
		tick(500);
		expect(paymentService.getDebt).toHaveBeenCalled();
		expect(component.debt).toBeNull();
	}));

	it('when otherAmount > accountAmount, unCoverAmountDialog should be true', () => {
		component.data = {
			payment: {
				...payment,
				otherAmount: 300
			}
		};
		component.ngOnInit();
		expect(component.unCoverAmountDialog).toBeFalsy();
		const accountControl: AbstractControl | null = component.paymentStepForm.get('account');
		const otherAmountControl: AbstractControl | null = component.paymentStepForm.get('otherAmount');
		if (accountControl && otherAmountControl) {
			otherAmountControl.patchValue('1000');
			accountControl.patchValue(accounts[1]);
			component.validateAccount();
			expect(component.unCoverAmountDialog).toBeTruthy();
		}
	});

	it('when amount > accountAmount, unCoverAmountDialog should be true', () => {
		spyOn(component, 'nextStep');
		component.data = {
			payment
		};
		component.ngOnInit();
		expect(component.unCoverAmountDialog).toBeFalsy();
		const accountControl: AbstractControl | null = component.paymentStepForm.get('account');
		const otherAmountControl: AbstractControl | null = component.paymentStepForm.get('otherAmount');
		if (accountControl && otherAmountControl) {
			accountControl.patchValue(accounts[1]);
			component.validateAccount();
			expect(component.unCoverAmountDialog).toBeTruthy();
		}
		component.continue();
		expect(component.nextStep).not.toHaveBeenCalled();
	});

	it('when acount have balance, the function nextStep() should be called', () => {
		spyOn(component, 'nextStep');
		component.continue();
		expect(component.nextStep).toHaveBeenCalled();
	});

	xit('when debtId is valid, the function displayDebtHint shoul be (¡Ya puedes continuar!) ', () => {
		component.debt = debts[0];
		component.debtId.patchValue('545620333433456675723716');
		const resp2 = component.displayDebtHint();
		expect(resp2).toBe('(¡Ya puedes continuar!)');
	});

	it('when exist edit un data, the functions should return that', () => {
		component.data = {
			edit: true,
			payment
		};
		component.ngOnInit();
		const resp1 = component.isEdit();
		expect(resp1).toBeFalsy();
		const resp2 = component.isStep1Edit();
		expect(resp2).toBeFalsy();
		const resp3 = component.isStep2Edit();
		expect(resp3).toBeFalsy();
		const resp4 = component.isStep1CompletedLabel();
		expect(resp4).toBeTruthy();
		const resp5 = component.isStep2CompletedLabel();
		expect(resp5).toBeTruthy();
	});

	it('when dont exist edit in data, isStep1Edit() should return true', () => {
		component.data = {
			payment
		};
		component.ngOnInit();
		stepper.selectedIndex = 1;
		step1.completed = true;
		const resp = component.isStep1Edit();
		expect(resp).toBeTruthy();
	});

	it('when dont exist edit in data, isStep2Edit() should return true', () => {
		component.data = {
			payment
		};
		component.ngOnInit();
		stepper.selectedIndex = 0;
		step2.completed = true;
		const resp = component.isStep2Edit();
		expect(resp).toBeTruthy();
	});

	it('should call getAccountState', () => {
		spyOn(accountService, 'getAccountState').and.returnValue(new BehaviorSubject(makeAccountState({})));
		component.loadAccounts();

		expect(accountService.getAccountState).toHaveBeenCalled();
	});

});
