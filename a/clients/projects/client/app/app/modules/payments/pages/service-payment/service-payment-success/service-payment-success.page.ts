import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	ITransferDetailSuccess,
	makeTransferDetailSuccess,
	IContact,
	makeContact,
	IServicePaymentState,
	makeServicePaymentState,
	IRequest,
	IServicePayment,
	IServicePaymentFormValue
	 } from 'client/app/app/models';
import {  Subscription } from 'rxjs';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { Router } from '@angular/router';
import { ReceiptsService } from 'client/app/app/services/receipts.service';
import { PdfService } from 'client/app/app/services/pdf.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-service-payment-success',
	templateUrl: './service-payment-success.page.html',
	styleUrls: ['./service-payment-success.page.scss'],
})
export class ServicePaymentSuccessPage implements OnInit, OnDestroy {
	private pageViewFired: boolean = false;

	public destinationContact: IContact = makeContact({});
	public subscription = new Subscription();
	public servicePayment: IServicePaymentState = makeServicePaymentState({});
	public lastServicePaymentRequest: IRequest | null = null;;
	public contentDetailPaymentSuccess: ITransferDetailSuccess = makeTransferDetailSuccess({});

	constructor(
		private servicePaymentService: ServicePaymentService,
		private router: Router,
		private receiptsService: ReceiptsService,
		private pdfService: PdfService,
		private sidenavService: SidenavService,
		private analyticsService: AnalyticsService,
		private translateService: TranslateService
	){}

	ngOnInit(){
		this.getServicePaymentState();
		this.contentDetailPaymentSuccess = this.lastServicePaymentRequest
			? this.servicePaymentService.getContentForPaymentSuccess(this.lastServicePaymentRequest)
			: makeTransferDetailSuccess({});
	}

	getServicePaymentState() {
		this.subscription.add(
			this.servicePaymentService.getServicePaymentState()
			.subscribe((servicePayment: IServicePaymentState) => {
				this.servicePayment = servicePayment;
				this.lastServicePaymentRequest	= servicePayment.lastServicePaymentRequest;
				if (!this.pageViewFired) {
					this.trackPageView();
					this.pageViewFired = true;
				}
		})
		);
	}
	get content (){
		return  this.lastServicePaymentRequest ? this.lastServicePaymentRequest.content as IServicePayment : null
	}

	get requestId(): string {
		return this.lastServicePaymentRequest ? this.lastServicePaymentRequest.id : '';
	}

	onPrimaryButtonClick() {
		this.router.navigate(['app/payments']);
		this.trackFinishAction();
	}

	onSecondaryButtonClick() {
		this.servicePaymentService.resetState();
		this.router.navigate(['app/payments/service/debt']);
		this.trackNewPaymentAction();
	}

	downloadReceipt() {
		if(this.lastServicePaymentRequest && this.requestId){
			this.subscription.add(this.receiptsService.getReceipt(this.requestId).subscribe(receipt => {
				this.pdfService.downloadPdf(receipt.data.file);
				this.trackDownloadAction();
			}));
		}
	}

	detailRequest(): void {
		this.sidenavService.open({
			title: this.translateService.instant('pages.payments.servicePayment.success.titleDetailRequest'),
			component: RequestDetailComponent,
			data: {
				id: this.requestId
			}
		});
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	private trackDownloadAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Link | Left',
			customAction: 'Download',
			customLabel: 'Descargar'
		}, '');
	}

	private trackFinishAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Button | Bottom',
			customAction: 'Click',
			customLabel: 'Terminar'
		}, '');
	}

	private trackNewPaymentAction() {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Button | Bottom',
			customAction: 'Click',
			customLabel: 'PagarNuevoSueldo'
		}, '');
	}

	private trackPageView() {
		const state: IServicePaymentFormValue = this.servicePayment.newServicePaymentFormValue;
		this.analyticsService.trackPageView({
			name: 'PagoExitoso',
			family: 'Pagos',
			subfamily: 'Servicios',
			action: 'Pagar',
		}, {
			name: 'NuevoPagoServicio',
			details: {
				transactionstep: 'Complete',
				transactioninstitution: state.service.description,
				originaccounttype: state.account.type,
				paymentamounttype: this.servicePaymentService.getAnalyticsPaymentType(state.debt.otherAmount),
				currency: state.currency
			}
		}, {
			transactioncomplete: '1',
			transactionsimulationvalue: ''
		});
	}
}
