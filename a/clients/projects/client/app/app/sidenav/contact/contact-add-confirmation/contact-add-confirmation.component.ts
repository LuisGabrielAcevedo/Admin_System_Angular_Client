import { Component, Input, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ContactService } from 'client/app/app/services/contact.service';
import { ISidenavData, makeContact, IContact } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { ContactSuccessComponent } from 'client/app/app/sidenav/contact/contact-success/contact-success.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-contact-add-confirmation',
	templateUrl: './contact-add-confirmation.component.html',
	styleUrls: ['./contact-add-confirmation.component.scss']
})
export class ContactAddConfirmationComponent implements OnDestroy {
	@Input() public data: ISidenavData = {
		contact: makeContact({})
	}

	public subscription = new Subscription();

	constructor(
		private sidenavService: SidenavService,
		private contactService: ContactService,
		private translateService: TranslateService
	) { }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	back() {
		this.sidenavService.preClose();
	}

	next() {
		this.submitContactData();
	}

	submitContactData() {
		this.subscription.add(
			this.contactService.submitContactData(this.data.contact)
			.subscribe((contact: IContact | null) => {
				if (contact) {
					this.addSuccessStep(contact);
				}
			}, () => {
				
			})
		);
	}

	addSuccessStep(contactData: IContact) {
		this.sidenavService.nextStep({
			title: this.translateService.instant('pages.contacts.add.titleSuccess'),
			component: ContactSuccessComponent,
			data: {
				contact: contactData,
				title: this.translateService.instant('pages.contacts.addSuccess.subtitle'),
			}
		});
	}

	backToFindContact() {
		this.sidenavService.goToStep(1);
	}

	backToEditContact() {
		this.sidenavService.goToStep(2);
	}
}
