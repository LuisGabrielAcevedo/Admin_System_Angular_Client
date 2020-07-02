import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServicePaymentsListComponent } from './service-payments-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { makeServicePayment, makeRequest, IRequest } from 'client/app/app/models';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { IReceiptPdfResponse, makeReceiptPdf } from 'client/app/app/models/receipt';
import { of } from 'rxjs';

describe('ServicePaymentsListComponent', () => {
	let component: ServicePaymentsListComponent;
	let fixture: ComponentFixture<ServicePaymentsListComponent>;
	let service: UtilsService;
	let sidenavService: SidenavService;
	let receiptsService: ReceiptsService;
	let pdfService: PdfService;
	const servicePaymentMock: IRequest = makeRequest({
		content: makeServicePayment({banelcoClientId: '123456'})
	});
	const receiptResponse: IReceiptPdfResponse = {
		success: true,
		status: [],
		data: makeReceiptPdf({id:'123456'})
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServicePaymentsListComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot()],
			providers: [
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentsListComponent);
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

	it('should call goToServiceDetail', () => {
		spyOn(sidenavService, 'open');
		component.goToServiceDetail(servicePaymentMock);
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call goToServiceDetail', () => {
		spyOn(sidenavService, 'open');
		component.goToServiceDetail(servicePaymentMock);
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should call to receiptsService if servicePayment.banelcoClientId has value and state is APPROVED', () => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(of(receiptResponse));
		spyOn(pdfService, 'downloadPdf');
		servicePaymentMock.content.state = 'APPROVED';
		component.downloadReceipt(servicePaymentMock);
		expect(receiptsService.getReceipt).toHaveBeenCalled();
		expect(pdfService.downloadPdf).toHaveBeenCalled();
	});
});
