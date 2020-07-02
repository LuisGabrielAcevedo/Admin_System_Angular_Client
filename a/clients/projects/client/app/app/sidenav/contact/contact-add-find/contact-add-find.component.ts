import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	FormValue,
	IFindContactFormChangeEvent,
	makeFindContactFormChangeEvent,
	IContact,
	makeContact,
	IContactState,
	makeContactState,
	makeSidenavClose
} from 'client/app/app/models';
import { ContactService } from 'client/app/app/services/contact.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ContactAddComponent } from 'client/app/app/sidenav/contact/contact-add/contact-add.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-contact-add-find',
	templateUrl: './contact-add-find.component.html',
	styleUrls: ['./contact-add-find.component.scss']
})
export class ContactAddFindComponent implements OnInit, OnDestroy {
	public findContactFormValue: FormValue<IFindContactFormChangeEvent> = makeFindContactFormChangeEvent({});
	public validatedContact: IContact = makeContact({});
	public contactState: IContactState = makeContactState({});
	public subscription = new Subscription();

	constructor(
		private contactService: ContactService,
		private sidenavService: SidenavService,
		private translateService: TranslateService
	) { }

	ngOnInit() {
		this.subscription.add(
			this.contactService.getContactState().subscribe(state => {
				this.contactState = state;
				if (!state.searchedContacts) {
					this.contactService.findContacts();
				}
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onFindContactFormChange(data: FormValue<IFindContactFormChangeEvent>) {
		this.findContactFormValue = data;
	}

	get isFormValid(): boolean {
		return this.findContactFormValue.valid;
	}

	onContinue() {
		const searchType = this.findContactFormValue.value.searchBy;
		let searchValue: string = '';

		if (searchType === 'cbvu' && this.findContactFormValue.value.cbvu) {
			searchValue = this.findContactFormValue.value.cbvu;
		} else if (searchType === 'alias' &&  this.findContactFormValue.value.alias) {
			searchValue = this.findContactFormValue.value.alias;
		}

		this.subscription.add(
			this.contactService.findContactBy({ type: searchType, value: searchValue }).subscribe((contact) => {
				if (contact) {
					this.validatedContact = contact;
					this.validatedContact.id = '123456';
					this.validatedContact.favorite = false;
					this.sidenavService.nextStep({
						title: this.translateService.instant('pages.contacts.add.title'),
						hasMoreData: true,
						component: ContactAddComponent,
						data: {
							contact: this.validatedContact
						},
						closeAction: makeSidenavClose({
							text: this.translateService.instant('components.sidenavCancel.message'),
							cancelText: this.translateService.instant('common.cancel'),
							confirmText: this.translateService.instant('common.ok')
						})
					});
				}
			})
		);
	}
}
