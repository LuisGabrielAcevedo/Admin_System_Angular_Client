import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ContactService } from 'client/app/app/services/contact.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {
	IProviderPaymentState,
	makeProviderPaymentState,
	IAccount,
	makeAccount,
	IContact,
	makeContact,
	IRequest,
	IConcept,
	ITransferDetailSuccess,
	makeTransferDetailSuccess,
	ITransfer,
	makeSidenavClose,
	makeProviderPaymentFormValue,
} from 'client/app/app/models';
import { Observable } from 'rxjs/internal/Observable';
import { ContactAddComponent } from 'client/app/app/sidenav/contact/contact-add/contact-add.component';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';

@Component({
	selector: 'mcy-provider-payment-success',
	templateUrl: './provider-payment-success.page.html',
	styleUrls: ['./provider-payment-success.page.scss']
})
export class ProviderPaymentSuccessPage implements OnInit, OnDestroy {
	public subscription: Subscription = new Subscription();
	public providerPaymentState: IProviderPaymentState = makeProviderPaymentState({});
	public destinationAccount: IAccount = makeAccount({});
	public destinationContact: IContact = makeContact({});
	public sourceAccount: IAccount = makeAccount({});
	public lastProviderPaymentRequest: IRequest | null = null;
	public concepts: IConcept[] = [];
	public contentDetailTransferSuccess: ITransferDetailSuccess = makeTransferDetailSuccess({});
	constructor(
		private providerPaymentService: ProviderPaymentService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private router: Router,
		private contactService: ContactService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
	) {}

	ngOnInit() {
		this.subscription.add(this.providerPaymentService.getProviderPaymentState().subscribe((state: IProviderPaymentState) => {
			this.providerPaymentState = state;
			this.lastProviderPaymentRequest = state.lastProviderPaymentRequest
	;
			this.sourceAccount = state.newProviderPaymentFormValue.sourceAccount;
			this.destinationAccount = state.newProviderPaymentFormValue.destinationAccount;
			this.destinationContact = this.providerPaymentState.newProviderPaymentFormValue.destinationContact;
		}));
		this.contentDetailTransferSuccess = this.lastProviderPaymentRequest 
			? this.providerPaymentService.getContentForTransferSuccess(this.lastProviderPaymentRequest) 
			: makeTransferDetailSuccess({});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onPrimaryButtonClick() {
		this.router.navigate(['app/payments']);
	}

	get operationNumber(): string {
		return this.lastProviderPaymentRequest ? this.lastProviderPaymentRequest.id : '';
	}

	get destinationHolder(): string {
		return (this.lastProviderPaymentRequest!.content as ITransfer).destinationHolder;
	}

	get destinationCbvu(): string {
		return (this.lastProviderPaymentRequest!.content as ITransfer).destinationCbvu;
	}

	isContactInContactList(contact: IContact): Observable<boolean> {
		return this.contactService.isContactInContactList(contact);
	}

	onSecondaryButtonClick() {
		this.providerPaymentService.updateProviderPaymentState({
			newProviderPaymentFormValue: makeProviderPaymentFormValue({}),
			lastProviderPaymentRequest: null,
		});
		this.router.navigate(['app/payments/provider/contact']);
	}

	openAddContact() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.contacts.add.title'),
			component: ContactAddComponent,
			data: {
				contact: this.providerPaymentState.newProviderPaymentFormValue.destinationContact
			},
			hasMoreData: true,
			closeAction: makeSidenavClose({
				text: this.translateService.instant('components.sidenavCancel.message'),
				cancelText: this.translateService.instant('common.cancel'),
				confirmText: this.translateService.instant('common.ok'),
			})
		});
	}

	downloadReceipt() {
		if(this.lastProviderPaymentRequest){
			this.subscription.add(this.receiptsService.getReceipt(this.operationNumber).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}

	detailRequest(){ 
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.paymentProviderDetails.title'),
			component: RequestDetailComponent,
			data: {
				id: this.operationNumber,
				date: this.lastProviderPaymentRequest ? this.lastProviderPaymentRequest.content.date : '',
				state: this.lastProviderPaymentRequest ? this.lastProviderPaymentRequest.content.state : undefined,
			}
		});
	}
}
