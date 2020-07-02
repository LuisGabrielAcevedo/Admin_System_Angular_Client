import { Component, Input, OnDestroy } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IServicePayment, makeServicePayment, IAccount, makeAccount } from 'client/app/app/models';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-service-payment-detail',
	templateUrl: './service-payment-detail.component.html',
	styleUrls: ['./service-payment-detail.component.scss']
})
export class ServicePaymentDetailComponent implements OnDestroy{
	@Input() public data: IServicePayment = makeServicePayment({});
	@Input() account: IAccount = makeAccount({});// TODO moficar cuando este el servicio real
	public servicePayment: IServicePayment = makeServicePayment({banelcoClientId:'123456'});// TODO moficar cuando este el servicio real
	subscription = new Subscription();
	constructor(private utilsService: UtilsService,
				private pdfService: PdfService,
				private receiptsService: ReceiptsService) {
	}

	get showOtherAmount() {
		return this.data.amount !== this.data.otherAmount;
	}

	get showShareSection() {
		return this.data.state === 'APPROVED';
	}

	formattedDate(date: Date | undefined) {
		if (date) {
			return this.utilsService.formatDate(new Date(date));
		}

		return '';
	}

	downloadReceipt() {
		if(this.servicePayment.banelcoClientId){
			this.subscription.add(this.receiptsService.getReceipt(this.servicePayment.banelcoClientId).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
