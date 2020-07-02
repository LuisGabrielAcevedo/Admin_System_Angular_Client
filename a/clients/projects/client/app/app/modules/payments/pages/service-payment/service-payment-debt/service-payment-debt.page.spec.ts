import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServicePaymentDebtPage } from './service-payment-debt.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from 'client/app/app/services/service.service';
import { ServiceServiceMock } from 'client/app/app/services/service.service.mock';
import { ServiceCategoryService } from 'client/app/app/services/service-category.service';
import { ServiceCategoryServiceMock } from 'client/app/app/services/service-category.service.mock';
import { ServiceDebtService } from 'client/app/app/services/service-debt.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { ServiceDebtServiceMock } from 'client/app/app/services/service-debt.service.mock';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

describe('ServicePaymentDebtPage', () => {
	let component: ServicePaymentDebtPage;
	let fixture: ComponentFixture<ServicePaymentDebtPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServicePaymentDebtPage],
			imports: [MatAutocompleteModule, RouterTestingModule, TranslateModule.forRoot()],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				FormBuilder,
				{ provide: ServiceService, useClass: ServiceServiceMock },
				{ provide: ServiceCategoryService, useClass: ServiceCategoryServiceMock },
				{ provide: ServiceDebtService, useClass: ServiceDebtServiceMock },
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentDebtPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
