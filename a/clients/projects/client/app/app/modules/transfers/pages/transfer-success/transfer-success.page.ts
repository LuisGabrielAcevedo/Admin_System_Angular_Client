import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransferService } from 'client/app/app/services/transfer.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {
	makeTransferState,
	ITransferState,
	ITransfer,
	IAccountState,
	makeAccountState,
	IRequest,
	makeTransfer,
	ITransferDetailSuccess,
	makeTransferDetailSuccess,
	IConcept
} from 'client/app/app/models';
import { Router } from '@angular/router';
import { AccountService } from 'client/app/app/services/account.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ConceptService } from 'client/app/app/services/concept.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	templateUrl: './transfer-success.page.html',
	styleUrls: ['./transfer-success.page.scss']
})
export class TransferSuccessPage implements OnInit, OnDestroy {
	private subscription: Subscription = new Subscription();
	public transferState: ITransferState = makeTransferState({});
	public accountState: IAccountState = makeAccountState({});
	public lastTransfer: IRequest | null = null;
	public contentDetailTransferSuccess: ITransferDetailSuccess = makeTransferDetailSuccess({});
	public concepts: IConcept[] = [];
	constructor(
		private transferService: TransferService,
		private accountService: AccountService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
		private router: Router,
		private conceptService: ConceptService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private utilsService: UtilsService,
	) {}

	ngOnInit() {
		this.subscription.add(
			this.transferService.getTransferState().subscribe((state) => {
				this.transferState = state;
				this.lastTransfer = this.transferState.lastTransfer;
			})
		);

		this.subscription.add(this.conceptService.getConceptState().subscribe((state => {
			this.concepts = state.concepts;
		})));
		this.getConcepts();
		this.accountService.findAccounts();

		this.subscription.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.accountState = state;
			})
		);
		this.contentDetailTransferSuccess = this.lastTransfer ?
		this.transferService.getContentForTransferSuccess(this.lastTransfer):
		makeTransferDetailSuccess({});
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	getConcepts() {
		this.subscription.add(this.conceptService.getConcepts().subscribe());
	}

	get content(){
		if (this.lastTransfer)
			return this.lastTransfer.content as ITransfer;
		return makeTransfer({});
	}

	get transferConcept(): string {
		const searchedConcept: IConcept | undefined = this.concepts.find(concept => concept.code === this.content.conceptCode);
		return searchedConcept ? searchedConcept.description : '';
	}

	get operationNumber(): string {
		return this.lastTransfer ? this.lastTransfer.id : '';
	}

	get originAccount(): string {
		const originAccounts = this.accountState.accounts.filter((account) => account.cbvu === this.content.originCbvu);
		return originAccounts[0]
			? `${originAccounts[0].type} ${this.formatAccountNumber(originAccounts[0].number)}`
			: '';
	}

	get destinationAccount(): string {
		const destinationAccounts = this.accountState.accounts.filter((account) => account.cbvu === this.content.destinationCbvu);
		return destinationAccounts[0]
			? `${destinationAccounts[0].type} ${this.formatAccountNumber(destinationAccounts[0].number)}`
			: '';
	}

	formatAccountNumber(accountNumber: string): string {
		return this.utilsService.formatAccountNumber(accountNumber);
	}

	onPrimaryButtonClick() {
		this.router.navigate(['app/transfers']);
	}

	onSecondaryButtonClick() {
		this.router.navigate(['app/transfers/new']);
	}

	goToSelectTransfer() {
		this.router.navigate(['/app/transfers/new']);
	}

	detailRequest(){
		if (this.lastTransfer) {
			this.sidenavService.open({
				title: this.translateService.instant('sidenav.transferDetails.title'),
				component: RequestDetailComponent,
				data: {
					id: this.lastTransfer.id
				}
			});
		}
	}

	downloadReceipt() {
	if(this.lastTransfer && this.operationNumber){
		this.subscription.add(this.receiptsService.getReceipt(this.operationNumber).subscribe(receipt => {
			this.pdfService.downloadPdf(receipt.data.file);
		}));
	}
	}
}
