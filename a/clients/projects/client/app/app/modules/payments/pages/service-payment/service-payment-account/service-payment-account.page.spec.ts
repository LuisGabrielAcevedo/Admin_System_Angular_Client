import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicePaymentAccountPage } from './service-payment-account.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

describe('ServicePaymentAccountPage', () => {
	let component: ServicePaymentAccountPage;
	let fixture: ComponentFixture<ServicePaymentAccountPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ServicePaymentAccountPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [RouterTestingModule, TranslateModule.forRoot()],
			providers: [
				FormBuilder,
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: AccountService, useClass: AccountServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServicePaymentAccountPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
