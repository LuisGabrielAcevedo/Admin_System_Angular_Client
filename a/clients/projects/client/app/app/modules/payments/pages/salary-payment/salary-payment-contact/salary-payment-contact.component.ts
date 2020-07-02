import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'client/app/app/services/contact.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ValidateContactComponent } from 'client/app/app/sidenav/validate-contact/validate-contact.component';
import {
	IContact,
	IContactState,
	makeContactState,
	makeContact,
	ContactCategory,
	FormValue,
	IFindContactFormChangeEvent,
	makeFindContactFormChangeEvent
} from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { Router } from '@angular/router';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { ModalService } from '@mcy/core/services/modal.service';
import {
	SalaryPaymentCancelComponent
} from 'client/app/app/modules/payments/pages/salary-payment/cancel-modal/salary-payment-cancel.component';
import { makeSalaryPaymentCancelModal } from 'client/app/app/models/modal';

@Component({
	selector: 'mcy-salary-payment-contact',
	templateUrl: './salary-payment-contact.component.html',
	styleUrls: ['./salary-payment-contact.component.scss']
})
export class SalaryPaymentContactComponent implements OnInit, OnDestroy {
	public contactState: IContactState = makeContactState({});
	public selectedContact: IContact = makeContact({});
	public searchKeyword: string = '';
	public searchCategory: ContactCategory | '' = '';
	public searchBy: string = 'cbvu';
	public findContactFormValue: FormValue<IFindContactFormChangeEvent> = makeFindContactFormChangeEvent({});
	private subscription: Subscription = new Subscription();
	public selectedTab = 0;
	public contactSearched: boolean= false;

	constructor(
		private contactService: ContactService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private salaryPaymentService: SalaryPaymentService,
		private analyticsService: AnalyticsService,
		private modalService: ModalService,
		private router: Router
	) {
	}

	ngOnInit() {
		this.subscription.add(this.contactService.getContactState().subscribe(state => {
			this.contactState = state;
			if (!state.searchedContacts && !state.loading) {
				this.contactService.findContacts();
			}
		}));

		const findContactFormState = this.salaryPaymentService.getSalaryPaymentState().value.newSalaryPaymentFormValue.findContactFormState;
		this.selectedTab = findContactFormState.selectedTab;
		this.contactSearched = !!findContactFormState.selectedTab;
		this.selectedContact = findContactFormState.selectedContact ? findContactFormState.selectedContact : makeContact({
			cbvu: findContactFormState.formValue.value.cbvu || '',
			alias: findContactFormState.formValue.value.alias || ''
		});
		this.searchBy = findContactFormState.formValue.value.searchBy;

		this.trackPageView();
	}

	goToLanding() {
		this.modalService.openDialog(makeSalaryPaymentCancelModal({
			component: SalaryPaymentCancelComponent,
			title: this.translateService.instant('pages.payments.salaryPaymentCancel'),
			cancel: this.translateService.instant('pages.payments.backToSalaryPayment'),
			confirm: this.translateService.instant('pages.payments.paymentCancel'),
			onCancel: () => { },
			onConfirm: () => {
				this.router.navigateByUrl('app/payments');
			}
		}));
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

	onContactSelect(contact: IContact) {
		this.selectedContact = contact;
	}

	get contacts(): IContact[] {
		return this.contactState.contacts;
	}

	onFindContactFormChange(data: FormValue<IFindContactFormChangeEvent>) {
		this.findContactFormValue = data;
	}

	onContinue() {
		const searchType = this.isContactListTabActive ? 'cbvu' : this.findContactFormValue.value.searchBy;
		let searchValue: string = '';

		this.salaryPaymentService.updateSalaryPaymentState({
			newSalaryPaymentFormValue: {
				...this.salaryPaymentService.getSalaryPaymentState().value.newSalaryPaymentFormValue,
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
		this.salaryPaymentService.updateSalaryPaymentState({
			newSalaryPaymentFormValue: {
				...this.salaryPaymentService.getSalaryPaymentState().value.newSalaryPaymentFormValue,
				contact,
			}
		});
		this.router.navigate(['/app/payments/salary/amount']);
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

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	selectedIndexChange(tab: number) {
		this.selectedTab = tab;
		this.selectedContact = makeContact({});
	}

	trackPageView() {
		this.analyticsService.trackPageView({
			name: 'Destinatario',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: '1'
			}
		},{
			transactionstep01: '1'
		});
	}
}
