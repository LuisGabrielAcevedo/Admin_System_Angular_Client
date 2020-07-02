import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ServicePaymentDetailComponent } from './service-payment-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsService } from  '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from  '@mcy/core/utils/utils.service.mock';
import { makeServicePayment } from 'client/app/app/models';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { of } from 'rxjs';

describe('ServicePaymentDetailComponent', () => {
	let component: ServicePaymentDetailComponent;
	let fixture: ComponentFixture<ServicePaymentDetailComponent>;
	let utilsService: UtilsService;
	let receiptsService: ReceiptsService;
	let pdfService: PdfService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ ServicePaymentDetailComponent ],
		schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		imports: [TranslateModule.forRoot(), PipesModule],
		providers: [
			{ provide: UtilsService, useClass: UtilsServiceMock },
			{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
			{ provide: PdfService, useClass: PdfServiceMock },
			{ provide: ReceiptsService, useClass: ReceiptsServiceMock }]
	})
	.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentDetailComponent);
		component = fixture.componentInstance;
		component.data =  makeServicePayment({});
		utilsService = TestBed.get(UtilsService);
		pdfService = TestBed.get(PdfService);
		receiptsService = TestBed.get(ReceiptsService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return true if amounts are different', () => {
		component.data.amount = 1000;
		component.data.otherAmount = 50;

		expect(component.showOtherAmount).toBeTruthy();
	});

	it('should return false if amounts are equal', () => {
		component.data.amount = 1000;
		component.data.otherAmount = 1000;

		expect(component.showOtherAmount).toBeFalsy();
	});

	it('should return true if state is APPROVED', () => {
		component.data.state = 'APPROVED';

		expect(component.showShareSection).toBeTruthy();
	});

	it('should return false if state is DENIED', () => {
		component.data.state = 'DENIED';

		expect(component.showShareSection).toBeFalsy();
	});

	it('should return true if state is APPROVED', () => {
		component.data.state = 'APPROVED';

		expect(component.showShareSection).toBeTruthy();
	});

	it('should call to utilsService.formatDate if date has value', () => {
		spyOn(utilsService, 'formatDate').and.returnValue('17 FEB 2020');

		component.formattedDate(new Date('2020-02-17T17:37:26.502Z'));

		expect(utilsService.formatDate).toHaveBeenCalled();
	});

	it('should return empty string if date not have value', () => {
		const formattedDate = component.formattedDate(undefined);

		expect(formattedDate).toBe('');
	});

	it('should call getReceipt and add', () => {
		spyOn(component.subscription,'add');
		spyOn(receiptsService,'getReceipt').and.callThrough();

		component.servicePayment = makeServicePayment({banelcoClientId:'123456'});

		component.downloadReceipt();

		expect(component.subscription.add).toHaveBeenCalled();
		expect(receiptsService.getReceipt).toHaveBeenCalled();
	});

	it('should call downloadPdf', () => {
		spyOn(pdfService,'downloadPdf');
		spyOn(receiptsService,'getReceipt').and.returnValue(of({data:{id:'', file: ''}, status:[]}));
		component.servicePayment = makeServicePayment({banelcoClientId:'123456'});
		component.downloadReceipt();
		expect(pdfService.downloadPdf).toHaveBeenCalled();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});
});
