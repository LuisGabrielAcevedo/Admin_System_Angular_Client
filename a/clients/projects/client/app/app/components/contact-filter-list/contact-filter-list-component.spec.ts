import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContactFilterListComponent } from './contact-filter-list.component';
import { ContactSearchFormChangeEvent } from 'client/app/app/components/contact-search-form/contact-search-form.component';
import { makeContact } from 'client/app/app/models';

describe('ContactFilterListComponent', () => {
	let component: ContactFilterListComponent;
	let fixture: ComponentFixture<ContactFilterListComponent>;

	const contact = makeContact({ category: 'PROVIDER', name: 'foo', cbvu: '123456', reference: 'bar' });

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContactFilterListComponent],
			imports: [
				TranslateModule.forRoot(),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: []
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactFilterListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle a contact search form change', () => {
		const mockData: ContactSearchFormChangeEvent = { 
			category: 'EMPLOYEE',
			searchKeyword: 'bar'
		};
		component.onSearchFormChange(mockData);
		expect(component.searchKeyword).toEqual('bar');
		expect(component.searchCategory).toEqual('EMPLOYEE');
	});

	it('should filter by category', () => {
		component.searchCategory = 'PROVIDER';
		const resultTruthy = component.contactIncludesCategory(contact);
		expect(resultTruthy).toBeTruthy();

		component.searchCategory = 'CLIENT';
		const resultFalsy = component.contactIncludesCategory(contact);
		expect(resultFalsy).toBeFalsy();

		component.searchCategory = '';
		const resultEmpty = component.contactIncludesCategory(contact);
		expect(resultEmpty).toBeTruthy();
	});

	it('should filter by keyword', () => {
		component.searchKeyword = 'fo';
		expect(component.contactIncludesKeyword(contact)).toBeTruthy();

		component.searchKeyword = '1234';
		expect(component.contactIncludesKeyword(contact)).toBeTruthy();

		component.searchKeyword = 'ba';
		expect(component.contactIncludesKeyword(contact)).toBeTruthy();

		component.searchKeyword = 'foobar';
		expect(component.contactIncludesKeyword(contact)).toBeFalsy();
	});

	it('should handle a contact selection', () => {
		spyOn(component.handleContactSelect, 'emit');
		component.onContactSelect(contact);
		expect(component.handleContactSelect.emit).toHaveBeenCalledWith(contact);
	});

	it('should get a filtered contact list', () => {
		const contactList = [
			makeContact({ name: 'foo', category: 'CLIENT' }),
			makeContact({ name: 'bar', category: 'PROVIDER' })
		 ];
		 component.contacts = contactList;
		 component.searchCategory = 'CLIENT';
		 component.searchKeyword = '';

		 const result = component.contactList;
		
		 expect(result.length).toEqual(1);
		 expect(result[0].name).toEqual('foo');
	});
});
