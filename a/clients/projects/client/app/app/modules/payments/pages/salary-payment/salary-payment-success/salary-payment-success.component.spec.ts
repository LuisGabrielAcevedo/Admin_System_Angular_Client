import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentSuccessComponent } from './salary-payment-success.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { Router } from '@angular/router';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { BehaviorSubject, of } from 'rxjs';
import { makeSalaryPaymentState, ISalaryPaymentFormValue, makeSalaryPaymentFormValue } from 'client/app/app/modules/payments/models/salary-payment';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { makeAccount, makeContact, makeRequest, makeTransfer } from 'client/app/app/models';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { IReceiptPdfResponse, makeReceiptPdf } from 'client/app/app/models/receipt';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';

describe('SalaryPaymentSuccessComponent', () => {
	let component: SalaryPaymentSuccessComponent;
	let fixture: ComponentFixture<SalaryPaymentSuccessComponent>;
	let salaryPaymentService: SalaryPaymentService;
	let receiptsService: ReceiptsService;
	let pdfService: PdfService;
	let sidenavService: SidenavService;
	let router: Router;
	const salaryPayment: ISalaryPaymentFormValue = makeSalaryPaymentFormValue({account: makeAccount({}), contact: makeContact({id:'10'})});

	const receiptResponse: IReceiptPdfResponse = {
		success: true,
		status: [],
		data: makeReceiptPdf({id:'123456'})
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentSuccessComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SalaryPaymentService , useClass: SalaryPaymentServiceMock },
				{ provide: UtilsService , useClass: UtilsServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock},
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock }
			],
			imports: [RouterTestingModule, TranslateModule.forRoot(), PipesModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentSuccessComponent);
		component = fixture.componentInstance;
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		receiptsService = TestBed.get(ReceiptsService);
		pdfService = TestBed.get(PdfService);
		sidenavService = TestBed.get(SidenavService);
		fixture.detectChanges();
		router = TestBed.get(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when the component is created, the state should be updated 3', () => {
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(component, 'checkSalaryPayment');
		component.ngOnInit();
		expect(salaryPaymentService.getSalaryPaymentState).toHaveBeenCalled();
		expect(component.checkSalaryPayment).toHaveBeenCalled();
	});

	it('should call endPayment and redirect app/dashboard', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.endPayment();
		expect(navigateSpy).toHaveBeenCalledWith('app/dashboard');
	});

	it('should call newPayment and redirect app/payments/salary/contact ', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		spyOn(salaryPaymentService,'updateSalaryPaymentState');
		component.newPayment();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary/contact');
		expect(salaryPaymentService.updateSalaryPaymentState).toHaveBeenCalled();
	});

	it('should call checkSalaryPayment and redirect app/payments/salary/contact ', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.checkSalaryPayment();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary/contact');
	});

	it('should call checkSalaryPayment and setter currency ', () => {
		component.salaryPayment = salaryPayment;
		component.checkSalaryPayment();
		expect(component.currency).toEqual(salaryPayment.account!.currency.symbol);
	});

	it('should call to receiptsService if salaryPayment.id has value and state is AUTHORIZED', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(of(receiptResponse));
		spyOn(pdfService, 'downloadPdf');
		component.lastSalaryPayment = makeRequest({
			id:'123456',
			state: 'AUTHORIZED',
			content: makeTransfer({state: 'APPROVED'})
		});
		component.downloadReceipt();
		expect(receiptsService.getReceipt).toHaveBeenCalled();
		expect(pdfService.downloadPdf).toHaveBeenCalled();
	});

	it('should call validateState and enter in case AUTHORIZED and setter state according this case', () => {
		component.lastSalaryPayment = makeRequest({
			id:'123456',
			state: 'AUTHORIZED',
			content: makeTransfer({state: 'APPROVED'})
		});
		component.validateState();

		expect(component.state.icon).toEqual('check');
		expect(component.state.class).toEqual('salary-payment-success__circle-success salary-payment-success__color-circle-autorized');
		expect(component.state.iconButtonSecundary).toEqual('download_outline');
	});

	it('should call validateState and enter in case AUTHORIZED and it is a scheduled salary', () => {
		component.lastSalaryPayment = makeRequest({
			id:'123456',
			state: 'AUTHORIZED',
			type: 'TRANSFER',
			scheduledDate: new Date()
		});
		component.validateState();

		expect(component.state.icon).toEqual('senha_circulo_outline');
		expect(component.state.class).toEqual('salary-payment-success__circle-success salary-payment-success__color-circle-autorized');
		expect(component.state.iconButtonSecundary).toEqual('comprovante_outline');
	});

	it('should call validateState and enter in case PARTIALLY_AUTHORIZED and setter state according this case', () => {
		component.lastSalaryPayment = makeRequest({
			id:'123456',
			state: 'PARTIALLY_AUTHORIZED'
		});
		component.validateState();

		expect(component.state.icon).toEqual('senha_circulo_outline');
		expect(component.state.class).toEqual('salary-payment-success__circle-success salary-payment-success__color-circle-pending-partially-autorized');
		expect(component.state.iconButtonSecundary).toEqual('comprovante_outline');
	});

	it('should call validateState and enter in case PENDING_APPROVAL and setter state according this case', () => {
		component.lastSalaryPayment = makeRequest({
			id:'123456',
			state: 'PENDING_APPROVAL'
		});
		component.validateState();
		expect(component.state.icon).toEqual('senha_circulo_outline');
		expect(component.state.class).toEqual('salary-payment-success__circle-success salary-payment-success__color-circle-pending-autorized');
		expect(component.state.iconButtonSecundary).toEqual('comprovante_outline');
	});

	it('should call validateState and enter in case REJECTED and setter state according this case', () => {
		component.lastSalaryPayment = makeRequest({
			id:'123456',
			state: 'REJECTED'
		});
		component.validateState();
		expect(component.state.icon).toEqual('fechar');
		expect(component.state.class).toEqual('salary-payment-success__circle-success salary-payment-success__color-circle-rejected');
		expect(component.state.iconButtonSecundary).toEqual('comprovante_outline');
	});

	it('should handle openAddContact', () => {
		spyOn(sidenavService, 'open');
		component.openAddContact();
		expect(sidenavService.open).toHaveBeenCalled();
	});
});
