import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAccount, IAccountState, makeAccountState } from 'client/app/app/models';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { ISalaryPaymentFormValue, makeSalaryPaymentFormValue } from 'client/app/app/modules/payments/models/salary-payment';
import { Router } from '@angular/router';
import { UncoverComponent } from './uncover-modal/uncover-modal.component';
import { makeUncoverAmountModal } from 'client/app/app/models/modal';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'client/app/app/services/account.service';
import { ModalService } from '@mcy/core/services/modal.service';
import { CONTRAINTS } from 'client/app/app/constants';
import { makeSalaryPaymentCancelModal } from 'client/app/app/models/modal';
import {
	SalaryPaymentCancelComponent
} from 'client/app/app/modules/payments/pages/salary-payment/cancel-modal/salary-payment-cancel.component';
import { TranslateService } from '@ngx-translate/core';
import {
	MAX_DATE_PLUS
} from 'client/app/app/constants';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-salary-payment-account',
	templateUrl: './salary-payment-account.component.html',
	styleUrls: ['./salary-payment-account.component.scss']
})
export class SalaryPaymentAccountComponent implements OnInit, OnDestroy {
	public accounts: IAccount[] = [];
	public accountsState: IAccountState = makeAccountState({});
	public accountForm: FormGroup;
	public salaryPayment: ISalaryPaymentFormValue = makeSalaryPaymentFormValue({});
	public dateValidators: ValidatorFn[] = [Validators.required];
	private subscription: Subscription = new Subscription();
	public pesosCode = '032';
	public moment = CONTRAINTS.PAYMENTS.SALARY.ACCOUNTS.INSTANT;
	public maxDate = MAX_DATE_PLUS;
	public minDate = new Date() ;
	constructor(
		private salaryPaymentService: SalaryPaymentService,
		private accountService: AccountService,
		private translateService: TranslateService,
		private modalService: ModalService,
		private fb: FormBuilder,
		private router: Router,
		private analyticsService: AnalyticsService
	) {
		this.accountForm = this.fb.group({
			account: [null, Validators.required],
			momentExecution:  new FormControl('', Validators.required),
			date:  new FormControl('', Validators.required)
		});
		this.trackPageView();
	}

	ngOnInit() {
		this.accountService.findAccounts();
		this.loadAccounts();
		this.subscription.add(
			this.salaryPaymentService.getSalaryPaymentState().subscribe(state => {
				this.salaryPayment = state.newSalaryPaymentFormValue;
				const account = this.salaryPayment.account
				if (account && account.number.length) {
					this.accountForm.get('account')!.patchValue(account);
				} else {
					this.filterAccounts();
				}				
			})
		);
		this.momentExecutionChange();
	}

	momentExecutionChange(){
		const momentExecutionControl: AbstractControl | null = this.accountForm.get(
			'momentExecution'
		);
		if(momentExecutionControl){
			this.subscription.add(
				momentExecutionControl.valueChanges.subscribe((momentChange: string)=>{
					this.moment = momentChange;
					if (momentChange === CONTRAINTS.PAYMENTS.SALARY.ACCOUNTS.INSTANT){
						this.accountForm.patchValue({
							date:new Date(),
						});

					}else{
						this.accountForm.patchValue({
							date: null,
						});
					}
				})
			);
		}

	}

	get programmed(){
		return this.moment === CONTRAINTS.PAYMENTS.SALARY.ACCOUNTS.PROGRAMMED;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
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

	loadAccounts() {
		this.subscription.add(
			this.accountService.getAccountState()
				.subscribe(state => {
						this.accountsState = state;
						this.filterAccounts();				
				})
		)
	}

	filterAccounts() {
		this.accounts = this.accountsState.accounts.filter(account =>
			(account.currency.code === this.pesosCode) &&
			(account.balance! > this.salaryPayment.amount)
		)
	}

	continue() {
		this.salaryPayment = {
			... this.salaryPayment,
			account: this.accountForm.value.account,
			date: this.programmed ? this.accountForm.getRawValue().date: null,
			momentExecution:  this.accountForm.value.momentExecution
		};
		this.salaryPaymentService.updateSalaryPaymentState({
			newSalaryPaymentFormValue: this.salaryPayment
		});
		if (!this.validatePayment()) {
			this.router.navigateByUrl('app/payments/salary/confirmation');
		} else {
			this.openUncoverAmountModal();
		}
	}

	openUncoverAmountModal() {
		this.modalService.openDialog(makeUncoverAmountModal({
			component: UncoverComponent,
			onCancel: () => {},
			onConfirm: () => {
				this.router.navigateByUrl('app/payments/salary/confirmation');
			}
		}));
	}

	validatePayment() {
		if (this.salaryPayment.amount && this.salaryPayment.account) {
			if (this.salaryPayment.account.balance) {
				return this.salaryPayment.amount > this.salaryPayment.account.balance;
			}

			// TODO potential bug! review, balance can be null!
			return false;
		} else {
			return true;
		}
	}

	back() {
		this.router.navigateByUrl('app/payments/salary/amount');
	}

	trackPageView() {
		this.analyticsService.trackPageView({
			name: 'Origen',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: '4'
			}
		}, {
			transactionstep04: '1'
		});
	}
}
