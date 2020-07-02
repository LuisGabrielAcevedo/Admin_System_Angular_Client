import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentConfirmationComponent } from './payment-confirmation.component';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { HttpClientModule } from '@angular/common/http';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { FormBuilder } from '@angular/forms';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { of } from 'rxjs';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { makeServiceDebt, IRequestResponse, makeRequest } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { TranslateModule } from '@ngx-translate/core';

describe('PaymentConfirmationComponent', () => {
	let component: PaymentConfirmationComponent;
	let fixture: ComponentFixture<PaymentConfirmationComponent>;
	let paymentService: ServicePaymentService;
	const payment: object = {
		service: {
			id: '5dfa20333d33cde6c5f23e66',
			otherAmountAllowed: 'ANY'
		},
		category: {
			id: '5dfa203382106349bdad256b',
			description: 'Telecomunicaciones'
		},
		account: {
			number: 'CC 023-738721/7',
			type: 'ahorro',
			amount: 8000,
			unCoverAmount: 2000,
			currency: {
				 code: '032',
				symbol: 'ARS',
				description: 'Pesos argentinos'
			}
		},
		debt: makeServiceDebt({}),
		paymentReference: 1,
		description: 'Sistemas globales S.A',
		expirationDate: '12/04/2009',
		amountType: 'TOTAL',
		amount: 12222
	};


	const request: IRequestResponse = {
		data: makeRequest({}),
		status: [
			{
				code: 'WIREMOCK:000',
				message: 'Operation successfully.',
				traceId: 'BFF-ACC:1581965136670'
			}
		],
		success: true
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaymentConfirmationComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				HttpClientModule,
				PipesModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				FormBuilder
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaymentConfirmationComponent);
		component = fixture.componentInstance;
		paymentService = TestBed.get(ServicePaymentService);
		component.data = {
			payment
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call method of service requestPaymentService', () => {
		component.data = {
			payment: {
				...payment,
				otherAmount: 34434
			}
		};
		spyOn(paymentService, 'requestPaymentService').and.returnValue(
			of(request)
		);
		component.nextStep();
		expect(paymentService.requestPaymentService).toHaveBeenCalled();
	});

	it('should call getTitle and return value agree to expectations', () => {
		const titleSpy = component.getTitle('AUTHORIZED');
		expect(titleSpy).toEqual('pages.payments.servicePayment.success.title.authorized');
	});

	it('should call getTitle and return value agree to expectations', () => {
		const titleSpy = component.getTitle('PENDING_APPROVAL');
		expect(titleSpy).toEqual('pages.payments.servicePayment.success.title.pendingApproval');
	});

	it('should call getTitle and return value agree to expectations', () => {
		const titleSpy = component.getTitle('PARTIALLY_AUTHORIZED');
		expect(titleSpy).toEqual('pages.payments.servicePayment.success.title.PartiallyAuthorized');
	});

	it('should call getTitle and return value agree to expectations', () => {
		const titleSpy = component.getTitle('REJECTED');
		expect(titleSpy).toEqual('pages.payments.servicePayment.success.title.rejected');
	});

	it('should call getTitle and return value agree to expectations', () => {
		const titleSpy = component.getTitle('');
		expect(titleSpy).toEqual('');
	});


});