import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContactListComponent } from './contact-list.component';
import { makeContact } from '../../models';

describe('ContactListComponent', () => {
	let component: ContactListComponent;
	let fixture: ComponentFixture<ContactListComponent>;

	const contactList = [
		makeContact({ favorite: true }),
		makeContact({ favorite: false }),
		makeContact({ favorite: false }),
		makeContact({ favorite: true }),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
		makeContact({}),
	]

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContactListComponent],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: []
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit a selected contact', () => {
		spyOn(component.contactSelect, 'emit');
		component.selectContact(makeContact({}));
		expect(component.contactSelect.emit).toHaveBeenCalled();
	});

	it('should return a contact ordered list by favorite', () => {
		component.contacts = contactList;
		const contacts = component.contactList;
		expect(contacts[0].favorite).toEqual(true);
		expect(contacts[1].favorite).toEqual(true);
		expect(contacts[2].favorite).toEqual(false);
	});

	it('should show more contacts', () => {
		component.contacts = contactList;

		expect(component.contactList.length).toEqual(10);
		component.showMoreContacts();
		expect(component.contactList.length).toEqual(20);
		component.showMoreContacts();
		expect(component.contactList.length).toEqual(22);
	});
});
