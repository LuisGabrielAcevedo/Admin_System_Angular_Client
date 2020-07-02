import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { INewTransfer, makeProviderPaymentFormValue, IProviderPaymentFormValue, IRequestResponse } from 'client/app/app/models';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {
	IAccount,
	makeAccount,
	IContact,
	makeContact,
	makeProviderPaymentState,
	IProviderPaymentState,
} from 'client/app/app/models';
import format from 'date-fns/format';
import { Subscription } from 'rxjs';
import { ModalService } from '@mcy/core/services/modal.service';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';

@Component({
	templateUrl: './provider-payment-summary.page.html',
	styleUrls: ['./provider-payment-summary.page.scss']
})

export class ProviderPaymentSummaryPage implements OnInit, OnDestroy {
	public providerPayment: IProviderPaymentFormValue = makeProviderPaymentFormValue({});
	public providerPaymentState: IProviderPaymentState = makeProviderPaymentState({});
	public sourceAccount: IAccount = makeAccount({});
	public destinationContact: IContact = makeContact({});
	public providerPaymentDate: string = '';
	public subscription = new Subscription();

	constructor(
		private router: Router,
		private providerPaymentService: ProviderPaymentService,
		private modalService: ModalService,
		private translateService: TranslateService,
		private sidenavService: SidenavService,
		private softTokenService: SoftTokenService,
	) {}

	ngOnInit() {
		this.subscription.add(this.providerPaymentService.getProviderPaymentState().subscribe((providerPaymentState: IProviderPaymentState) => {
			this.providerPaymentState = providerPaymentState;
			this.sourceAccount = providerPaymentState.newProviderPaymentFormValue.sourceAccount;
			this.providerPayment = providerPaymentState.newProviderPaymentFormValue;
			this.destinationContact = providerPaymentState.newProviderPaymentFormValue.destinationContact;
			this.providerPaymentDate = format(
				new Date(providerPaymentState.newProviderPaymentFormValue.executionDate),
				'dd/MM/yyyy'
			);
		}));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	submitPayment(softToken?: string): Observable<IRequestResponse> {
		const transferFinal: INewTransfer = {
			accountType: this.providerPayment.destinationAccount.type,
			amount: this.providerPayment.amount,
			conceptCode: 'FAC',
			originCuilt: this.providerPayment.sourceAccount.cuilt,
			originCbvu: this.providerPayment.sourceAccount.cbvu,
			destinationCuilt: this.providerPayment.destinationContact.cuilt,
			destinationCbvu: this.providerPayment.destinationContact.cbvu,
			destinationHolder: this.providerPayment.destinationContact.name,
			currencyCode: this.providerPayment.currency.code
		};

		return this.providerPaymentService.submitProviderPayment(transferFinal, softToken).pipe(
			tap((res: IRequestResponse) => {
				if (res.success) {
					this.sidenavService.close();
					this.router.navigateByUrl('app/payments/provider/success');
				} else {
					const errorHandled = this.softTokenService.handleErrors(res, (token: string) => this.submitPayment(token), 'providerPayment');
					this.providerPaymentService.updateProviderPaymentState({ loadingNewPayment: false, hasNewPaymentErrors: !errorHandled });
				};
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const errorHandled = this.softTokenService.handleErrors(errorResponse.error, (token: string) => this.submitPayment(token), 'providerPayment');
				this.providerPaymentService.updateProviderPaymentState({ loadingNewPayment: false, hasNewPaymentErrors: !errorHandled });
				return of(errorResponse.error);
			})
		)
	}

	onConfirm() {
		this.subscription.add(
			this.submitPayment().subscribe()
		);
	}

	back() {
		this.router.navigate(['/app/payments/provider/account']);
	}

	get providerPaymentAmount(): number {
		return this.providerPaymentState.newProviderPaymentFormValue.amount;
	}

	backToEditDestinatary() {
		this.router.navigate(['/app/payments/provider/contact']);
	}

	backToEditBalance() {
		this.router.navigate(['/app/payments/provider/amount']);
	}

	backToEditSource() {
		this.router.navigate(['/app/payments/provider/account']);
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	onCancel() {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.payments.providers.exitModal.title'),
			description: this.translateService.instant('pages.payments.providers.exitModal.description'),
			cancel: this.translateService.instant('pages.payments.providers.exitModal.cancel'),
			confirm: this.translateService.instant('pages.payments.providers.exitModal.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				this.goToLanding();
			}
		}));
	}

	get isSidenavOpen(): boolean {
		return this.sidenavService.opened;
	}
}
