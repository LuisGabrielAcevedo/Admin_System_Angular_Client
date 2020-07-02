import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicePaymentSummaryPage } from './service-payment-summary.page';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { ServiceService } from 'client/app/app/services/service.service';
import { ServiceServiceMock } from 'client/app/app/services/service.service.mock';
import { ServiceCategoryService } from 'client/app/app/services/service-category.service';
import { ServiceCategoryServiceMock } from 'client/app/app/services/service-category.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { CoreModule } from '@mcy/core/core.module';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

describe('ServicePaymentSummaryPage', () => {
	let component: ServicePaymentSummaryPage;
	let fixture: ComponentFixture<ServicePaymentSummaryPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			declarations: [ServicePaymentSummaryPage],
			imports: [
				HttpClientModule,
				TranslateModule.forRoot(),
				PipesModule,
				RouterTestingModule,
				CoreModule
			],
			providers:[
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ServiceService, useClass:ServiceServiceMock },
				{ provide: ServiceCategoryService, useClass:ServiceCategoryServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock },
				FormBuilder
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentSummaryPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
