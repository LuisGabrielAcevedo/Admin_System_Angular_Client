import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProviderPaymentSuccessPage } from './provider-payment-success.page';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { ProviderPaymentServiceMock } from 'client/app/app/services/provider-payment.service mock';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { ConceptService } from 'client/app/app/services/concept.service';
import { ConceptServiceMock } from 'client/app/app/services/concept.service.mock';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { Router } from '@angular/router';
import { makeRequest, makeTransfer } from 'client/app/app/models';
import { makeReceiptPdf } from 'client/app/app/models/receipt';
import { of } from 'rxjs';

describe('ProviderPaymentSuccessPage', () => {
	let component: ProviderPaymentSuccessPage;
	let fixture: ComponentFixture<ProviderPaymentSuccessPage>;
	let router: Router;
	let receiptsService: ReceiptsService;
	let pdfService: PdfService;
	let sidenavService: SidenavService;
	let providerPaymentService: ProviderPaymentService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProviderPaymentSuccessPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
				{ provide: ProviderPaymentService, useClass: ProviderPaymentServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: ConceptService, useClass: ConceptServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
			],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
				PipesModule,
				RouterTestingModule,
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProviderPaymentSuccessPage);
		component = fixture.componentInstance;
		router = TestBed.get(Router);
		component.lastProviderPaymentRequest = makeRequest({ id: '1', content: makeTransfer({}) });
		receiptsService = TestBed.get(ReceiptsService);
		pdfService = TestBed.get(PdfService);
		sidenavService = TestBed.get(SidenavService);
		providerPaymentService = TestBed.get(ProviderPaymentService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle onPrimaryButtonClick', () => {
		spyOn(router, 'navigate');
		component.onPrimaryButtonClick();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should handle openAddContact', () => {
		spyOn(sidenavService, 'open');
		component.openAddContact();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle downloadReceipt', async(() => {
		spyOn(receiptsService, 'getReceipt').and.returnValue(of( { success: true, status: [], data: makeReceiptPdf({}) } ));
		spyOn(pdfService, 'downloadPdf');
		component.lastProviderPaymentRequest = makeRequest({ id: '1', content: makeTransfer({}) });
		component.downloadReceipt();
		expect(receiptsService.getReceipt).toHaveBeenCalled();
		expect(pdfService.downloadPdf).toHaveBeenCalled();
	}))

	it('should handle detailRequest', () => {
		spyOn(sidenavService, 'open');
		component.detailRequest();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle onSecondaryButtonClick', () => {
		spyOn(providerPaymentService, 'updateProviderPaymentState');
		spyOn(router, 'navigate');

		component.onSecondaryButtonClick();

		expect(providerPaymentService.updateProviderPaymentState).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
	});
});
