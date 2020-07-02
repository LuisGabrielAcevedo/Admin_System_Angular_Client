import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePaymentSuccessPage } from './service-payment-success.page';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CoreModule } from '@mcy/core/core.module';
import { PdfService } from 'client/app/app/services/pdf.service';
import { PdfServiceMock } from 'client/app/app/services/pdf.service.mock';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ReceiptsServiceMock } from 'client/app/app/services/receipts.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

describe('ServicePaymentSuccessPage', () => {
	let component: ServicePaymentSuccessPage;
	let fixture: ComponentFixture<ServicePaymentSuccessPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServicePaymentSuccessPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), CoreModule.forRoot(),RouterTestingModule],
			providers: [
				{ provide: TranslateService, useClass: TranslateService },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: ReceiptsService, useClass: ReceiptsServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				{ provide: PdfService, useClass: PdfServiceMock },

			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentSuccessPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
