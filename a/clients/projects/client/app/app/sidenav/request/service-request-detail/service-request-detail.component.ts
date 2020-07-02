import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IAccount, makeAccount, makeRequest, IRequest, ISidenavData, IServicePayment, makeServicePayment }
	from 'client/app/app/models';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { STATUS_REQUEST } from 'client/app/app/constants';

@Component({
	selector: 'mcy-service-request-detail',
	templateUrl: './service-request-detail.component.html',
	styleUrls: ['./service-request-detail.component.scss'],
})
export class ServiceRequestDetailComponent implements OnInit, OnDestroy{
	@Input() public data: ISidenavData = {}
	@Input() account: IAccount = makeAccount({});// TODO moficar cuando este el servicio real
	public transfer: IRequest = makeRequest({});// TODO moficar cuando este el servicio real
	subscription = new Subscription();
	public detailOpened = false;
	public stateClass = '';
	public stateIcon = '';
	public stateText = '';
	public stateDate = '';
	public request = makeRequest({});
	public servicePayment = makeServicePayment({});

	constructor(private utilsService: UtilsService,
				private pdfService: PdfService,
				private receiptsService: ReceiptsService,
				private translateService: TranslateService) {
	}

	get showShareSection() {
		return this.request.state === 'AUTHORIZED' && this.servicePayment.state === 'APPROVED';
	}

	get showMoreDetail() {
		const isProcessed = (this.request.state === 'AUTHORIZED' && this.servicePayment.state === 'APPROVED') ||
		(this.request.state === 'AUTHORIZED' && this.servicePayment.state === 'DENIED');

		return isProcessed ||
		this.request.state === 'PARTIALLY_AUTHORIZED' ||
		this.request.state === 'REJECTED'
	}

	get moreDetailLabel() {
		if (this.detailOpened) {
			return this.translateService.instant('pages.payments.salary.lessDetail');
		} else {
			return this.translateService.instant('pages.payments.salary.moreDetail');
		}
	}

	getState() {
		if (this.servicePayment.state && this.servicePayment.state === 'APPROVED') {
			return STATUS_REQUEST.SUCCESS;
		}

		if (this.servicePayment.state && this.servicePayment.state === 'DENIED' ||
			this.request.state === 'REJECTED' ||
			this.request.state === 'CANCELLED') {
			return STATUS_REQUEST.CANCELLED;
		}

		return this.request.state;
	}

	ngOnInit(){
		this.request = this.data.request;
		this.servicePayment = this.request.content as IServicePayment;
		this.setStateInfo();
	}

	formattedDate(date: Date) {
		return this.utilsService.formatDate(new Date(date));
	}

	formattedDateWithTime(date: Date) {
		return this.utilsService.formatDate(new Date(date), true);
	}

	downloadReceipt() {
		this.subscription.add(this.receiptsService.getReceipt(this.request.id).subscribe(receipt => {
			this.pdfService.downloadPdf(receipt.data.file);
		}));
	}

	handleMenuOpened() {
		this.detailOpened = !this.detailOpened;
	}

	setStateInfo() {
		if (this.request.state === 'AUTHORIZED') {
			const dateFormatted = (this.servicePayment.date) ?
					this.formattedDate(this.servicePayment.date): '';
			this.setInfo(this.servicePayment.state, dateFormatted);
		} else {
			const dateFormatted = this.formattedDate( this.request.lastUpdateDate)
			this.setInfo(this.request.state, dateFormatted);
		}
	}

	setInfo(state: any, dateFormatted: string) {
		this.stateIcon = state;
		this.stateText = this.translateService.instant(`pages.requests.states.${state}`);
		this.stateDate = dateFormatted;
		switch (state) {
			case 'APPROVED' :
				this.stateClass = 'service-request-detail__state--success';
				this.stateIcon = 'SUCCESS';
				break;

			case 'DENIED' :
				this.stateClass = 'service-request-detail__state--rejected';
				this.stateIcon = 'REJECTED';
				break;

			case 'CANCELLED' :
				this.stateClass = 'service-request-detail__state--rejected';
				break;

			case 'REJECTED' :
				this.stateClass = 'service-request-detail__state--rejected';
				break;

			case 'PENDING_APPROVAL' :
				this.stateClass = 'service-request-detail__state--pending-approval';
				break;

			case 'PARTIALLY_AUTHORIZED' :
				this.stateClass = 'service-request-detail__state--partially-authorized';
				break;

			default:
				this.stateClass = ''
				break;
		}
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
