import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
	IContact,
	makeDeleteContactModal,
	makeExportCSVModal,
	CSVFilter,
	IContactState,
	makeContactState,
	ITranslations,
	makeSidenavClose
} from 'client/app/app/models';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ExportCSVModalComponent } from './export-csv-modal/export-csv-modal.component';
import { ContactService } from 'client/app/app/services/contact.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ContactEditComponent } from 'client/app/app/sidenav/contact/contact-edit/contact-edit.component';
import { TranslateService } from '@ngx-translate/core';
import { DeleteContactModalComponent } from 'client/app/app/pages/contacts/delete-contact-modal/delete-contact-modal.component';
import { ToastService } from '@mcy/core/services/toast.service';
import { IHttpError } from '@mcy/core/interfaces/api.interfaces';
import { ContactAddFindComponent } from 'client/app/app/sidenav/contact/contact-add-find/contact-add-find.component';
import { ModalService } from '@mcy/core/services/modal.service';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Component({
	templateUrl: './contacts.page.html',
	styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit, OnDestroy {
	public contactsListTableSource = new MatTableDataSource<IContact>([]);
	public favoriteContactsListTableSource = new MatTableDataSource<IContact>([]);
	public contactsList: IContact[] = [];
	contactState: IContactState = makeContactState({});
	public favoriteContactsPageSize: number = 5;
	public isContactListEmpty: boolean = true;
	public contactsPageSize: number = 20;
	public searchedResultsLength: number = 0;
	public selectedContact: string | undefined = '';
	public isAccountBeingSearched: boolean = false;
	public displayedColumns: string[] = [
		'select',
		'favorite',
		'reference',
		'name',
		'cbvu',
		'category',
		'email',
		'actions',
	];
	private subscription: Subscription;
	public searchKeyword: string = '';

	@ViewChild('favoritesPaginator', {static: true})
	favoritesPaginator!: MatPaginator;

	@ViewChild('contactsPaginator', {static: true})
	contactsPaginator!: MatPaginator;


	constructor(
		private router: Router,
		private contactService: ContactService,
		private sidenavService: SidenavService,
		private modalService: ModalService,
		private toastService: ToastService,
		private translateService: TranslateService,
		private userService: UserService,
		) {
		this.subscription = new Subscription();
	}

	ngOnInit() {
		this.contactsListTableSource.paginator = this.contactsPaginator;
		this.favoriteContactsListTableSource.paginator = this.favoritesPaginator;
		this.subscription.add(this.contactService.getContactState().subscribe(state => {
			if (!state.searchedContacts && !state.loading) {
				this.contactService.findContacts();
			}
			this.contactState = state;
			this.contactsList = state.contacts;
			const favoriteContactsList = state.contacts.filter(contact => contact.favorite === true);
			this.favoriteContactsListTableSource.data = favoriteContactsList;
			this.contactsListTableSource.data = state.contacts;
			this.isContactListEmpty = !state.contacts.length;
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	gotoContact() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.contacts.add.title'),
			hasMoreData: true,
			component: ContactAddFindComponent,
			closeAction: makeSidenavClose({
				text: this.translateService.instant('components.sidenavCancel.message'),
				cancelText: this.translateService.instant('common.cancel'),
				confirmText: this.translateService.instant('common.ok')
			})
		});
	}

	closeContacts() {
		this.router.navigate(['/app']);
	}

	showExportDialog() {
		this.modalService.openDialog(makeExportCSVModal({
			component: ExportCSVModalComponent,
			onClose: () => {},
			onCancel: () => {},
			onConfirm: (filter: CSVFilter) => { this.exportContactList(filter); }
		}));
	}

	exportContactList(filter: CSVFilter) {
		this.subscription.add(
			this.translateService.get('pages.contacts.categories').subscribe((categories: ITranslations) => {
				const contactList = this.contactsList.map( (contact) => Object.assign({}, contact, { category: categories[contact.category] }));
				this.contactService.exportCSVContacts(contactList, filter);
			})
		);
	}

	onRemoveContactClick(contact: IContact) {
		if(!contact.id) return;
		const contactId = contact.id;

		this.modalService.openDialog(makeDeleteContactModal({
			component: DeleteContactModalComponent,
			contact,
			onConfirm: () => this.removeContact(contactId),
		}));
	}

	removeContact(id: string) {
		this.contactService.removeContact(id);
	}

	openEdit(contactId: number) {
		this.sidenavService.open({
			title: this.translateService.instant('pages.contacts.edit.title'),
			component: ContactEditComponent,
			data: {
				contactId
			},
			closeAction: makeSidenavClose({
				text: this.translateService.instant('components.sidenavCancel.message'),
				cancelText: this.translateService.instant('components.sidenavCancel.cancel'),
				confirmText: this.translateService.instant('components.sidenavCancel.discard')
			})
		});
	}

	onFavoriteClick(contact: IContact, favorite: boolean) {
		this.subscription.add(this.contactService.updateContact({ ...contact, favorite }).subscribe((status: boolean) => {
			if (status) {
				contact.favorite = favorite;
			}
		}, (error: IHttpError) => this.toastService.message(error.message)));
	}

	onSearch(searchKeyword: string) {
		this.searchKeyword = searchKeyword.toLowerCase();
		this.subscription.add(this.translateService.get('pages.contacts.categories').subscribe((categories: ITranslations) => {
			if(this.searchKeyword === '') {
				this.isAccountBeingSearched = false;
			} else {
				this.isAccountBeingSearched = true;
			}
			this.contactsListTableSource.data = this.contactState.contacts.filter((contact) =>
				contact.name.toLowerCase().includes(this.searchKeyword) ||
				categories[contact.category].toLowerCase().includes(this.searchKeyword) ||
				contact.cbvu.includes(this.searchKeyword) ||
				contact.reference.toLowerCase().includes(this.searchKeyword) ||
				(contact.email && contact.email.toLowerCase().includes(this.searchKeyword))
			);
			this.searchedResultsLength = this.contactsListTableSource.data.length;
		}));
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.CONTACTS.WRITE);
	}
}
