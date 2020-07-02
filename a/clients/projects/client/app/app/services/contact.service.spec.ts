import { TestBed, async } from '@angular/core/testing';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { ContactService } from './contact.service';
import { HttpClientModule } from '@angular/common/http';
import { IContact, makeContact, IServiceMultipleContactResponse, IServiceContactResponse, makeContactState, adaptContactToBFF } from 'client/app/app/models/contact';
import { throwError, of, BehaviorSubject } from 'rxjs';
import { ToastService } from '@mcy/core/services/toast.service';
import { CoreModule } from '@mcy/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { ToastServiceMock } from '@mcy/core/services/toast.service.mock';
import { CSVService } from 'client/app/app/services/csv.service';
import { CSVServiceMock } from 'client/app/app/services/csv.service.mock';
import { TranslateService } from '@ngx-translate/core';
import { ITranslations } from 'client/app/app/models';
import { EventService } from 'client/app/app/services/event.service';
import { EventServiceMock } from 'client/app/app/services/event.service.mock';
import { UtilsServiceMock } from '@mcy/core/utils/utils.service.mock';
import { UtilsService } from '@mcy/core/utils/utils.service';


describe('ContactService', () => {
	let contactService: ContactService;
	let dataService: DataService;
	let toastService: ToastService;
	const dataToSubmit: IContact  = makeContact({});
	let translateService: TranslateService;


	const accountData: IServiceMultipleContactResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: [
			makeContact({alias: '1234'})
		]
	};

	const  accountSingleData: IServiceContactResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: makeContact({})
	};

	const accountDataEmpty: IServiceMultipleContactResponse = {
		success: false,
		status: [{
			code: '1',
			message: 'Usted no tiene contactos'
		}],
		data: []
	};
	const accountDataError: IServiceContactResponse = {
		success: false,
		status: [{
			code: '404',
			message: 'El CBU es incorrecto'
		}],
		data: null
	};

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientModule,
			CoreModule,
			TranslateModule.forRoot()
		],
		providers: [
			ContactService,
			{ provide: DataService, useClass: DataServiceMock },
			{ provide: ToastService, useClass: ToastServiceMock},
			{ provide: CSVService, useClass: CSVServiceMock},
			{ provide: TranslateService, useClass: TranslateService },
			{ provide: EventService, useClass: EventServiceMock },
			{ provide: UtilsService, useClass: UtilsServiceMock },
		],
		})
		.compileComponents()
	);

	beforeEach(() => {
		contactService = TestBed.get(ContactService);
		dataService = TestBed.get(DataService);
		toastService = TestBed.get(ToastService);
		translateService = TestBed.get(TranslateService);
		contactService.updateContactState({ contacts: [makeContact({ id: '1' })]});
	});

	it('should be created', () => {
		const service: ContactService = TestBed.get(ContactService);
		expect(service).toBeTruthy();
	});

	it('should get the contacts list', () => {
		spyOn(dataService, 'get');
		contactService.getContacts();
		expect(dataService.get).toHaveBeenCalled();
	});

	it('should submit the contact data', () => {
		spyOn(dataService, 'post');
		contactService.addContactData(dataToSubmit);
		expect(dataService.post).toHaveBeenCalledWith('v1/payment-contacts/contacts', { body: adaptContactToBFF(dataToSubmit) });
	});

	it('should update the contact data', () => {
		spyOn(dataService, 'put');
		contactService.updateContactData(dataToSubmit);
		expect(dataService.put).toHaveBeenCalledWith(`v1/payment-contacts/contacts/${dataToSubmit.id}`, { body: dataToSubmit });
	});

	it('should load the contacts list', async(() => {
		spyOn(contactService, 'getContacts').and.returnValue(of(accountData));
		spyOn(toastService, 'message');
		contactService.findContacts();
		expect(contactService.getContacts).toHaveBeenCalled();
	}));

	it('should load the contacts list empty', async(() => {
		spyOn(contactService, 'getContacts').and.returnValue(of(accountDataEmpty));
		spyOn(toastService, 'message');
		contactService.findContacts();
		expect(contactService.getContacts).toHaveBeenCalled();
	}));

	it('should load the contacts list with errors', async(() => {
		spyOn(contactService, 'getContacts').and.returnValue(throwError(accountDataError));
		contactService.findContacts();
		expect(contactService.getContacts).toHaveBeenCalled();
	}));

	it('should unsubscribe on destroy', () => {
		spyOn(contactService.subscription, 'unsubscribe');
		contactService.ngOnDestroy();
		expect(contactService.subscription.unsubscribe).toHaveBeenCalled();
	});

	it('should find a contact with parameters', async(() => {
		spyOn(contactService, 'getAccountData').and.returnValue(of(accountData));
		const result$ = contactService.findContactBy({ type: 'alias', value: '1234' });
		result$.subscribe((result) => {
			expect(contactService.getAccountData).toHaveBeenCalled();
			expect(result).not.toEqual(null);
		});
	}));

	it('should return null when no contact is found', async(() => {
		spyOn(contactService, 'getAccountData').and.returnValue(of(accountDataEmpty));
		const result$ = contactService.findContactBy({ type: 'alias', value: '1234' });
		result$.subscribe((result) => {
			expect(contactService.getAccountData).toHaveBeenCalled();
			expect(result).toBeNull();
		});
	}));

	it('should call dataService delete on deleteContact', () => {
		spyOn(dataService, 'delete');
		contactService.deleteContact('1');
		expect(dataService.delete).toHaveBeenCalled();
	});

	it('should remove a contact', () => {
		spyOn(contactService, 'deleteContact').and.returnValue(of(accountSingleData));
		spyOn(contactService, 'updateContactState');
		contactService.removeContact('1');
		expect(contactService.deleteContact).toHaveBeenCalled();
		expect(contactService.updateContactState).toHaveBeenCalled();
	});

	it('should fail to remove a contact', () => {
		spyOn(contactService, 'deleteContact').and.returnValue(of(accountDataError));
		spyOn(toastService, 'message');
		contactService.removeContact('1');
		expect(contactService.deleteContact).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalledWith('El CBU es incorrecto');
	});

	it('should handle a failure removing a contact', () => {
		spyOn(contactService, 'deleteContact').and.returnValue(throwError(accountDataError));
		spyOn(toastService, 'message');
		contactService.removeContact('1');
		expect(contactService.deleteContact).toHaveBeenCalled();
		expect(toastService.message).toHaveBeenCalled();
	});

	it('should update a contact', async(() => {
		spyOn(contactService, 'updateContactData').and.returnValue(of(accountSingleData));
		const result$ = contactService.updateContact(dataToSubmit);
		result$.subscribe((result) => {
			expect(contactService.updateContactData).toHaveBeenCalled();
			expect(result).toEqual(true);
		});
	}));

	it('should fail to update a contact', () => {
		spyOn(contactService, 'updateContactData').and.returnValue(of(accountDataError));
		const result$ = contactService.updateContact(dataToSubmit);
		result$.subscribe((result) => {
			expect(contactService.updateContactData).toHaveBeenCalled();
			expect(result).toEqual(false);
		});
	});

	it('should submit a contact', async(() => {
		spyOn(contactService, 'addContactData').and.returnValue(of(accountSingleData));
		const result$ = contactService.submitContactData(dataToSubmit);
		result$.subscribe((result) => {
			expect(contactService.addContactData).toHaveBeenCalled();
			expect(result).toBeTruthy();
		});
	}));

	it('should fail to submit a contact', () => {
		spyOn(contactService, 'addContactData').and.returnValue(of(accountDataError));
		const result$ = contactService.submitContactData(dataToSubmit);
		result$.subscribe((result) => {
			expect(contactService.addContactData).toHaveBeenCalled();
			expect(result).toBeFalsy();
		});
	});

	it('should handle finding if a contact exists in the contact list', () => {
		spyOn(contactService, 'getContactState').and.returnValue(new BehaviorSubject(makeContactState({
			contacts: [ makeContact({ cbvu: '1' })]
		})));
		contactService.isContactInContactList(makeContact({ cbvu: '1' })).subscribe((contactFound: boolean) => {
			expect(contactFound).toBeTruthy();
		});
		contactService.isContactInContactList(makeContact({ cbvu: '2' })).subscribe((contactFound: boolean) => {
			expect(contactFound).toBeFalsy();
		})
	});

	it('#getCSVFilteredContacts should return contacts by categories', () => {
		const provider = 'PROVIDER';
		const categories: ITranslations = { PROVIDER: 'Proveedor' };
		const providerContact = Object.assign({}, makeContact({}), { category: categories[provider] });
		const accountsWithCategories: IContact[] = [
			makeContact({category: 'SERVICE'}),
			providerContact,
		];

		spyOn(translateService, 'instant').and.returnValue('Proveedor');
		const filteredContacts = contactService.getCSVFilteredContacts(accountsWithCategories, provider);
		expect(filteredContacts).toEqual([providerContact])
	});

	it('#getCSVFilteredContacts should translate categories correctly', () => {
		const provider = 'PROVIDER';
		const categories: ITranslations = { PROVIDER: 'Proveedor' };
		const providerContact = Object.assign({}, makeContact({}), { category: categories[provider] });
		const accountsWithCategories: IContact[] = [
			makeContact({category: 'SERVICE'}),
			providerContact,
		];

		spyOn(translateService, 'instant').and.returnValue('Proveedor');
		contactService.getCSVFilteredContacts(accountsWithCategories, provider);
		expect(translateService.instant).toHaveBeenCalledWith('pages.contacts.categories.' + provider);
	})
});
