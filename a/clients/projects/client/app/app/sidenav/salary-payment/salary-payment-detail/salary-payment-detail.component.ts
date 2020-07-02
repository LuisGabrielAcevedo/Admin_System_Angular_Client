import { Component, Input, OnDestroy } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { ITransfer, makeTransfer, IAccount, makeAccount } from 'client/app/app/models';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-salary-payment-detail',
	templateUrl: './salary-payment-detail.component.html',
	styleUrls: ['./salary-payment-detail.component.scss'],
})
export class SalaryPaymentDetailComponent implements OnDestroy{
	@Input() public data: ITransfer = makeTransfer({});
	@Input() account: IAccount = makeAccount({});// TODO moficar cuando este el servicio real
	public transfer: ITransfer = makeTransfer({id:'123456'});// TODO moficar cuando este el servicio real
	subscription = new Subscription();
	constructor(private utilsService: UtilsService,
				private  pdfService: PdfService,
				private receiptsService: ReceiptsService) {
	}
	get showShareSection() {
		return this.data.state === 'APPROVED';
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	formattedDate(date: Date) {
		return this.utilsService.formatDate(new Date(date));
	}

	downloadReceipt() {
		if(this.transfer.id){
			this.subscription.add(this.receiptsService.getReceipt(this.transfer.id).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}
}
