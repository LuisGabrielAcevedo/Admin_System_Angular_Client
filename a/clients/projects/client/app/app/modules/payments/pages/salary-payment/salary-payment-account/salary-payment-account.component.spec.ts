import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentAccountComponent } from './salary-payment-account.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ServicePaymentServiceMock } from 'client/app/app/services/service-payment.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { BehaviorSubject } from 'rxjs';
import { makeSalaryPaymentState } from 'client/app/app/modules/payments/models/salary-payment';
import { AccountService } from 'client/app/app/services/account.service';
import { AccountServiceMock } from 'client/app/app/services/account.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

describe('SalaryPaymentAccountComponent', () => {
	let component: SalaryPaymentAccountComponent;
	let fixture: ComponentFixture<SalaryPaymentAccountComponent>;
	let salaryPaymentService: SalaryPaymentService;
	let modalService: ModalService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentAccountComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: AccountService , useClass: AccountServiceMock },
				{ provide: SalaryPaymentService , useClass: SalaryPaymentServiceMock },
				{ provide: ServicePaymentService, useClass: ServicePaymentServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock},
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				FormBuilder
			],
			imports: [TranslateModule.forRoot(), RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentAccountComponent);
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		modalService = TestBed.get(ModalService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when the component is created, the state should be updated 1', () => {
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		component.ngOnInit();
		expect(salaryPaymentService.getSalaryPaymentState).toHaveBeenCalled();
	});

	it('should open the cancel modal', () => {
		spyOn(modalService, 'openDialog');
		component.goToLanding();
		expect(modalService.openDialog).toHaveBeenCalled();
	});
});
