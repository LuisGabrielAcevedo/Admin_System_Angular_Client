import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISalaryPaymentFormValue, makeSalaryPaymentFormValue, ISalaryPaymentState, makeSalaryPaymentState } from 'client/app/app/modules/payments/models/salary-payment';
import { Router } from '@angular/router';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { Subscription, Observable, of } from 'rxjs';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { AccountType } from 'client/app/app/models/account';
import { INewTransfer, ICurrency, IRequestResponse } from 'client/app/app/models';
import { tap, catchError } from 'rxjs/operators';
import format from 'date-fns/format';
import { CURRENCIES } from 'client/app/app/constants';
import { SoftTokenService } from 'client/app/app/services/soft-token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnalyticsService } from '@mcy/main/services/analytics.service';
import { makeSalaryPaymentCancelModal } from 'client/app/app/models/modal';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { SalaryPaymentCancelComponent } from 'client/app/app/modules/payments/pages/salary-payment/cancel-modal/salary-payment-cancel.component';

@Component({
	selector: 'mcy-salary-payment-confirm',
	templateUrl: './salary-payment-confirm.component.html',
	styleUrls: ['./salary-payment-confirm.component.scss']
})
export class SalaryPaymentConfirmComponent implements OnInit, OnDestroy {
	public salaryPayment: ISalaryPaymentFormValue = makeSalaryPaymentFormValue({});
	public subscription = new Subscription();
	public salaryPaymentState: ISalaryPaymentState = makeSalaryPaymentState({});

	constructor(
		private salaryPaymentService: SalaryPaymentService,
		private sidenavService: SidenavService,
		private softTokenService: SoftTokenService,
		private router: Router,
		private analyticsService: AnalyticsService,
		private translateService: TranslateService,
		private modalService: ModalService,
	) {}

	ngOnInit() {
		this.subscription.add(this.salaryPaymentService.getSalaryPaymentState().subscribe( state => {
			this.salaryPaymentState = state;
			this.salaryPayment = state.newSalaryPaymentFormValue;
			this.checkSalaryPayment();
		}));
		this.trackPageView();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	checkSalaryPayment() {
		if (!this.salaryPayment.contact.id) {
			this.goToContact();
		}
	}

	formatDate(date: Date){
		if(date){
			return format(date, 'dd/MM/yyyy');
		} else {
			return null;
		}
	}

	get isSidenavOpen(): boolean {
		return this.sidenavService.opened;
	}

	formattedAccountType(type: AccountType) {
		return type;
	}

	goToAccount() {
		this.trackEditAction('EditarOrigen');
		this.router.navigateByUrl('app/payments/salary/account');
	}

	goToAmount() {
		this.trackEditAction('EditarImporte');
		this.router.navigateByUrl('app/payments/salary/amount');
	}

	goToContact() {
		this.trackEditAction('EditarDestinatario');
		this.router.navigateByUrl('app/payments/salary/contact');
	}

	goToLanding() {
		this.modalService.openDialog(makeSalaryPaymentCancelModal({
			component: SalaryPaymentCancelComponent,
			title: this.translateService.instant('pages.payments.salaryPaymentCancel'),
			cancel: this.translateService.instant('pages.payments.backToSalaryPayment'),
			confirm: this.translateService.instant('pages.payments.paymentCancel'),
			onCancel: () => { },
			onConfirm: () => {
				this.router.navigateByUrl('app/payments');
			}
		}));
	}

	confirm() {
		this.subscription.add(this.submitPayment().subscribe())
	}

	get defaultAccountType(): AccountType {
		return 'CC';
	}

	get defaultCurrency(): ICurrency {
		return CURRENCIES.filter(currency => currency.symbol === 'ARS')[0];
	}

	trackSoftTokenView(): void {
		const account = this.salaryPayment.account;
		this.analyticsService.trackPageView({
			name: 'Validación',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: 'Checkout',
				originaccounttype: account? account.type : '',
				currency: account? account.currency.symbol : ''
			}
		}, {
			transactioncheckout: '1',
			transactionsimulationvalue: ''
		});
	}

	submitPayment(softToken?: string): Observable<IRequestResponse | null> {

		const paymentFinal: INewTransfer = {
			accountType: this.defaultAccountType,
			conceptCode: 'HAB',
			amount: this.salaryPayment.amount,
			originCuilt: this.salaryPayment.account!.cuilt,
			originCbvu: this.salaryPayment.account!.cbvu,
			destinationCuilt: this.salaryPayment.contact.cuilt,
			destinationCbvu: this.salaryPayment.contact.cbvu,
			destinationHolder: this.salaryPayment.contact.name,
			currencyCode: this.defaultCurrency.code,
			description: this.salaryPayment.description
		};

		if (this.salaryPayment.date) {
			paymentFinal.scheduledDate = this.salaryPayment.date;
		}

		return this.salaryPaymentService.paySalary(paymentFinal, softToken).pipe(
			tap(res => {
				if (res.success) {
					this.sidenavService.close();
					this.router.navigateByUrl('app/payments/salary/success');
				} else {
					const errorHandled = this.softTokenService.handleErrors(
						res,
						(token: string) => this.submitPayment(token),
						'salaryPayment',
						() => { this.trackSoftTokenView() }
					);
					this.salaryPaymentService.updateSalaryPaymentState({ loadingNewPayment: false, hasNewPaymentErrors: !errorHandled });
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const errorHandled = this.softTokenService.handleErrors(errorResponse.error, (token: string) => this.submitPayment(token), 'salaryPayment');
				this.salaryPaymentService.updateSalaryPaymentState({ loadingNewPayment: false, hasNewPaymentErrors: !errorHandled });
				return of(errorResponse.error);
			})
		);
	}

	trackEditAction(label: string) {
		this.analyticsService.trackEvent({
			customCategory: 'Body | Image | Center',
			customAction: 'Click',
			customLabel: label
		}, 'PagoSueldos');
	}

	trackPageView() {
		this.analyticsService.trackPageView({
			name: 'Confirmación',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: '5',
				originaccounttype: this.defaultAccountType,
				currency: this.defaultCurrency.symbol
			}
		}, {
			transactionstep05: '1',
			transactionsimulationvalue: ''
		});
	}
}
