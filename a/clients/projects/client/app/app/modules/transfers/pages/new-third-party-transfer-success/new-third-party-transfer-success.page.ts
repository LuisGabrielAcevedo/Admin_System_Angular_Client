import { Component, OnInit } from '@angular/core';
import { TransferService } from 'client/app/app/services/transfer.service';
import {
	ITransferState,
	makeTransferState,
	makeSidenavClose,
	IAccount,
	makeAccount,
	IContact,
	makeContact,
	ITransfer,
	IRequest,
	makeTransferDetailSuccess,
	ITransferDetailSuccess,
	IConcept
} from 'client/app/app/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ContactAddComponent } from 'client/app/app/sidenav/contact/contact-add/contact-add.component';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ContactService } from 'client/app/app/services/contact.service';
import { Observable, Subscription } from 'rxjs';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ConceptService } from 'client/app/app/services/concept.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';

@Component({
	templateUrl: './new-third-party-transfer-success.page.html',
	styleUrls: ['./new-third-party-transfer-success.page.scss']
})
export class NewThirdPartyTransferSuccessPage implements OnInit {
	public subscription: Subscription = new Subscription();
	public transferState: ITransferState = makeTransferState({});
	public destinationAccount: IAccount = makeAccount({});
	public destinationContact: IContact = makeContact({});
	public sourceAccount: IAccount = makeAccount({});
	public lastTransferRequest: IRequest | null = null;
	public concepts: IConcept[] = [];
	public contentDetailTransferSuccess: ITransferDetailSuccess = makeTransferDetailSuccess({});
	constructor(
		private transferService: TransferService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private router: Router,
		private contactService: ContactService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
		private conceptService: ConceptService
	) {}

	ngOnInit() {
		this.subscription.add(this.transferService.getTransferState().subscribe((transferState: ITransferState) => {
			this.transferState = transferState;
			this.lastTransferRequest = transferState.lastTransfer;
			this.sourceAccount = transferState.newTransferFormValue.sourceAccount;
			this.destinationAccount = transferState.newTransferFormValue.destinationAccount;
			this.destinationContact = transferState.newTransferFormValue.destinationContact;
		}));
		this.contentDetailTransferSuccess = this.lastTransferRequest
			? this.transferService.getContentForTransferSuccess(this.lastTransferRequest)
			: makeTransferDetailSuccess({});

		this.subscription.add(this.conceptService.getConceptState().subscribe((state => {
			this.concepts = state.concepts;
		})));
		this.getConcepts();
	}

	getConcepts() {
		this.subscription.add(this.conceptService.getConcepts().subscribe());
	}

	onPrimaryButtonClick() {
		this.router.navigate(['app/transfers']);
	}

	get transferConcept(): string {
		const searchedConcept: IConcept | undefined = this.concepts.find(concept =>
			concept.code === (this.lastTransferRequest!.content as ITransfer).conceptCode
		);
		return searchedConcept ? searchedConcept.description : '';
	}

	get requestId(): string {
		return this.lastTransferRequest ? this.lastTransferRequest.id : '';
	}

	get destinationHolder(): string {
		return (this.lastTransferRequest!.content as ITransfer).destinationHolder;
	}

	get destinationCbvu(): string {
		return (this.lastTransferRequest!.content as ITransfer).destinationCbvu;
	}

	isContactInContactList(contact: IContact): Observable<boolean> {
		return this.contactService.isContactInContactList(contact);
	}

	onSecondaryButtonClick() {
		this.router.navigate(['app/transfers/new']);
	}

	openAddContact() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.contacts.add.title'),
			component: ContactAddComponent,
			data: {
				contact: this.transferState.newTransferFormValue.destinationContact
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
		if(this.lastTransferRequest && this.requestId){
			this.subscription.add(this.receiptsService.getReceipt(this.requestId).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}

	detailRequest(): void {
		this.sidenavService.open({
			title: this.translateService.instant('pages.transfers.thirdParty.success.titleDetail'),
			component: RequestDetailComponent,
			data: {
				id: this.requestId
			}
		});
	}
}
