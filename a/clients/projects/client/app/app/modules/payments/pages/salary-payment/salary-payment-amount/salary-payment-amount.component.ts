import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	FormGroup,
	Validators,
	FormBuilder,
	ValidatorFn,
	AbstractControl,
	FormControl
} from '@angular/forms';
import {
	ISalaryPaymentFormValue,
	makeSalaryPaymentFormValue
} from 'client/app/app/modules/payments/models/salary-payment';
import { CURRENCIES, CONTRAINTS } from 'client/app/app/constants';
import { SalaryPaymentService } from 'client/app/app/services/salary-payment.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { REGEXP } from '@mcy/core/constants';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '@mcy/core/services/modal.service';
import { makeSalaryPaymentCancelModal } from 'client/app/app/models/modal';
import {
	SalaryPaymentCancelComponent
} from 'client/app/app/modules/payments/pages/salary-payment/cancel-modal/salary-payment-cancel.component';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-salary-payment-amount',
	templateUrl: './salary-payment-amount.component.html',
	styleUrls: ['./salary-payment-amount.component.scss']
})
export class SalaryPaymentAmountComponent implements OnInit, OnDestroy {
	public amountForm: FormGroup;
	public descriptionMaxlength = CONTRAINTS.PAYMENTS.DESCRIPTION.MAX_LENGTH;
	public amountValidators: ValidatorFn[] = [Validators.required, Validators.min(0.01)];
	public descriptionValidators: ValidatorFn[] = [
		Validators.required,
		Validators.maxLength(this.descriptionMaxlength),
		Validators.pattern(REGEXP.DESCRIPTION)
	];
	public amountLength = CONTRAINTS.PAYMENTS.AMOUNT.MAX_LENGTH;
	public descriptionMissings = this.descriptionMaxlength;
	public currenciesListOption: ISelectOption[] = [];
	public salaryPayment: ISalaryPaymentFormValue = makeSalaryPaymentFormValue(
		{}
	);
	private subscription: Subscription = new Subscription();

	constructor(
		private salaryPaymentService: SalaryPaymentService,
		private fb: FormBuilder,
		private translateService: TranslateService,
		private modalService: ModalService,
		private router: Router,
		private analyticsService: AnalyticsService
	) {
		this.amountForm = this.fb.group({
			currencyCode: new FormControl({value: CURRENCIES[0].code, disabled: true}),
			amount: [0, this.amountValidators],
			description: ['', this.descriptionValidators],
		});

		this.trackPageView();
	}

	ngOnInit() {
		this.subscription.add(
			this.salaryPaymentService.getSalaryPaymentState().subscribe(state => {
				this.salaryPayment = state.newSalaryPaymentFormValue;
				this.amountForm.get('amount')!.patchValue(this.salaryPayment.amount);
				this.amountForm.get('description')!.patchValue(this.salaryPayment.description);
			})
		);
		const descriptionControl: AbstractControl | null = this.amountForm.get(
			'description'
		);
		if (descriptionControl) {
			this.subscription.add(
				descriptionControl.valueChanges.subscribe(
					des =>
						(this.descriptionMissings = des
							? this.descriptionMaxlength - des.length
							: this.descriptionMaxlength)
				)
			);
		}
		this.currenciesListOption = this.currenciesList;
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

	continue() {
		this.salaryPaymentService.updateSalaryPaymentState({
			newSalaryPaymentFormValue: {
				...this.salaryPayment,
				amount: this.amountForm.value.amount,
				description: this.amountForm.value.description
			}
		});
		this.router.navigateByUrl('app/payments/salary/account');
	}

	back() {
		this.router.navigateByUrl('app/payments/salary/contact');
	}

	get currenciesList(): ISelectOption[] {
		return CURRENCIES.map((concept) => {
			return {
				viewValue: concept.symbol,
				value: concept.code
			};
		});
	}

	trackPageView() {
		this.analyticsService.trackPageView({
			name: 'Importe',
			family: 'Pagos',
			subfamily: 'Sueldos',
			action: 'Pagar',
		}, {
			name: 'PagoSueldos',
			details: {
				transactionstep: '3'
			}
		}, {
			transactionstep03: '1'
		});
	}
}
