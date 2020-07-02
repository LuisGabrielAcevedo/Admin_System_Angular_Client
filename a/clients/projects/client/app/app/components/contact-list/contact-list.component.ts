import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from 'client/app/app/models';


@Component({
	selector: 'mcy-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
	@Input() contacts: IContact[] = [];
	@Input() selectedContact: string = '';
	@Input() showMoreLabel: string = '';
	@Input() isSearching: boolean = false;
	@Input() emptyDescription: string = '';
	@Output() contactSelect = new EventEmitter();

	public contactsOnDisplay: number = 10;
	private addOnShowMore: number = 10;

	selectContact(contact: IContact) {
		this.contactSelect.emit(contact);
	}

	get selectedContactList(): IContact[] {
		return this.contacts.filter(contact => contact.id === this.selectedContact)
	}

	get contactList(): IContact[] {
		return this.contacts
			.sort((contact, otherContact) => 
				contact.favorite && !otherContact.favorite ? -1 : 1
			)
			.slice(0, this.contactsOnDisplay);
	}

	showMoreContacts() {
		const addElements = this.contactsOnDisplay + this.addOnShowMore > this.contacts.length 
							? this.contacts.length - this.contactsOnDisplay
							: this.addOnShowMore;
								
		this.contactsOnDisplay = this.contactsOnDisplay + addElements;
	}
}
