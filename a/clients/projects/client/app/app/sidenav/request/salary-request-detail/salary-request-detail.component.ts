import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IAccount, makeAccount, makeRequest, IRequest, ISidenavData, makeTransfer, ITransfer, IConcept }
	from 'client/app/app/models';
import { PdfService } from 'client/app/app/services/pdf.service';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RequestsService } from 'client/app/app/services/requests.service';
import { ConceptService } from 'client/app/app/services/concept.service';

@Component({
	selector: 'mcy-salary-request-detail',
	templateUrl: './salary-request-detail.component.html',
	styleUrls: ['./salary-request-detail.component.scss'],
})
export class SalaryRequestDetailComponent implements OnInit, OnDestroy{
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
	public salaryPayment = makeTransfer({});
	public concepts: IConcept[] = [];

	constructor(
		private utilsService: UtilsService,
		private pdfService: PdfService,
		private requestsService: RequestsService,
		private receiptsService: ReceiptsService,
		private translateService: TranslateService,
		private conceptService: ConceptService
	) {}

	get showShareSection() {
		return this.request.state === 'AUTHORIZED' && this.salaryPayment.state === 'APPROVED';
	}

	get showRejecterInfo() {
		const isRejected = this.request.state === 'REJECTED' || this.salaryPayment.state === 'DENIED';
		return this.request.rejecter &&  isRejected;
	}

	get showMoreDetail() {
		return this.isProcessedByCore ||
		this.request.state === 'PARTIALLY_AUTHORIZED' ||
		this.request.state === 'REJECTED' ||
		this.request.state === 'AUTHORIZED'
	}

	get moreDetailLabel() {
		if (this.detailOpened) {
			return this.translateService.instant('pages.payments.salary.lessDetail');
		} else {
			return this.translateService.instant('pages.payments.salary.moreDetail');
		}
	}

	get isTransfer() {
		return this.requestsService.isTransfer(this.request);
	}

	get isProcessedByCore() {
		return (this.request.state === 'AUTHORIZED' && this.salaryPayment.state === 'APPROVED') ||
		(this.request.state === 'AUTHORIZED' && this.salaryPayment.state === 'DENIED');
	}

	ngOnInit(){
		this.request = this.data.request;
		this.salaryPayment = this.request.content as ITransfer;
		this.setStateInfo();
		this.subscription.add(this.conceptService.getConceptState().subscribe((state => {
			this.concepts = state.concepts;
		})));
		this.getConcepts();
	}

	getConcepts() {
		this.subscription.add(this.conceptService.getConcepts().subscribe());
	}

	getConceptName(code: string) {
		const searchedConcept: IConcept | undefined = this.concepts.find(concept => concept.code === code);
		return searchedConcept ? searchedConcept.description : '';
	}

	setStateInfo() {
		if (this.request.state === 'AUTHORIZED') {
			if (this.request.content.state) {
				this.setInfo(this.salaryPayment.state, this.salaryPayment.date);
			} else {
				this.setInfo(this.request.state, this.request.lastUpdateDate);
			}
		} else {
			this.setInfo(this.request.state, this.request.lastUpdateDate);
		}
	}

	setInfo(state: any, date: Date) {
		this.stateIcon = state;
		this.stateText = this.translateService.instant(`pages.requests.states.${state}`);
		this.stateDate = this.formattedDate(date);
		switch (state) {
			case 'APPROVED' :
				this.stateClass = 'salary-request-detail__state--success';
				this.stateIcon = 'SUCCESS';
				break;

			case 'DENIED' :
				this.stateClass = 'salary-request-detail__state--rejected';
				this.stateIcon = 'REJECTED';
				break;

			case 'CANCELLED' :
				this.stateClass = 'salary-request-detail__state--rejected';
				break;

			case 'REJECTED' :
				this.stateClass = 'salary-request-detail__state--rejected';
				break;

			case 'PENDING_APPROVAL' :
				this.stateClass = 'salary-request-detail__state--pending-approval';
				break;

			case 'PARTIALLY_AUTHORIZED' :
				this.stateClass = 'salary-request-detail__state--partially-authorized';
				break;

			case 'AUTHORIZED' :
				this.stateClass = 'salary-request-detail__state--authorized';
				this.stateIcon = 'AUTHORIZED';
				break;

			default:
				this.stateClass = ''
				break;
		}
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

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
