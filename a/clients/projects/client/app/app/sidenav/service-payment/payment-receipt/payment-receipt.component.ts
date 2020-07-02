import { Component, Input, OnInit } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ISidenavData } from 'client/app/app/models/sidenav';
import { Subscription } from 'rxjs';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { IRequest, makeRequest } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-payment-receipt',
	templateUrl: './payment-receipt.component.html',
	styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit{
	@Input() public data: ISidenavData = {};
	public subscription = new Subscription();
	public requestServicePayment: IRequest = makeRequest({});
	constructor(
		public sidenavService: SidenavService,
		private receiptsService: ReceiptsService,
		private pdfService: PdfService,
		private translateService: TranslateService,

	) {}

	ngOnInit(){
		this.requestServicePayment = this.data.requestServicePayment;
	}

	get textButtonSecondary(){
		let textButtonSecundary: string = '';
		if(this.requestServicePayment.state === 'AUTHORIZED'){
			textButtonSecundary = this.translateService.instant('pages.payments.servicePayment.success.downloadReceipt');
		} else{
			textButtonSecundary = this.translateService.instant('pages.payments.servicePayment.success.detailRequest');
		}
		return textButtonSecundary;
	}

	payOtherService() {
		this.sidenavService.reset({});
	}

	back() {
		this.sidenavService.prevStep();
	}

	detailRequest(){
	}

	goToLandingServicePayment() {
		this.sidenavService.close();
	}

	downloadReceipt() {
		this.subscription.add(this.receiptsService.getReceipt(this.data.payment.controlNumber).subscribe(receipt => {
			this.pdfService.downloadPdf(receipt.data.file);
		}));
	}



}
