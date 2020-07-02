import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicePaymentAmountPage } from './service-payment-amount.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

describe('ServicePaymentAmountPage', () => {
	let component: ServicePaymentAmountPage;
	let fixture: ComponentFixture<ServicePaymentAmountPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServicePaymentAmountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [RouterTestingModule, TranslateModule.forRoot(), PipesModule],
			providers: [
				FormBuilder,
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentAmountPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
