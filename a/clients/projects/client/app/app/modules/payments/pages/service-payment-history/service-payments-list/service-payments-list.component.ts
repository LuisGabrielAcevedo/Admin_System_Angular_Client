import { Component, Input, OnDestroy } from '@angular/core';
import { IRequest, IServicePayment } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-service-payments-list',
	templateUrl: './service-payments-list.component.html',
	styleUrls: ['./service-payments-list.component.scss']
})
export class ServicePaymentsListComponent implements OnDestroy {
	@Input() public servicePayments: IRequest[] = [];
	@Input() public loading = false;
	public subscription = new Subscription();
	public displayedColumns: string[] = [
		'icon',
		'serviceName',
		'amount',
		'date',
		'requestNumber',
		'state',
		'download',
		'details'
	];

	constructor(private utilsService: UtilsService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		private receiptsService: ReceiptsService,
		private pdfService: PdfService) {}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	goToServiceDetail(payment: IRequest) {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.payments.serviceDetail'),
			component: RequestDetailComponent,
			data: {
				id: payment.id
			}
		});
	}

	downloadReceipt(servicePayment: IRequest) {
		if((servicePayment.content as IServicePayment).banelcoClientId && (servicePayment.content as IServicePayment).state === 'APPROVED'){
			this.subscription.add(this.receiptsService.getReceipt((servicePayment.content as IServicePayment).banelcoClientId).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}
}
