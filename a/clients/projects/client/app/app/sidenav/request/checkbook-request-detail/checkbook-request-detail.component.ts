import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { makeRequest, IRequest, ISidenavData }
	from 'client/app/app/models';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ICheckbook, makeCheckbook } from 'client/app/app/models/checkbook';

@Component({
	selector: 'mcy-checkbook-request-detaildetail',
	templateUrl: './checkbook-request-detail.component.html',
	styleUrls: ['./checkbook-request-detail.component.scss'],
})
export class CheckbookRequestDetailComponent implements OnInit, OnDestroy{
	@Input() public data: ISidenavData = {}
	public transfer: IRequest = makeRequest({});// TODO moficar cuando este el servicio real
	subscription = new Subscription();
	public detailOpened = false;
	public stateClass = '';
	public stateIcon = '';
	public stateText = '';
	public stateDate = '';
	public request = makeRequest({
		content: makeCheckbook({})
	});
	public checkbook = makeCheckbook({});
	public provinceDescription = '';
	public branchDescription = '';
	public typeDescription = '';

	constructor(private utilsService: UtilsService,
				private pdfService: PdfService,
				private receiptsService: ReceiptsService,
				private translateService: TranslateService) {
	}

	get showShareSection() {
		return this.checkbook.state === 'APPROVED';
	}

	get showMoreDetail() {
		return this.checkbook.state === 'APPROVED' ||
		this.checkbook.state === 'DENIED' ||
		this.request.state === 'PARTIALLY_AUTHORIZED' ||
		this.request.state === 'REJECTED'
	}

	get moreDetailLabel() {
		if (this.detailOpened) {
			return this.translateService.instant('pages.checkbooks.detail.lessDetail');
		} else {
			return this.translateService.instant('pages.checkbooks.detail.moreDetail');
		}
	}

	ngOnInit(){
		this.request = this.data.request;
		this.checkbook = this.request.content as ICheckbook;
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
			const dateFormatted = (this.checkbook.date) ?
					this.formattedDate(this.checkbook.date): '';
			this.setInfo(this.checkbook.state, dateFormatted);
		} else {
			const dateFormatted = this.formattedDate( this.request.lastUpdateDate)
			this.setInfo(this.request.state, dateFormatted);
		}
	}

	setInfo(state: any, dateFormatted: string) {
		this.stateIcon = state;
		this.stateText = this.translateService.instant(`pages.checkbooks.detail.states.${state}`);
		this.stateDate = dateFormatted;
		switch (state) {
			case 'APPROVED' :
				this.stateClass = 'checkbook-request-detail__state--success';
				this.stateIcon = 'SUCCESS';
				break;

			case 'DENIED' :
				this.stateClass = 'checkbook-request-detail__state--rejected';
				this.stateIcon = 'REJECTED';
				break;

			case 'CANCELLED' :
				this.stateClass = 'checkbook-request-detail__state--rejected';
				break;

			case 'REJECTED' :
				this.stateClass = 'checkbook-request-detail__state--rejected';
				break;

			case 'PENDING_APPROVAL' :
				this.stateClass = 'checkbook-request-detail__state--pending-approval';
				break;

			case 'PARTIALLY_AUTHORIZED' :
				this.stateClass = 'checkbook-request-detail__state--partially-authorized';
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
