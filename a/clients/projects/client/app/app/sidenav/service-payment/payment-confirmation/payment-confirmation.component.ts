import { Component, Input, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { PaymentReceiptComponent } from '../payment-receipt/payment-receipt.component';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { ISidenavData } from 'client/app/app/models/sidenav';
import { makeServicePayment } from 'client/app/app/models/service-payment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IServicePayment } from 'client/app/app/models';
import { IRequestResponse } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { STATUS_REQUEST } from 'client/app/app/constants';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-payment-confirmation',
	templateUrl: './payment-confirmation.component.html',
	styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnDestroy {
	@Input() public data: ISidenavData = {};
	softTokenForm: FormGroup;
	public subscription = new Subscription();
	
	constructor(
		public sidenavService: SidenavService,
		private paymentService: ServicePaymentService,
		private fb: FormBuilder,
		private translateService: TranslateService
	) {
		this.softTokenForm = this.fb.group({
			softToken: ''
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	nextStep() {
		const payment: IServicePayment = makeServicePayment({
			banelcoClientId: this.data.payment.debtId,
			usdPayment: this.data.payment.debt.usdPayment,
			amount: this.data.payment.amount,
			service: {
				id: this.data.payment.service.id,
				description: this.data.payment.service.description
			},
			category: {
				id: this.data.payment.category.id,
				description: this.data.payment.category.description
			},
			invoiceId: this.data.payment.debt.invoiceId,
			otherAmount: this.data.payment.otherAmount || -1,
			account: {
				number: this.data.payment.account.number,
				type: this.data.payment.account.type
			},
			currency: this.data.payment.account.currency
		})

		this.subscription.add(
			this.paymentService.requestPaymentService(payment, this.softTokenForm.value.softToken)
				.subscribe((resp : IRequestResponse) => {
					if (resp.success) {
						this.sidenavService.nextStep({
							title: this.getTitle(resp.data.state),
							component: PaymentReceiptComponent,
							data: {
								requestServicePayment: resp.data
							}
						});
					}else{
					}
				})
		);
	}

	getTitle(state: string){
		switch (state){
			case STATUS_REQUEST.AUTHORIZED :
				return this.translateService.instant('pages.payments.servicePayment.success.title.authorized');

			case STATUS_REQUEST.PENDING_APPROVAL :
				return this.translateService.instant('pages.payments.servicePayment.success.title.pendingApproval');

			case STATUS_REQUEST.PARTIALLY_AUTHORIZED :
				return this.translateService.instant('pages.payments.servicePayment.success.title.PartiallyAuthorized');

			case STATUS_REQUEST.REJECTED :
				return this.translateService.instant('pages.payments.servicePayment.success.title.rejected');
			default:
				return ''
		}
	}
}
