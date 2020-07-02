import { Injectable } from '@angular/core';
import { IContact, makeContact } from 'client/app/app/models';
import { Observable } from 'rxjs';

@Injectable()
export class ContactServiceMock {
	constructor( ) { }

	getAccountData(_accountKey: string): Observable<any> {
		return new Observable();
	}

	submitContactData(_contactData: IContact): Observable<any> {
		return new Observable();
	}

	updateContact(_contactData: IContact): Observable<any> {
		return new Observable();
	}

	updateContactData(_contactData: IContact): Observable<any> {
		return new Observable();
	}

	removeContact(_contactId: number): Observable<any> {
		return new Observable();
	}

	findContactBy(): Observable<any> {
		return new Observable();
	}

	getContacts(): Observable<any> {
		return new Observable();
	}

	getContactState(): Observable<any> {
		return new Observable();
	}

	findContacts(): Observable<any> {
		return new Observable();
	}

	initContactData(): IContact {
		return makeContact({});
	}

	isContactInContactList(_contact: IContact): boolean {
		return false;
	}
}
