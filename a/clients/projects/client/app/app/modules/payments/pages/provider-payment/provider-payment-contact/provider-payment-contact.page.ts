import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { IContactState, makeContactState, IContact, makeContact,
	ContactCategory, FormValue, IFindContactFormChangeEvent, makeFindContactFormChangeEvent } from 'client/app/app/models';
import { ContactService } from 'client/app/app/services/contact.service';
import { Router } from '@angular/router';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidateContactComponent } from 'client/app/app/sidenav/validate-contact/validate-contact.component';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { ModalService } from '@mcy/core/services/modal.service';

@Component({
	selector: 'mcy-provider-payment-contact',
	templateUrl: './provider-payment-contact.page.html',
	styleUrls: ['./provider-payment-contact.page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProviderPaymentContactPage implements OnInit, OnDestroy {
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
		private providerPaymentService: ProviderPaymentService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {} ;

	ngOnInit() {
		this.subscription.add(this.contactService.getContactState().subscribe(state => {
			this.contactState = state;
			if (!this.contactState.searchedContacts && !this.contactState.loading) {
				this.contactService.findContacts();
			}
		}));
		this.restoreFormState();
	};

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onFindContactFormChange(data: FormValue<IFindContactFormChangeEvent>) {
		this.findContactFormValue = data;
	}

	onContactSelect(contact: IContact) {
		this.selectedContact = contact;
	}

	onBack() {
		this.router.navigate(['app/payments/']);
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	onContinue() {
		const searchType = this.isContactListTabActive ? 'cbvu' : this.findContactFormValue.value.searchBy;
		let searchValue: string = '';

		this.providerPaymentService.updateProviderPaymentState({
			newProviderPaymentFormValue: {
				...this.providerPaymentService.getProviderPaymentState().value.newProviderPaymentFormValue,
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

	onCancel() {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.payments.providers.exitModal.title'),
			description: this.translateService.instant('pages.payments.providers.exitModal.description'),
			cancel: this.translateService.instant('pages.payments.providers.exitModal.cancel'),
			confirm: this.translateService.instant('pages.payments.providers.exitModal.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				this.goToLanding();
			}
		}));
	}

	next(contact: IContact) {
		this.providerPaymentService.updateProviderPaymentState({
			newProviderPaymentFormValue: {
				...this.providerPaymentService.getProviderPaymentState().value.newProviderPaymentFormValue,
				destinationContact: contact
			}
		});
		this.router.navigate(['/app/payments/provider/amount']);
	}

	restoreFormState() {
		const findContactFormState = this.providerPaymentService.getProviderPaymentState().value.newProviderPaymentFormValue.findContactFormState;
		this.selectedTab = findContactFormState.selectedTab;
		this.contactSearched = !!findContactFormState.selectedTab;
		this.selectedContact = findContactFormState.selectedContact ? findContactFormState.selectedContact : makeContact({
			cbvu: findContactFormState.formValue.value.cbvu || '',
			alias: findContactFormState.formValue.value.alias || ''
		});
		this.searchBy = findContactFormState.formValue.value.searchBy;
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

	retryGetContacts() {
		this.contactService.findContacts();
	}
}
