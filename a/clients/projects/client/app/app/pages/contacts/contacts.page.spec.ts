import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreModule } from '@mcy/core/core.module';
import { ContactService } from 'client/app/app/services/contact.service';
import { ContactServiceMock } from 'client/app/app//services/contact.service.mock';
import { ContactsPage } from './contacts.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { makeContactState, makeContact } from 'client/app/app/models/contact';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { SidenavServiceMock } from 'client/app/app/services/sidenav.service.mock';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { ToastService } from '@mcy/core/services/toast.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { ModalServiceMock } from '@mcy/core/services/modal.service.mock';
import { UserServiceMock } from 'client/app/app/services/user.service.mock';
import { UserService } from 'client/app/app/services/user.service';

describe('ContactListComponent', () => {
	let component: ContactsPage;
	let fixture: ComponentFixture<ContactsPage>;
	let router: Router;
	let contactService: ContactService;
	let modalService: ModalService;
	let sidenavService: SidenavService;
	let toastService: ToastService;
	let translateService: TranslateService;
	const id = 1;
	const contactState = makeContactState({
		contacts: [ makeContact({ name: 'foo' }), makeContact({ name: 'bar' }), makeContact({ favorite: true })]
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ContactsPage ],
			imports: [
				HttpClientModule,
				RouterTestingModule,
				CoreModule,
				TranslateModule.forRoot()
			],
			providers: [
				{ provide: ContactService, useClass: ContactServiceMock },
				{ provide: SidenavService, useClass: SidenavServiceMock },
				{ provide: ToastService, useClass: ToastServiceMock },
				{ provide: ModalService, useClass: ModalServiceMock },
				{ provide: UserService, useClass: UserServiceMock}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactsPage);
		router = TestBed.get(Router);
		component = fixture.componentInstance;
		fixture.detectChanges();
		contactService = TestBed.get(ContactService);
		sidenavService = TestBed.get(SidenavService);
		modalService = TestBed.get(ModalService);
		toastService = TestBed.get(ToastService);
		translateService = TestBed.get(TranslateService);
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(contactState));
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	it('should close the page of contacts', async(() => {
		const navigateSpy = spyOn(router, 'navigate');
		component.closeContacts();
		expect(navigateSpy).toHaveBeenCalledWith(['/app']);
	}));

	it('should load the contacts list', async(() => {
		spyOn(contactService, 'findContacts');
		component.ngOnInit();
		expect(contactService.findContacts).toHaveBeenCalled();
	}));

	it('#ngOnInit should filter the contacts by its favorites and assign it to the favorites contacts table', () => {
		component.ngOnInit();
		expect(component.favoriteContactsListTableSource.data).toEqual([makeContact({ favorite: true })]);
	});

	it('#ngOnInit should set the state to contactState', () => {
		component.ngOnInit();
		expect(component.contactState).toEqual(contactState)
	});

	it('#ngOnInit should set all the contacts to contactsList', () => {
		component.ngOnInit();
		expect(component.contactsList).toEqual(contactState.contacts);
	});

	it('#ngOnInit should set contacts to the table data', () => {
		component.ngOnInit();
		expect(component.contactsListTableSource.data).toEqual(contactState.contacts);
	});

	it('should go to the previous step', () => {
		spyOn(sidenavService, 'open');
		component.openEdit(id);
		expect(sidenavService.open).toHaveBeenCalled();
	});

	it('should set a contact as favorite', () => {
		const contact = makeContact({});
		spyOn(contactService, 'updateContact').and.returnValue(of(true));
		component.onFavoriteClick(contact, true);
		expect(contact.favorite).toEqual(true);
	});

	it('should not set a contact as favorite', () => {
		const contact = makeContact({});
		spyOn(contactService, 'updateContact').and.returnValue(of(false));
		component.onFavoriteClick(contact, true);
		expect(contact.favorite).toEqual(false);
	});

	it('should not set a contact as favorite', () => {
		const contact = makeContact({});
		spyOn(contactService, 'updateContact').and.returnValue(of(false));
		component.onFavoriteClick(contact, true);
		expect(contact.favorite).toEqual(false);
	});

	it('should handle errors when setting a contact as favorite', () => {
		const contact = makeContact({});
		spyOn(toastService, 'message');
		spyOn(contactService, 'updateContact').and.returnValue(throwError({ message: 'Error' }));
		component.onFavoriteClick(contact, true);
		expect(contact.favorite).toEqual(false);
		expect(toastService.message).toHaveBeenCalledWith('Error');
	});

	it('should call service removeContact on removeContact', () => {
		spyOn(contactService, 'removeContact');
		component.removeContact('5');
		expect(contactService.removeContact).toHaveBeenCalledWith('5');
	});

	it('#onSearch should lowerCase its searchkeyword parameter ', async(() => {
		const filterWord: string = 'foo';
		component.onSearch(filterWord);
		expect(component.searchKeyword).toBe(filterWord.toLowerCase());
	}));

	it('#onSearch should set isAccountBeingSearched to false if empty keyword passed', async(() => {
		const filterWord: string = '';
		component.onSearch(filterWord);
		expect(component.isAccountBeingSearched).toBeFalsy();
	}));

	it('#onSearch should set isAccountBeingSearched to true if keyword is passed', async(() => {
		const filterWord: string = 'foo';
		component.onSearch(filterWord);
		expect(component.isAccountBeingSearched).toBeTruthy();
	}));

	it('#onSearch should filter the table data by the keyword passed', () => {
		spyOn(translateService, 'get').and.returnValue(of(
			{ SERVICE: 'Servicio', PROVIDER: 'Provider', CLIENT: 'Cliente', OTHERS: 'Otros', EMPLOYEE: 'Empleado' }
		));
		const keyword: string = 'foo';
		component.ngOnInit();
		component.contactState = makeContactState({
			contacts: [ makeContact({ name: 'foo' }), makeContact({ name: 'bar' }) ]
		});
		component.onSearch(keyword);
		expect(component.contactsListTableSource.data.length).toBe(1);
		expect(component.searchedResultsLength).toBe(1);
	})

	it('should open a modal on remove contact', () => {
		spyOn(modalService, 'openDialog');
		component.onRemoveContactClick(makeContact({id: '1'}));
		expect(modalService.openDialog).toHaveBeenCalled();
	});

	it('should NOT open a modal on remove contact', () => {
		spyOn(modalService, 'openDialog');
		component.onRemoveContactClick(makeContact({}));
		expect(modalService.openDialog).not.toHaveBeenCalled();
	});
});
