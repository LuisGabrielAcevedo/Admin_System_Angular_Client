import { Component, Input, OnDestroy } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { ITransfer } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-salary-payments-list',
	templateUrl: './salary-payments-list.component.html',
	styleUrls: ['./salary-payments-list.component.scss']
})
export class SalaryPaymentsListComponent implements OnDestroy {
	@Input() public salaryPayments: ITransfer[] = [];
	@Input() public loading = false;
	public subscription = new Subscription();
	public displayedColumns: string[] = [
		'icon',
		'name',
		'cuilt',
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

	goToRequestDetail(payment: ITransfer) {
		this.sidenavService.open({
			title: this.translateService.instant('pages.payments.salary.salaryPayment'),
			component: RequestDetailComponent,
			data: {
				id: payment.id,
				date: payment.date,
				state: payment.state
			}
		});
	}

	downloadReceipt(salaryPayment: ITransfer) {
		if(salaryPayment.id && salaryPayment.state === 'APPROVED'){
			this.subscription.add(this.receiptsService.getReceipt(salaryPayment.id).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
			}));
		}
	}
}
