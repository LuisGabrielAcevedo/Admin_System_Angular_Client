import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import { IAccount, IAccountState, makeAccountState, IServicePaymentState, makeServicePaymentState } from 'client/app/app/models';
import { CURRENCIES } from 'client/app/app/constants';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { ModalService } from '@mcy/core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-service-payment-account',
	templateUrl: './service-payment-account.page.html',
	styleUrls: ['./service-payment-account.page.scss'],
})
export class ServicePaymentAccountPage implements OnInit, OnDestroy {
	private pageViewFired: boolean = false;
	public subscription: Subscription = new Subscription();
	public accountForm: FormGroup;
	public accounts: IAccount[] = [];
	public servicePaymentState:IServicePaymentState = makeServicePaymentState({});
	public acountState: IAccountState = makeAccountState({});

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private servicePaymentService: ServicePaymentService,
		private accountService: AccountService,
		private modalService: ModalService,
		private analyticsService: AnalyticsService,
		private translateService: TranslateService
	) {
		this.accountForm = this.fb.group({
			account: [null, Validators.required],
		});
	}

	ngOnInit() {
		this.subscription.add(this.servicePaymentService.getServicePaymentState().subscribe((state)=>{
			this.servicePaymentState = state;
			if (!this.pageViewFired) {
				this.trackPageView();
				this.pageViewFired = true;
			}
		}));
		this.accountService.findAccounts();
		this.subscription.add(
			this.accountService.getAccountState().subscribe((state) => {
				this.acountState = state;
				this.accounts = this.acountState.accounts
					.filter(account =>
						account.balance! >= this.servicePaymentState.newServicePaymentFormValue.amount
						&& account.currency.code === CURRENCIES[0].code)
			})
		);

		this.subscription.add(this.servicePaymentService.getServicePaymentState().subscribe((state) => {
			if(state.newServicePaymentFormValue.account.number) {
				this.accountForm.controls.account.patchValue(state.newServicePaymentFormValue.account);
			}
		}));
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	retryGetAccounts() {
		this.accountService.findAccounts();
	}

	onBack() {
		this.router.navigate(['/app/payments/service/amount']);
	}

	onContinue() {
		this.servicePaymentService.updateServicePaymentState({
			newServicePaymentFormValue: {
				... this.servicePaymentService.getServicePaymentState().value.newServicePaymentFormValue,
				account: this.accountForm.value.account
			}
		});
		this.router.navigate(['/app/payments/service/confirmation']);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
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

	private trackPageView() {
		this.analyticsService.trackPageView({
			name: 'DatosDelPago',
			family: 'Pagos',
			subfamily: 'Servicios',
			action: 'Pagar',
		}, {
			name: 'NuevoPagoServicio',
			details: {
				transactionstep: '3'
			}
		}, {
			transactionstep03: '1',
			transactioninstitution: this.servicePaymentState.newServicePaymentFormValue.service.description,
			originaccounttype: ''
		});
	}
}
