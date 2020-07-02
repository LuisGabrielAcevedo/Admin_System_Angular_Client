import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSuccessComponent } from './contact-success.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferServiceMock } from 'client/app/app/services/transfer.service.mock';
import { TransferService } from 'client/app/app/services/transfer.service';
import { Router } from '@angular/router';

describe('ContactAddSuccessComponent', () => {
	let component: ContactSuccessComponent;
	let fixture: ComponentFixture<ContactSuccessComponent>;
	let transferService: TransferService;
	let sidenavService: SidenavService;
	let router: Router;
	let salaryPaymentService: SalaryPaymentService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactSuccessComponent ],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: SalaryPaymentService , useClass: SalaryPaymentServiceMock },
				{ provide: TransferService, useClass: TransferServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactSuccessComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		router = TestBed.get(Router);
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		transferService = TestBed.get(TransferService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close the sidenav panel', () => {
		spyOn(sidenavService, 'close');
		component.finish();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('should go to the salary payment page', () => {
		spyOn(router, 'navigate');
		spyOn(component, 'updateSalaryPaymentContact');
		component.paySalaries();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/salary/amount']);
		expect(component.updateSalaryPaymentContact).toHaveBeenCalled();
	});

	it('should update salary payment state with contact', () => {
		spyOn(salaryPaymentService, 'updateSalaryPaymentState');
		component.updateSalaryPaymentContact();
		expect(salaryPaymentService.updateSalaryPaymentState).toHaveBeenCalled();
	});

	it('should handle transfer', () => {
		spyOn(router, 'navigate');
		spyOn(transferService, 'updateTransferState');
		component.transfer();
		expect(transferService.updateTransferState).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
	});
});
