import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentsListComponent } from './salary-payments-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ITransfer, makeTransfer } from 'client/app/app/models';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { IReceiptPdfResponse, makeReceiptPdf } from 'client/app/app/models/receipt';
import { of } from 'rxjs';

describe('SalaryPaymentsListComponent', () => {
	let component: SalaryPaymentsListComponent;
	let fixture: ComponentFixture<SalaryPaymentsListComponent>;
	let service: UtilsService;
	let sidenavService: SidenavService;
	let receiptsService: ReceiptsService;
	let pdfService: PdfService;
	const salaryPayment: ITransfer = makeTransfer({});
	const receiptResponse: IReceiptPdfResponse = {
		success: true,
		status: [],
		data: makeReceiptPdf({id:'123456'})
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SalaryPaymentsListComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.get(UtilsService);
		sidenavService = TestBed.get(SidenavService);
		receiptsService = TestBed.get(ReceiptsService);
		pdfService = TestBed.get(PdfService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call formatDate and return 02 ENE 2020', () => {
		let dateAux = '';
		spyOn(service, 'formatDate').and.returnValue('02 ENE 2020');
		dateAux = component.formatDate(new Date('02/01/2020'));
		expect(service.formatDate).toHaveBeenCalled();
		expect(dateAux).toEqual('02 ENE 2020');
	});

	it('should call open from sidenavService', () => {
		spyOn(sidenavService, 'open');
		component.goToRequestDetail(salaryPayment);
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call to receiptsService if salaryPayment.id has value and state is APPROVED', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(of(receiptResponse));
		spyOn(pdfService, 'downloadPdf');
		salaryPayment.id = '123456';
		salaryPayment.state = 'APPROVED';
		component.downloadReceipt(salaryPayment);
		expect(receiptsService.getReceipt).toHaveBeenCalled();
		expect(pdfService.downloadPdf).toHaveBeenCalled();
	});
});