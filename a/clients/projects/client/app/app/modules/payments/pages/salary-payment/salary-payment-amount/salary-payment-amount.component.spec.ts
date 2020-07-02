import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentAmountComponent } from './salary-payment-amount.component';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { BehaviorSubject } from 'rxjs';
import { makeSalaryPaymentState } from 'client/app/app/modules/payments/models/salary-payment';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';

describe('SalaryPaymentAmountComponent', () => {
	let component: SalaryPaymentAmountComponent;
	let fixture: ComponentFixture<SalaryPaymentAmountComponent>;
	let salaryPaymentService: SalaryPaymentService;
	let modalService: ModalService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentAmountComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SalaryPaymentService , useClass: SalaryPaymentServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				FormBuilder
			],
			imports: [TranslateModule.forRoot(), RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentAmountComponent);
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		modalService = TestBed.get(ModalService);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when the component is created, the state should be updated 4', () => {
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
