import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from 'client/app/app/services/contact.service';
import {
	IContactState,
	makeContactState,
	IContact,
	makeContact,
	ContactCategory,
	FormValue,
	IFindContactFormChangeEvent,
	makeFindContactFormChangeEvent,
} from 'client/app/app/models';
import { Router } from '@angular/router';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidateContactComponent } from 'client/app/app/sidenav/validate-contact/validate-contact.component';
import { TransferService } from 'client/app/app/services/transfer.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { ModalService } from '@mcy/core/services/modal.service';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';



@Component({
	templateUrl: './new-third-party-transfer-contact.page.html',
	styleUrls: ['./new-third-party-transfer-contact.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NewThirdPartyTransferContactPage implements OnInit, OnDestroy {
	public subscription: Subscription = new Subscription();
	public contactState: IContactState = makeContactState({});
	public selectedContact: IContact = makeContact({});
	public searchKeyword: string = '';
	public searchCategory: ContactCategory | '' = '';
	public selectedTab: number = 0;
	public findContactFormValue: FormValue<IFindContactFormChangeEvent> = makeFindContactFormChangeEvent({});
	public searchBy: string = 'cbvu';
	public contactSearched: boolean= false;

	constructor(
		private contactService: ContactService,
		private router: Router,
		private sidenavService: SidenavService,
		private transferService: TransferService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {} ;

	ngOnInit() {
		this.subscription.add(this.contactService.getContactState().subscribe(state => {
			this.contactState = state;
			if (!state.searchedContacts && !state.loading) {
				this.contactService.findContacts();
			}
		}));

		const findContactFormState = this.transferService.getTransferState().value.newTransferFormValue.findContactFormState;
		this.selectedTab = findContactFormState.selectedTab;
		this.contactSearched = !!findContactFormState.selectedTab;
		this.selectedContact = findContactFormState.selectedContact ? findContactFormState.selectedContact : makeContact({
			cbvu: findContactFormState.formValue.value.cbvu || '',
			alias: findContactFormState.formValue.value.alias || ''
		});
		this.searchBy = findContactFormState.formValue.value.searchBy;
	};

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onContactSelect(contact: IContact) {
		this.selectedContact = contact;
	}

	onFindContactFormChange(data: FormValue<IFindContactFormChangeEvent>) {
		this.findContactFormValue = data;
	}

	onBack() {
		this.router.navigate(['app/transfers/new']);
	}

	goToLanding() {
		this.router.navigate(['/app/transfers']);
	}

	goToSelectTransfer() {
		this.router.navigate(['/app/transfers/new']);
	}

	get cbvu() {
		return this.contactSearched
			? this.selectedContact.cbvu
			: ''
	}

	get alias() {
		return this.contactSearched
			? this.selectedContact.alias
			: ''
	}

	onContinue() {
		const searchType = this.isContactListTabActive ? 'cbvu' : this.findContactFormValue.value.searchBy;
		let searchValue: string = '';

		this.transferService.updateTransferState({
			newTransferFormValue: {
				...this.transferService.getTransferState().value.newTransferFormValue,
				findContactFormState: {
					selectedTab: this.selectedTab,
					formValue: this.findContactFormValue,
					selectedContact: this.isContactListTabActive ? this.selectedContact : undefined,
				}
			}
		});

		if (this.isContactListTabActive) {
			searchValue = this.selectedContact.cbvu;
		} else {
			if (searchType === 'cbvu' && this.findContactFormValue.value.cbvu) {
				searchValue = this.findContactFormValue.value.cbvu;
			} else if (searchType === 'alias' &&  this.findContactFormValue.value.alias) {
				searchValue = this.findContactFormValue.value.alias;
			}
		}

		this.sidenavService.open({
			title: this.translateService.instant('sidenav.payments.verifyContact'),
			component: ValidateContactComponent,
			data: {
				type: searchType,
				value: searchValue,
				onConfirm: (contact: IContact) => { this.next(contact) }
			}
		});
	}

	next(contact: IContact) {
		this.transferService.updateTransferState({
			newTransferFormValue: {
				...this.transferService.getTransferState().value.newTransferFormValue,
				destinationContact: contact
			}
		});
		this.router.navigate(['/app/transfers/thirdPartyTransferAmount']);
	}

	get contacts(): IContact[] {
		return this.contactState.contacts;
	}

	get isContactListTabActive(): boolean {
		return this.selectedTab === 0;
	}

	get isFormValid(): boolean {
		if (this.isContactListTabActive) {
			return this.selectedContact.id !== '';
		} else {
			return this.findContactFormValue.valid;
		}
	}

	onCancel(goToLanding: boolean) {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.transfers.exitModal.thirdParty.title'),
			description: this.translateService.instant('pages.transfers.exitModal.thirdParty.description'),
			cancel: this.translateService.instant('pages.transfers.exitModal.thirdParty.cancel'),
			confirm: this.translateService.instant('pages.transfers.exitModal.thirdParty.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				goToLanding ? this.goToLanding() : this.goToSelectTransfer();
			}
		}));
	}
}
