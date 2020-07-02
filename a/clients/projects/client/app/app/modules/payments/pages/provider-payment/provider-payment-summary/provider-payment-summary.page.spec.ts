import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProviderPaymentSummaryPage } from './provider-payment-summary.page';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from '@mcy/core/services/modal.service';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ProviderPaymentServiceMock } from 'client/app/app/services/provider-payment.service mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { makeProviderPaymentState, IRequestResponse, makeRequest } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';

describe('ProviderPaymentAmountComponent', () => {
	let component: ProviderPaymentSummaryPage;
	let fixture: ComponentFixture<ProviderPaymentSummaryPage>;
	let router: Router;
	let providerPaymentService: ProviderPaymentService;
	let modalService: ModalService;
	let sidenavService: SidenavService;

	const requestResponse: IRequestResponse = {
		data: makeRequest({}),
		status: [],
		success: true,
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProviderPaymentSummaryPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: ProviderPaymentService, useClass: ProviderPaymentServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock }
			],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				PipesModule
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProviderPaymentSummaryPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		providerPaymentService = TestBed.get(ProviderPaymentService);
		sidenavService = TestBed.get(SidenavService);
		modalService = TestBed.get(ModalService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get the provider payment state without data', () => {
		spyOn(providerPaymentService, 'getProviderPaymentState').and.returnValue(
			new BehaviorSubject(makeProviderPaymentState({}))
		);
		component.ngOnInit();
		expect(providerPaymentService.getProviderPaymentState).toHaveBeenCalled();
	});

	it('should go to the landing page', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments']);
	});

	it('should go to previus page', () => {
		spyOn(router, 'navigate');
		component.back();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/account']);
	});

	it('should go back to edit contact page', () => {
		spyOn(router, 'navigate');
		component.backToEditDestinatary();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/contact']);
	});

	it('should go back to edit amount page', () => {
		spyOn(router, 'navigate');
		component.backToEditBalance();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/amount']);
	});

	it('should go back to edit source page', () => {
		spyOn(router, 'navigate');
		component.backToEditSource();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/provider/account']);
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

	it('should handle submitPayment', async(() => {
		spyOn(providerPaymentService, 'submitProviderPayment').and.returnValue(of(requestResponse));
		spyOn(sidenavService, 'close');
		spyOn(router, 'navigateByUrl');
		component.submitPayment('123456').subscribe(() => {
			expect(providerPaymentService.submitProviderPayment).toHaveBeenCalled();
			expect(sidenavService.close).toHaveBeenCalled();
			expect(router.navigateByUrl).toHaveBeenCalled();
		});
	}));

	it('should handle onConfirm', () => {
		spyOn(component, 'submitPayment').and.returnValue(of(requestResponse));
		component.onConfirm();
		expect(component.submitPayment).toHaveBeenCalled();
	});
});
