import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProviderPaymentContactPage } from './provider-payment-contact.page';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { ProviderPaymentServiceMock } from 'client/app/app/services/provider-payment.service mock';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { ModalService } from '@mcy/core/services/modal.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { makeContactState, makeContact, FormValue, IFindContactFormChangeEvent } from 'client/app/app/models';

describe('ProviderPaymentContactPage', () => {
	let component: ProviderPaymentContactPage;
	let fixture: ComponentFixture<ProviderPaymentContactPage>;
	let contactService: ContactService;
	let router: Router;
	let modalService: ModalService;
	let sidenavService: SidenavService;
	let providerPaymentService: ProviderPaymentService;

	const contact = makeContact({ category: 'PROVIDER', name: 'foo', cbvu: '123456', reference: 'bar' });

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProviderPaymentContactPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ProviderPaymentService, useClass: ProviderPaymentServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				FormBuilder
			],
			imports: [TranslateModule.forRoot(), RouterTestingModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProviderPaymentContactPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
		contactService = TestBed.get(ContactService);
		router = TestBed.get(Router);
		sidenavService = TestBed.get(SidenavService);
		modalService = TestBed.get(ModalService);
		providerPaymentService = TestBed.get(ProviderPaymentService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call contact service on empty state', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({})));
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.getContactState).toHaveBeenCalled();
		expect(contactService.findContacts).toHaveBeenCalled();
	});

	it('should not call contact service on init', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({ searchedContacts: true })));
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.getContactState).toHaveBeenCalled();
		expect(contactService.findContacts).not.toHaveBeenCalled();
	});

	it('should handle a contact selection', () => {
		component.onContactSelect(contact);
		expect(component.selectedContact.name).toEqual('foo');
	});

	it('should navigate on onBack', () => {
		spyOn(router, 'navigate');
		component.onBack();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should navigate on goToLanding', () => {
		spyOn(router, 'navigate');
		component.goToLanding();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should handle on continue', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle on continue when selecting by cbvu', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.searchBy = 'cbvu';
		component.selectedTab = 1;
		component.findContactFormValue.value.cbvu = '123456';

		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should handle on continue when selecting by alias', () => {
		spyOn(contactService, 'findContactBy').and.returnValue(of(contact));
		spyOn(sidenavService, 'open');
		component.searchBy = 'alias';
		component.selectedTab = 1;
		component.findContactFormValue.value.alias = 'foo.bar';

		component.onContinue();
		expect(sidenavService.open).toHaveBeenCalled();
	});


	it('should handle next', () => {
		spyOn(providerPaymentService, 'updateProviderPaymentState');
		spyOn(router, 'navigate');
		component.next(makeContact({}));
		expect(providerPaymentService.updateProviderPaymentState).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
	});

	it('should handle onFindContactFormChange', () => {
		const data: FormValue<IFindContactFormChangeEvent> = { valid: true, value: { searchBy: 'cbvu', cbvu: '123456' } };
		component.onFindContactFormChange(data);
		expect(component.findContactFormValue).toEqual(data);
	});

	it('should handle on cancel', () => {
		spyOn(modalService, 'openDialog');
		component.onCancel();
		expect(modalService.openDialog).toHaveBeenCalled();
	});

	it('should handle retryGetContacts', () => {
		spyOn(contactService, 'findContacts');
		component.retryGetContacts();
		expect(contactService.findContacts).toHaveBeenCalled();
	})
});
