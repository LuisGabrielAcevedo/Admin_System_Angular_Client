import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryPaymentDetailComponent } from './salary-payment-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { makeTransfer } from 'client/app/app/models';
import { of, Observable } from 'rxjs';

describe('SalaryPaymentDetailComponent', () => {
	let component: SalaryPaymentDetailComponent;
	let fixture: ComponentFixture<SalaryPaymentDetailComponent>;
	let pdfService: PdfService;
	let receiptsService: ReceiptsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ SalaryPaymentDetailComponent ],
		imports: [TranslateModule.forRoot(), PipesModule],
		schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
		providers: [
			{ provide: UtilsService, useClass: UtilsServiceMock },
			{ provide: SalaryPaymentService, useClass: SalaryPaymentServiceMock },
			{ provide: PdfService, useClass: PdfServiceMock },
			{ provide: ReceiptsService, useClass: ReceiptsServiceMock }
		]
	})
	.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		pdfService = TestBed.get(PdfService);
		receiptsService = TestBed.get(ReceiptsService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should return false if state is DENIED', () => {
		component.data.state = 'DENIED';

		expect(component.showShareSection).toBeFalsy();
	});

	it('should return true if state is APPROVED', () => {
		component.data.state = 'APPROVED';

		expect(component.showShareSection).toBeTruthy();
	});

	it('should call getReceipt and add', () => {
		spyOn(component.subscription,'add');
		spyOn(receiptsService,'getReceipt').and.returnValue(new Observable());

		component.transfer = makeTransfer({id:'123456'});

		component.downloadReceipt();

		expect(component.subscription.add).toHaveBeenCalled();
		expect(receiptsService.getReceipt).toHaveBeenCalled();
	});

	it('should call downloadPdf', () => {
		spyOn(pdfService,'downloadPdf');
		spyOn(receiptsService,'getReceipt').and.returnValue(of({data:{id:'', file: ''}, status:[]}));
		component.transfer = makeTransfer({id:'123456'});
		component.downloadReceipt();
		expect(pdfService.downloadPdf).toHaveBeenCalled();
	});

	it('should unsubscribe on dismount', () => {
		spyOn(component.subscription, 'unsubscribe');
		component.ngOnDestroy();
		expect(component.subscription.unsubscribe).toHaveBeenCalled();
	});
});
