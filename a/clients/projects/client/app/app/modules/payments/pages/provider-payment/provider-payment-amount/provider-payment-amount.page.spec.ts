import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProviderPaymentAmountPage } from './provider-payment-amount.page';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { makeProviderPaymentState, IProviderPaymentState, makeProviderPaymentFormValue, makeCurrency } from 'client/app/app/models';
import { CURRENCIES } from 'client/app/app/constants';
import { ProviderPaymentServiceMock } from 'client/app/app/services/provider-payment.service mock';

describe('ProviderPaymentAmountPage', () => {
	let component: ProviderPaymentAmountPage;
	let fixture: ComponentFixture<ProviderPaymentAmountPage>;
	let router: Router;
	let providerPaymentService: ProviderPaymentService;
	let modalService: ModalService;
	const providerPaymentState: IProviderPaymentState = makeProviderPaymentState({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProviderPaymentAmountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: ProviderPaymentService, useClass: ProviderPaymentServiceMock },
			],
			imports: [TranslateModule.forRoot(), RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProviderPaymentAmountPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		providerPaymentService = TestBed.get(ProviderPaymentService);
		modalService = TestBed.get(ModalService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the transfer state without data', () => {
		spyOn(providerPaymentService, 'getProviderPaymentState').and.returnValue(
			new BehaviorSubject(makeProviderPaymentState({ }))
		);
		const spyFormAmount = spyOn(component.amountForm.get('amount')!, 'patchValue');
		const spyFormDescription = spyOn(component.amountForm.get('description')!, 'patchValue');
		const spyFormCurrencyCode = spyOn(component.amountForm.get('currencyCode')!, 'patchValue');
		const spyFormCurrency = spyOn(component.amountForm.get('currency')!, 'patchValue');
		component.ngOnInit();
		expect(spyFormAmount).toHaveBeenCalledWith(providerPaymentState.newProviderPaymentFormValue.amount);
		expect(spyFormDescription).toHaveBeenCalledWith(providerPaymentState.newProviderPaymentFormValue.paymentDescription);
		expect(spyFormCurrencyCode).toHaveBeenCalledWith(CURRENCIES[0].code);
		expect(spyFormCurrency).toHaveBeenCalledWith(CURRENCIES[0]);
		expect(providerPaymentService.getProviderPaymentState).toHaveBeenCalled();
	});

	it('should get the transfer state without data with currency', () => {
		spyOn(providerPaymentService, 'getProviderPaymentState').and.returnValue(
			new BehaviorSubject(makeProviderPaymentState({
				newProviderPaymentFormValue: makeProviderPaymentFormValue({
					currency: makeCurrency({ code: '001' })
				})
			}))
		);
		const spyFormAmount = spyOn(component.amountForm.get('amount')!, 'patchValue');
		const spyFormDescription = spyOn(component.amountForm.get('description')!, 'patchValue');
		const spyFormCurrencyCode = spyOn(component.amountForm.get('currencyCode')!, 'patchValue');
		const spyFormCurrency = spyOn(component.amountForm.get('currency')!, 'patchValue');
		component.ngOnInit();
		expect(spyFormAmount).toHaveBeenCalledWith(providerPaymentState.newProviderPaymentFormValue.amount);
		expect(spyFormDescription).toHaveBeenCalledWith(providerPaymentState.newProviderPaymentFormValue.paymentDescription);
		expect(spyFormCurrencyCode).toHaveBeenCalledWith('001');
		expect(spyFormCurrency).toHaveBeenCalledWith(makeCurrency({ code: '001' }));
		expect(providerPaymentService.getProviderPaymentState).toHaveBeenCalled();
	});

	it('should go to the landing page', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments']);
	});

	it('should get the description missings value', () => {
		component.amountForm.patchValue({description: 'test'});
		const descriptionMissings = component.descriptionMissings;
		expect(descriptionMissings).toBe(76);
	});

	it('should go to previus page', () => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/contact']);
	});

	it('should go to next page', () => {
		spyOn(providerPaymentService, 'updateProviderPaymentState');
		spyOn(router, 'navigate');
		component.next();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/account']);
		expect(providerPaymentService.updateProviderPaymentState).toHaveBeenCalled();
	});

	it('should show the cancel modal', () => {
		spyOn(modalService, 'openDialog');
		component.onCancel();
		expect(modalService.openDialog).toHaveBeenCalled();
	});

	it('should unsubscribe when the component is destroyed', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should update currency form when currency is selected', () => {
		const spyFormAmount = spyOn(component.amountForm.get('currency')!, 'patchValue');
		component.currencyChange();
		expect(spyFormAmount).toHaveBeenCalled();
	});
});
