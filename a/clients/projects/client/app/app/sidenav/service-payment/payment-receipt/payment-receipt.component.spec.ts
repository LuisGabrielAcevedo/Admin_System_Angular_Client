import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentReceiptComponent } from './payment-receipt.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { makeRequest } from 'client/app/app/models';

describe('PaymentReceiptComponent', () => {
	let component: PaymentReceiptComponent;
	let fixture: ComponentFixture<PaymentReceiptComponent>;
	let service: SidenavService;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PaymentReceiptComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: TranslateService, useClass: TranslateService }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PaymentReceiptComponent);
		component = fixture.componentInstance;
		service = TestBed.get(SidenavService);
		component.data.requestServicePayment =  makeRequest({
				state: 'REJECTED'
		});

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when the function payOtherService is called, reset in the service is called', () => {
		spyOn(service, 'reset');
		component.payOtherService();
		expect(service.reset).toHaveBeenCalled();
	});

	it('when the function back is called, prevStep in the service is called', () => {
		spyOn(service, 'prevStep');
		component.back();
		expect(service.prevStep).toHaveBeenCalled();
	});
});
