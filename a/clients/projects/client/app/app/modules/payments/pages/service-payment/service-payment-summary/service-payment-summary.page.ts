import { Component, OnInit } from '@angular/core';
import {
	IServicePaymentState,
	makeServicePaymentState,
	makeServicePaymentFormValue,
	IServicePaymentFormValue,
	IService,
	IServiceCategory,
	IRequestResponse,
} from 'client/app/app/models';
import { AccountType, makeAccount } from 'client/app/app/models/account';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { Subscription, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IServicePayment, makeServicePayment } from 'client/app/app/models/service-payment';
import { tap, catchError } from 'rxjs/operators';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { ModalService } from '@mcy/core/services/modal.service';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-service-payment-summary',
	templateUrl: './service-payment-summary.page.html',
	styleUrls: ['./service-payment-summary.page.scss'],
})
export class ServicePaymentSummaryPage implements OnInit {
	private pageViewFired: boolean = false;

	public categoryDescription : string = '';
	public serviceDescription: string = '';
	public servicePaymentState: IServicePaymentState = makeServicePaymentState({});
	public subscription = new Subscription();
	public services : IService[] = [];
	public serviceCategory : IServiceCategory[] = [];
	public lastServicePayment: IServicePaymentFormValue = makeServicePaymentFormValue({});

	constructor(
		private servicePaymentService: ServicePaymentService,
		private router: Router,
		private translateService: TranslateService,
		private modalService: ModalService,
		private softTokenService: SoftTokenService,
		private analyticsService: AnalyticsService,
		private sidenavService: SidenavService,
	){}

	ngOnInit() {
		this.getServicePaymentState();
	}

	formattedAccountType(type: AccountType) {
		return type;
	}

	getServicePaymentState() {
		this.subscription.add(
			this.servicePaymentService.getServicePaymentState()
			.subscribe((servicePaymentState: IServicePaymentState) => {
				this.lastServicePayment	= servicePaymentState.newServicePaymentFormValue;
				this.servicePaymentState = servicePaymentState;
				if (!this.pageViewFired) {
					this.trackPageView();
					this.pageViewFired = true;
				}
			})
		);
	}

	onServicePaymentClick(): void {
		this.subscription.add(
			this.submitPayment().subscribe()
		);
	}

	submitPayment(softToken?: string): Observable<IRequestResponse> {
		const servicePaymentFinal: IServicePayment = makeServicePayment({
			banelcoClientId: this.servicePaymentState.newServicePaymentFormValue.debt.banelcoClientId,
			usdPayment: this.servicePaymentState.newServicePaymentFormValue.debt.usdPayment,
			amount: this.servicePaymentState.newServicePaymentFormValue.debt.amount,
			service: {
				id: this.servicePaymentState.newServicePaymentFormValue.service.id,
				description: this.servicePaymentState.newServicePaymentFormValue.service.description
			},
			category: {
				id: this.servicePaymentState.newServicePaymentFormValue.category.id,
				description: this.servicePaymentState.newServicePaymentFormValue.category.description
			},
			invoiceId:  this.servicePaymentState.newServicePaymentFormValue.debt.invoiceId,
			otherAmount:  this.servicePaymentState.newServicePaymentFormValue.debt.otherAmount,
			account: {
				number:  this.servicePaymentState.newServicePaymentFormValue.account.number,
				type: this.servicePaymentState.newServicePaymentFormValue.account.type
			},
			currency: this.servicePaymentState.newServicePaymentFormValue.account.currency
		})
		return this.servicePaymentService.submitRequestPaymentService(servicePaymentFinal, softToken).pipe(
			tap((response) => {
				if (response.success) {
					this.router.navigateByUrl('app/payments/service/success');
				} else {
					const errorHandled = this.softTokenService.handleErrors(
						response,
						(token: string) => this.submitPayment(token),
						'servicePayment',
						() => { this.trackSoftTokenPageView() }
					);
					this.servicePaymentService.updateServicePaymentState({ loading: false, hasServicePaymentErrors: !errorHandled });
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const errorHandled = this.softTokenService.handleErrors(errorResponse.error, (token: string) => this.submitPayment(token), 'servicePayment');
				this.servicePaymentService.updateServicePaymentState({ loading: false, hasServicePaymentErrors: !errorHandled });
				return of(errorResponse.error);
			})
		);
	}

	backToEditService() {
		this.clearServicePaymentState();
		this.router.navigate(['/app/payments/service/debt']);
	}

	backToEditAmount() {
		this.clearAcountState();
		this.router.navigate(['/app/payments/service/amount']);
	}

	backToEditAccount() {
		this.router.navigate(['/app/payments/service/account']);
	}

	clearAcountState() {
		this.servicePaymentService.updateServicePaymentState({
			newServicePaymentFormValue: {
				... this.servicePaymentService.getServicePaymentState().value.newServicePaymentFormValue,
				account: makeAccount({})
			}
		});
	}

	clearServicePaymentState() {
		this.servicePaymentService.updateServicePaymentState(makeServicePaymentState({}));
	}

	goToLanding(){
		this.router.navigate(['/app/payments']);
	}

	onCancel() {
		this.modalService.openDialog(makeFlowExitModal({
			component: FlowExitModalComponent,
			title: this.translateService.instant('pages.payments.service.exitModal.title'),
			description: this.translateService.instant('pages.payments.service.exitModal.description'),
			cancel: this.translateService.instant('pages.payments.service.exitModal.cancel'),
			confirm: this.translateService.instant('pages.payments.service.exitModal.confirm'),
			onCancel: () => {},
			onConfirm: () => {
				this.goToLanding();
			}
		}));
	}

	get isSidenavOpen(): boolean {
		return this.sidenavService && this.sidenavService.opened;
	}

	private trackPageView() {
		const state: IServicePaymentFormValue = this.servicePaymentState.newServicePaymentFormValue;
		this.analyticsService.trackPageView({
			name: 'ConfirmarPagoServicio',
			family: 'Pagos',
			subfamily: 'Servicios',
			action: 'Pagar',
		}, {
			name: 'NuevoPagoServicio',
			details: {
				transactionstep: '4',
				transactioninstitution: state.service.description,
				originaccounttype: state.account.type,
				paymentamounttype: this.servicePaymentService.getAnalyticsPaymentType(state.debt.otherAmount),
				currency: state.currency
			}
		}, {
			transactionstep04: '1',
			transactionsimulationvalue: ''
		});
	}

	private trackSoftTokenPageView() {
		const state: IServicePaymentFormValue = this.servicePaymentState.newServicePaymentFormValue;
		this.analyticsService.trackPageView({
			name: 'ValidarPagoServicio',
			family: 'Pagos',
			subfamily: 'Servicios',
			action: 'Pagar',
		}, {
			name: 'NuevoPagoServicio',
			details: {
				transactionstep: 'Checkout',
				transactioninstitution: state.service.description,
				originaccounttype: state.account.type,
				paymentamounttype: this.servicePaymentService.getAnalyticsPaymentType(state.debt.otherAmount),
				currency: state.currency
			}
		}, {
			transactioncheckout: '1',
			transactionsimulationvalue: ''
		});
	}
}
