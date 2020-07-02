import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentConfirmComponent } from './salary-payment-confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@mcy/core/pipes/pipes.module';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { BehaviorSubject, of } from 'rxjs';
import { makeSalaryPaymentState } from 'client/app/app/modules/payments/models/salary-payment';
import { Router } from '@angular/router';
import { makeAccount, makeRequest, IRequestResponse} from 'client/app/app/models';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { SoftTokenServiceMock } from 'client/app/app/services/soft-token.service.mock';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('SalaryPaymentConfirmComponent', () => {
	let component: SalaryPaymentConfirmComponent;
	let fixture: ComponentFixture<SalaryPaymentConfirmComponent>;
	let salaryPaymentService: SalaryPaymentService;
	let sidenavService: SidenavService;
	let modalService: ModalService;
	let router: Router;

	const resultFalse: IRequestResponse = {
		success: false,
		status: [
			{
				code: '0',
				message: 'success'
			}
		],
		data: makeRequest({})
	};

	const resultTrue: IRequestResponse =  {
		success: true,
		status: [
			{
				code: '1',
				message: 'Error'
			}
		],
		data: makeRequest({})
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentConfirmComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [TranslateModule.forRoot(), RouterTestingModule, PipesModule],
			providers: [
				{ provide: SalaryPaymentService, useClass: SalaryPaymentServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: StorageService, useClass: StorageServiceMock },
				{ provide: SoftTokenService, useClass: SoftTokenServiceMock },
				{ provide: UtilsService, useClass: UtilsServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentConfirmComponent);
		component = fixture.componentInstance;
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		sidenavService = TestBed.get(SidenavService);
		modalService = TestBed.get(ModalService);
		router = TestBed.get(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when the component is created, the state should be updated 5', () => {
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(
			new BehaviorSubject(makeSalaryPaymentState({}))
		);
		spyOn(component, 'checkSalaryPayment');
		component.ngOnInit();
		expect(salaryPaymentService.getSalaryPaymentState).toHaveBeenCalled();
		expect(component.checkSalaryPayment).toHaveBeenCalled();
	});

	it('goToContact', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToContact();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary/contact');
	});

	it('goToAccount', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToAccount();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary/account');
	});

	it('goToAmount', () => {
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.goToAmount();
		expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary/amount');
	});

	it('when submitPayment is called, the function open in the sidenav is called', () => {
		const token = '123456';
		spyOn(component, 'submitPayment');
		component.salaryPayment.account = makeAccount({});
		component.submitPayment(token);
		expect(component.submitPayment).toHaveBeenCalled();
	});

	it('should go to contacts', () => {
		spyOn(component, 'goToContact');
		component.checkSalaryPayment();
		expect(component.goToContact).toHaveBeenCalled();
	});

	it('should go to the landing page', () => {
		spyOn(router, 'navigate');
		spyOn(modalService, 'openDialog');
		component.goToLanding();
		expect(modalService.openDialog).toHaveBeenCalled();
	});

	it('should call salaryPay and enter if', async(() => {
		const token = '123456';
		const navigateSpy = spyOn(router, 'navigateByUrl');
		component.salaryPayment.account = makeAccount({});
		spyOn(sidenavService, 'close');
		spyOn(salaryPaymentService, 'paySalary').and.returnValue(of(resultTrue));
		component.submitPayment(token).subscribe(() => {
			expect(salaryPaymentService.paySalary).toHaveBeenCalled();
			expect(sidenavService.close).toHaveBeenCalled();
			expect(navigateSpy).toHaveBeenCalledWith('app/payments/salary/success');
		});
	}));

	it('should call salaryPay and enter else', async(() => {
		const token = '765432';
		component.salaryPayment.account = makeAccount({});
		spyOn(salaryPaymentService, 'paySalary').and.returnValue(of(resultFalse));
		component.submitPayment(token).subscribe(() => {
			expect(salaryPaymentService.paySalary).toHaveBeenCalled();
		});
	}));
});
