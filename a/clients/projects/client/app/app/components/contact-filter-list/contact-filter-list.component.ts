import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { IContact, ContactCategory, makeContact } from 'client/app/app/models';
import { ContactSearchFormChangeEvent } from 'client/app/app/components/contact-search-form/contact-search-form.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-contact-filter-list',
	templateUrl: './contact-filter-list.component.html',
	styleUrls: ['./contact-filter-list.component.scss'],
})
export class ContactFilterListComponent implements OnInit {
	@Input() contacts: IContact[] = [];
	@Input() selectedContact: IContact = makeContact({});
	@Input() preSelectedCategory : ContactCategory | null = null;
	@Output() handleContactSelect = new EventEmitter();

	public searchKeyword: string = '';
	public searchCategory: ContactCategory | '' = '';

	constructor(private translateService: TranslateService) {}

	ngOnInit() {
		if (this.selectedContact.cbvu.length) {
			this.searchCategory = this.selectedContact.category;
		} else {
			this.searchCategory = this.preSelectedCategory ? this.preSelectedCategory : '';
		}
	}

	onSearchFormChange(data: ContactSearchFormChangeEvent) {
		this.searchKeyword = data.searchKeyword.toLowerCase();
		this.searchCategory = data.category;
	}

	onContactSelect(contact: IContact) {
		this.handleContactSelect.emit(contact);
	}

	contactIncludesCategory(contact: IContact): boolean {
		return this.searchCategory === '' || contact.category === this.searchCategory;
	}

	contactIncludesKeyword(contact: IContact): boolean {
		return this.searchKeyword === null ||
			(
				contact.name.toLowerCase().includes(this.searchKeyword) || 
				contact.cbvu.includes(this.searchKeyword) ||
				contact.reference.toLowerCase().includes(this.searchKeyword)
			)
	}

	get contactList(): IContact[] {
		return this.contacts
			.filter((contact) => 
				this.contactIncludesCategory(contact) && this.contactIncludesKeyword(contact)		
			)
	}

	get emptyDescription(): string {
		if (this.preSelectedCategory === this.searchCategory && this.preSelectedCategory !== null) {
			switch(this.preSelectedCategory) {
				case 'PROVIDER': return this.translateService.instant('components.contactFilterList.providerEmptyMessage');
				case 'EMPLOYEE': return this.translateService.instant('components.contactFilterList.employeeEmptyMessage');
				default: return '';
			}
		} else if (this.searchCategory) {
			return this.translateService.instant('components.contactFilterList.searchByCategoryEmptyDefaultMessage');
		} else {
			return '';
		}
	}
}
