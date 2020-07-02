import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { makeTransfer, ISidenavData, makeAccountState, IAccount, IConcept } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { ConceptService } from 'client/app/app/services/concept.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-transfer-details',
	templateUrl: './transfer-details.component.html',
	styleUrls: ['./transfer-details.component.scss']
})

export class TransferDetailsComponent implements OnInit, OnDestroy {
	public concepts: IConcept[] = [];
	@Input() public data: ISidenavData = {
		transfer: makeTransfer({}),
		accountState: makeAccountState({})
	};
	public transferDate: string = '';
	subscription = new Subscription();

	constructor(
		private utilsService: UtilsService,
		private pdfService: PdfService,
		private receiptsService: ReceiptsService,
		private conceptService: ConceptService
	) {}

	ngOnInit(){
		this.subscription.add(this.conceptService.getConceptState().subscribe((state => {
			this.concepts = state.concepts;
		})));
		this.getConcepts();
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	getConcepts() {
		this.subscription.add(this.conceptService.getConcepts().subscribe());
	}

	getConceptName(code: string) {
		const searchedConcept: IConcept | undefined = this.concepts.find(concept => concept.code === code);
		return searchedConcept ? searchedConcept.description : '';
	}

	formatAmount(amount: number): string {
		return this.utilsService.formatAmount(amount);
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	get originAccount(): string {
		const originAccount = this.data.accountState.accounts.filter((account: IAccount) => {
			return account.cbvu === this.data.transfer.originCbvu &&
				account.currency.code === this.data.transfer.currency.code
		});
		return originAccount[0] ? 
				`${originAccount[0].type} ${this.formatAccountNumber(originAccount[0].number)}`
				: '';
	}

	formatAccountNumber(accountNumber: string): string {
		return this.utilsService.formatAccountNumber(accountNumber);
	}

	downloadReceipt() {
		if(this.data.transfer && this.data.transfer.id){
			this.subscription.add(this.receiptsService.getReceipt(this.data.transfer.id).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}
}
