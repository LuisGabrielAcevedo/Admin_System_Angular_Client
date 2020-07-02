import { Injectable, OnDestroy } from '@angular/core';
import { DataService } from '@mcy/core/services/data.service';
import {
	IContact,
	IContactState,
	makeContactState,
	IServiceContactResponse,
	IServiceMultipleContactResponse,
	ISearchContact,
	CSVFilter,
	CSVFilterType
} from '../models';
import { CSVService } from 'client/app/app/services/csv.service';
import { Observable, BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from '@mcy/core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { IApiStatusResponse, IHttpError } from '@mcy/core/interfaces/api.interfaces';
import { adaptContact, adaptContactToBFF } from 'client/app/app/models/contact';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Injectable()
export class ContactService extends StatefulService implements OnDestroy {
	private subject = new BehaviorSubject<IContactState>(makeContactState({}));
	public subscription: Subscription;

	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private toast: ToastService,
		private translateService: TranslateService,
		private csvService: CSVService,
		private utilsService: UtilsService,
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getAccountData(data: ISearchContact): Observable<IServiceMultipleContactResponse> {
		const accountKeyData: { [key: string]: string | number;	} = {
			[data.type]: data.value
		};
		return this.dataService.get('v1/payment-contacts/contacts', { params: accountKeyData });
	}

	findContacts(): void {
		this.updateContactState({ loading: true });
		this.subscription.add(
			this.getContacts()
			.subscribe((res: IServiceMultipleContactResponse) => {
				if (res.success || this.utilsService.isEmptyValidResponse(res)) {
					const contacts = res.data.map((contact: any) => adaptContact(contact));
					this.updateContactState({ contacts, searchedContacts: true, loading: false, hasErrorContacts: false });
				} else {
					this.updateContactState({ searchedContacts: true, loading: false, hasErrorContacts: true });
				}
			}, () => {
				this.updateContactState({ searchedContacts: true, loading: false, hasErrorContacts: true });
			})
		);
	}

	findContactBy(data: ISearchContact): Observable<IContact | null> {
		return this.getAccountData(data).pipe(
			map((res: IServiceMultipleContactResponse) => {
				if (res.success && res.data.length) {
					const contact = res.data.find(elem => elem[data.type] === data.value);
					return adaptContact(contact);
				} else {
					return null;
				}
			})
		);
	}

	removeContact(contactId: string): void {
		this.subscription.add(
			this.deleteContact(contactId).subscribe((res: IServiceContactResponse) => {
				if (res.success) {
					this.findContacts();
					this.toast.message(this.translateService.instant('pages.contacts.deleteModal.deleteContactSuccess'));
				} else {
					res.status.forEach((status: IApiStatusResponse) => this.toast.message(status.message));
				}
			}, (error: IHttpError) => {
				this.toast.message(error.message);
			})
		);
	}

	updateContact(contactData: IContact): Observable<boolean> {
		return this.updateContactData(adaptContactToBFF(contactData)).pipe(
			map((res: IServiceContactResponse) => {
				if (res.success) {
					this.findContacts();
					this.eventService.emit('contactDataUpdated');
					return true;
				} else {
					res.status.forEach((status: IApiStatusResponse) => this.toast.message(status.message));
					return false;
				}
			})
		);
	}

	submitContactData(contactData: IContact): Observable<IContact | null> {
		delete contactData.id;
		return this.addContactData(contactData).pipe(
			map((res: IServiceContactResponse) => {
				if (res.success) {
					this.findContacts();
					this.eventService.emit('contactDataUpdated');
					return adaptContact(res.data);
				} else {
					return null;
				}
			})
		);
	}

	getContactInformation(contact: IContact): Partial<IContact> {
		return {
			cbvu: contact.cbvu,
			name: contact.name,
			email: contact.email,
			reference: contact.reference,
			category: contact.category
		};
	}

	serializeContact(contact: IContact): string[] {
		return [
			contact.name,
			contact.cbvu,
			contact.category,
			contact.reference,
			contact.email ? contact.email : ''
		];
	}

	getCSVFilteredContacts(contactList: IContact[], filter: CSVFilter): IContact[] {
		if (filter === CSVFilterType.all) {
			return contactList;
		} else if (filter === CSVFilterType.favorites) {
			return contactList.filter(contact => contact.favorite);
		} else {
			return contactList.filter(contact => {
				const category = this.translateService.instant('pages.contacts.categories.' + filter);
				return contact.category === category;
			});
		}
	}

	getCSVFileName(filter: CSVFilter): Observable<string> {
		if (filter === CSVFilterType.all) {
			return this.translateService.get('pages.contacts.exportCSVModal.fileNameAll');
		} else if (filter === CSVFilterType.favorites) {
			return this.translateService.get('pages.contacts.exportCSVModal.fileNameFavorites');
		} else {
			return this.translateService.get('pages.contacts.exportCSVModal.fileNameCategory');
		}
	}

	getTableHeaders(): Observable<string> {
		return this.translateService.get([
			'pages.contacts.tableHeader.reference',
			'pages.contacts.tableHeader.name',
			'pages.contacts.tableHeader.cbu',
			'pages.contacts.tableHeader.category',
			'pages.contacts.tableHeader.email'
		]);
	}

	getCategoryName(filter: CSVFilter) {
		return this.translateService.get(`pages.contacts.categories.${filter}`);
	}

	filterIsCategory(filter: CSVFilter) {
		return filter !== CSVFilterType.all && filter !== CSVFilterType.favorites;
	}

	exportCSVContacts(contactList: IContact[], filter: CSVFilter) {
		const csvData: string[][] = [];
		const filteredContacts = this.getCSVFilteredContacts(contactList, filter);
		const tableTranslations = this.getTableHeaders();
		const fileNameTranslation = this.getCSVFileName(filter);
		const categoryTranslation = this.getCategoryName(filter);

		this.subscription.add(
			forkJoin([tableTranslations, fileNameTranslation, categoryTranslation]).subscribe((translations: string[]) => {
				const header = Object.values(translations[0]);
				const fileNamePrefix = translations[1];
				const categoryName = translations[2];
				const fileName = !this.filterIsCategory(filter) ? fileNamePrefix : fileNamePrefix + categoryName;
				csvData.push(header);
				filteredContacts.forEach((contact: IContact) => {
					csvData.push(this.serializeContact(contact));
				});
				this.csvService.downloadCSV(csvData, fileName);
			})
		);
	}

	updateContactState(data: Partial<IContactState>) {
		this.subject.next(makeContactState({...this.getContactState().value, ...data}));
	}

	getContactState(): BehaviorSubject<IContactState> {
		return this.subject;
	}

	addContactData(contactData: IContact): Observable<IServiceContactResponse> {
		return this.dataService.post('v1/payment-contacts/contacts', { body: adaptContactToBFF(contactData)	});
	}

	updateContactData(contactData: IContact): Observable<IServiceContactResponse> {
		return this.dataService.put(`v1/payment-contacts/contacts/${contactData.id}`, { body: contactData });
	}

	getContacts(): Observable<IServiceMultipleContactResponse> {
		return this.dataService.get('v1/payment-contacts/contacts');
	}

	deleteContact(id: string): Observable<IServiceContactResponse> {
		return this.dataService.delete(`v1/payment-contacts/contacts/${id}`);
	}

	isContactInContactList(contact: IContact): Observable<boolean> {
		return this.getContactState().pipe(
			map(state => state.contacts.filter(contactFromList => contactFromList.cbvu === contact.cbvu).length > 0)
		)
	}

	resetState() {
		this.updateContactState(makeContactState({}));
	}
}
