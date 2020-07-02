import { Component, Input } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ISidenavData, makeContact } from 'client/app/app/models';
import { ContactService } from 'client/app/app/services/contact.service';

@Component({
	selector: 'mcy-contact-delete',
	templateUrl: './contact-delete.component.html',
	styleUrls: ['./contact-delete.component.scss']
})
export class ContactDeleteComponent {
	@Input() public data: ISidenavData = {
		contactData: makeContact({})
	};

	constructor(
		private contactService: ContactService,
		private sidenavService: SidenavService,
	) { }

	back() {
		this.sidenavService.prevStep();
	}

	removeContact() {
		this.contactService.removeContact(this.data.contactData.id);
		this.sidenavService.close();
	}
}
