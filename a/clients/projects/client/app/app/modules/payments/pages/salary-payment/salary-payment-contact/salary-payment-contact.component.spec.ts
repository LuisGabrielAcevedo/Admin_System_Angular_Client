import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalaryPaymentContactComponent } from './salary-payment-contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SalaryPaymentServiceMock } from 'client/app/app/services/salary-payment.service.mock';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { BehaviorSubject, of } from 'rxjs';
import { makeSalaryPaymentState } from 'client/app/app/modules/payments/models/salary-payment';
import { StorageService } from '@mcy/main/services/storage.service';
import { StorageServiceMock } from '@mcy/main/services/storage.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { makeContactState, makeContact, IFindContactFormChangeEvent, FormValue } from 'client/app/app/models';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { AnalyticsServiceMock } from '@mcy/main/services/analytics.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';

describe('SalaryPaymentContactComponent', () => {
	let component: SalaryPaymentContactComponent;
	let fixture: ComponentFixture<SalaryPaymentContactComponent>;
	let salaryPaymentService: SalaryPaymentService;
	let router: Router;
	let contactService: ContactService;
	let sidenavService: SidenavService;
	let modalService: ModalService;
	const contact = makeContact({
		category: 'PROVIDER',
		name: 'foo',
		cbvu: '123456',
		reference: 'bar'
	});
	const formValueCbvu: FormValue<IFindContactFormChangeEvent> = {
		valid: true,
		value: {
			cbvu: '1234567890123456789012',
			alias: 'alias',
			searchBy: 'cbvu'
		}
	}
	const formValueAlias: FormValue<IFindContactFormChangeEvent> = {
		valid: true,
		value: {
			cbvu: '1234567890123456789012',
			alias: 'alias',
			searchBy: 'alias'
		}
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SalaryPaymentContactComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			imports: [
				TranslateModule.forRoot(),
				RouterTestingModule
			],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: SalaryPaymentService , useClass: SalaryPaymentServiceMock },
				{ provide: StorageService , useClass: StorageServiceMock },
				{ provide: AnalyticsService, useClass: AnalyticsServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SalaryPaymentContactComponent);
		component = fixture.componentInstance;
		salaryPaymentService = TestBed.get(SalaryPaymentService);
		contactService = TestBed.get(ContactService);
		router = TestBed.get(Router);
		sidenavService = TestBed.get(SidenavService);
		modalService = TestBed.get(ModalService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when the component is created, the state should be updated', () => {
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		component.ngOnInit();
		expect(salaryPaymentService.getSalaryPaymentState).toHaveBeenCalled();
	});

	it('should call contact service on empty state', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({})));
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.getContactState).toHaveBeenCalled();
		expect(salaryPaymentService.getSalaryPaymentState).toHaveBeenCalled();
		expect(contactService.findContacts).toHaveBeenCalled();
	});

	it('should not call contact service on init', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({ searchedContacts: true })));
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.getContactState).toHaveBeenCalled();
		expect(salaryPaymentService.getSalaryPaymentState).toHaveBeenCalled();
		expect(contactService.findContacts).not.toHaveBeenCalled();
	});

	it('should handle a contact selection', () => {
		component.onContactSelect(contact);
		expect(component.selectedContact.name).toEqual('foo');
	});

	it('should handle a contact find contact form change', () => {
		component.onFindContactFormChange(formValueCbvu);
		expect(component.findContactFormValue).toEqual(formValueCbvu);
	});

	it('should reset the selected contact when change tab', () => {
		component.selectedIndexChange(0);
		expect(component.selectedTab ).toEqual(0);
		expect(component.selectedContact ).toEqual(makeContact({}));
	});

	it('should handle on continue with contact list', () => {
		spyOn(salaryPaymentService, 'updateSalaryPaymentState');
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle on continue with Alias', () => {
		component.selectedTab  = 1;
		component.findContactFormValue = formValueAlias;
		spyOn(salaryPaymentService, 'updateSalaryPaymentState');
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle on continue with Cbvu', () => {
		component.selectedTab  = 1;
		component.findContactFormValue = formValueCbvu;
		spyOn(salaryPaymentService, 'updateSalaryPaymentState');
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle next', () => {
		spyOn(salaryPaymentService, 'updateSalaryPaymentState');
		spyOn(salaryPaymentService, 'getSalaryPaymentState').and.returnValue(new BehaviorSubject(makeSalaryPaymentState({})));
		spyOn(router, 'navigate');
		component.next(makeContact({}));
		expect(salaryPaymentService.updateSalaryPaymentState).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledWith(['/app/payments/salary/amount']);
	});

	it('should open the cancel modal', () => {
		spyOn(modalService, 'openDialog');
		component.goToLanding();
		expect(modalService.openDialog).toHaveBeenCalled();
	});
});
