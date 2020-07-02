import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddConfirmationComponent } from './contact-add-confirmation.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { of, throwError } from 'rxjs';
import { makeContact, IServiceMultipleContactResponse, IContact } from 'client/app/app/models';

describe('ContactAddConfirmationComponent', () => {
	let component: ContactAddConfirmationComponent;
	let fixture: ComponentFixture<ContactAddConfirmationComponent>;
	let sidenavService: SidenavService;
	let contactService: ContactService;
	const contactData: IContact = makeContact({});

	const accountDataError: IServiceMultipleContactResponse = {
		success: true,
		status: [],
		data: [makeContact({})]
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactAddConfirmationComponent ],
			imports: [
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactAddConfirmationComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		contactService = TestBed.get(ContactService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should close the sidenav panel', () => {
		spyOn(sidenavService, 'preClose');
		component.back();
		expect(sidenavService.preClose).toHaveBeenCalled();
	});

	it('should go to the next step', () => {
		spyOn(component, 'submitContactData');
		component.next();
		expect(component.submitContactData).toHaveBeenCalled();
	});

	it('should go to the step 0', () => {
		spyOn(sidenavService, 'goToStep');
		component.backToFindContact();
		expect(sidenavService.goToStep).toHaveBeenCalledWith(1);
	});

	it('should go to the step 1', () => {
		spyOn(sidenavService, 'goToStep');
		component.backToEditContact();
		expect(sidenavService.goToStep).toHaveBeenCalledWith(2);
	});

	it('should update the contact data', () => {
		spyOn(contactService, 'submitContactData').and.returnValue(of(makeContact({})));
		spyOn(component, 'addSuccessStep');
		component.submitContactData();
		expect(contactService.submitContactData).toHaveBeenCalled();
		expect(component.addSuccessStep).toHaveBeenCalled();
	});

	it('should update the contact data', () => {
		spyOn(contactService, 'submitContactData').and.returnValue(of(null));
		component.submitContactData();
		expect(contactService.submitContactData).toHaveBeenCalled();
	});

	it('should update the contact data with error', () => {
		spyOn(contactService, 'submitContactData').and.returnValue(throwError(accountDataError));
		component.submitContactData();
		expect(contactService.submitContactData).toHaveBeenCalled();
	});

	it('should go to success step', () => {
		spyOn(sidenavService, 'nextStep');
		component.addSuccessStep(contactData);
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});
});
