import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddComponent } from './contact-add.component';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app/services/contact.service.mock';
import { FormBuilder } from '@angular/forms';
import { IContact, makeContact } from 'client/app/app/models';

describe('ContactAddComponent', () => {
	let component: ContactAddComponent;
	let fixture: ComponentFixture<ContactAddComponent>;
	let sidenavService: SidenavService;
	let fb: FormBuilder;
	const contactData: IContact = makeContact({});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactAddComponent ],
			imports: [
				TranslateModule.forRoot()
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ContactService, useClass: ContactServiceMock },
				FormBuilder
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactAddComponent);
		component = fixture.componentInstance;
		sidenavService = TestBed.get(SidenavService);
		fb = TestBed.get(FormBuilder);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should init the form group', () => {
		spyOn(fb, 'group');
		component.ngOnInit();
		expect(fb.group).toHaveBeenCalled();
	});

	it('should init the form group', () => {
		component.data.contact = makeContact({ reference: 'reference'});
		component.ngOnInit();
		const contactForm = component.contactForm.value;
		expect(contactForm.description).toBe('reference');
	});

	it('should close the sidenav panel', () => {
		spyOn(sidenavService, 'close');
		component.back();
		expect(sidenavService.close).toHaveBeenCalled();
	});

	it('should toggle favorite values', () => {
		component.data.contact.favorite = true;
		component.toggleFavorite();
		expect(component.data.contact.favorite).toBe(false);
	});

	it('should update the contact data', () => {
		const contact = component.data.contact;
		const contactForm = component.contactForm.value;
		component.updateContactData();
		expect(contact.email).toBe(null);
		expect(contact.reference).toBe(contactForm.description);
		expect(contact.category).toBe(contactForm.category);
	});

	it('should add the contact', () => {
		spyOn(sidenavService, 'nextStep');
		component.addSuccessStep(contactData);
		expect(sidenavService.nextStep).toHaveBeenCalled();
	});

	it('should go to the next step', () => {
		spyOn(component, 'updateContactData');
		spyOn(component, 'addSuccessStep');
		component.next();
		expect(component.updateContactData).toHaveBeenCalled();
		expect(component.addSuccessStep).toHaveBeenCalled();
	});

	it('should get the lastAmountPaidSymbol', () => {
		component.data.contact.lastAmountPaid = [{currency: {symbol: 'ARS'}}];
		const lastAmountPaidSymbol = component.lastAmountPaidSymbol;
		expect(lastAmountPaidSymbol).toBe('ARS');
	});

	it('should get the lastAmountPaidDescription', () => {
		component.data.contact.lastAmountPaid = [{currency: {description: 'Pesos Argentinos'}}];
		const lastAmountPaidDescription = component.lastAmountPaidDescription;
		expect(lastAmountPaidDescription).toBe('Pesos Argentinos');
	});

	it('should get the lastAmountPaidSymbol without last amount paid', () => {
		component.data.contact.lastAmountPaid = '';
		const lastAmountPaidSymbol = component.lastAmountPaidSymbol;
		expect(lastAmountPaidSymbol).toBe('');
	});

	it('should get the lastAmountPaidDescription without last amount paid', () => {
		component.data.contact.lastAmountPaid = '';
		const lastAmountPaidDescription = component.lastAmountPaidDescription;
		expect(lastAmountPaidDescription).toBe('');
	});
});
