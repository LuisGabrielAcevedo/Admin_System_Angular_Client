import { Component, OnInit, OnDestroy } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	AbstractControl,
	ValidationErrors,
	ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CURRENCIES } from 'client/app/app/constants';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { Subscription } from 'rxjs';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { AmountType, IServiceDebt, makeServiceDebt } from 'client/app/app/models';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { ModalService } from '@mcy/core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-service-payment-amount',
	templateUrl: './service-payment-amount.page.html',
	styleUrls: ['./service-payment-amount.page.scss'],
})
export class ServicePaymentAmountPage implements OnInit, OnDestroy {
	public subscription: Subscription = new Subscription();
	public amountForm: FormGroup;
	public currenciesListOption: ISelectOption[] = [];
	public amountToShow = 0;
	public debt: IServiceDebt= makeServiceDebt({});
	public amountValidators: ValidatorFn[] = [];
	constructor(
		private router: Router,
		private fb: FormBuilder,
		private servicePaymentService: ServicePaymentService,
		private modalService: ModalService,
		private translateService: TranslateService,
		private analyticsService: AnalyticsService,
		private utilsService: UtilsService,
	) {
		this.amountForm = this.fb.group({
			amount: [{ value: 0, disabled: true }],
			currencyCode: [{ value: CURRENCIES[0].code , disabled: true }],
			amountType: null
		});
	}

	ngOnInit() {
		const currencyCodeControl: AbstractControl = this.amountForm.controls.currencyCode;
		this.subscription.add(
			this.servicePaymentService.getServicePaymentState().subscribe((state) => {
				this.debt = state.newServicePaymentFormValue.debt;
				if (this.debt.otherAmount === 1 ) {
					this.amountValidators = [(c: AbstractControl) => this.greaterThanTheAmountValidator(c)]
				}
				this.updateAmountType(state.newServicePaymentFormValue.amountType);
				this.updateAmount(state.newServicePaymentFormValue.amount);
				currencyCodeControl.patchValue(
					state.newServicePaymentFormValue.currency.code
				);
			})
		);
		this.currenciesListOption = this.currenciesList;
		this.trackPageView();
	}

	get disabledAmountRadio() {
		return this.debt.otherAmount !== 1;
	}

	updateAmountType(value: AmountType | null) {
		const amountTypeControl: AbstractControl = this.amountForm.controls.amountType;
		if (value) {
			amountTypeControl.patchValue(value);
		} else {
			this.debt.otherAmount !== 1
				? amountTypeControl.patchValue(AmountType.partial)
				: amountTypeControl.patchValue(AmountType.total);
		}
	}

	updateAmount(value: number) {
		const amountControl: AbstractControl = this.amountForm.controls.amount;
		const amountTypeControl: AbstractControl = this.amountForm.controls.amountType;
		if (value) {
			amountControl.patchValue(value);
		} else {
			amountTypeControl.value === AmountType.total
				? amountControl.patchValue(this.debt.amount)
				: amountControl.patchValue(0)
		}

		if (amountTypeControl.value === AmountType.partial) {
			amountControl.enable();
		}
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	onBack() {
		this.router.navigate(['/app/payments/service/debt']);
	}

	onContinue() {
		this.updateState();
		this.router.navigate(['/app/payments/service/account']);
	}

	greaterThanTheAmountValidator(control: AbstractControl) : ValidationErrors | null {
		const valid = control.value >= this.debt.amount;
		return valid ? null : { invalidAmount: true }
	}

	get currenciesList(): ISelectOption[] {
		return CURRENCIES.map((concept) => {
			return {
				viewValue: concept.symbol,
				value: concept.code,
			};
		});
	}

	get isTotalAmount() {
		return this.amountForm.controls.amountType.value === AmountType.total;
	}

	get isPartialAmount() {
		return this.amountForm.controls.amountType.value === AmountType.partial;
	}

	updateState() {
		this.servicePaymentService.updateServicePaymentState({
			newServicePaymentFormValue: {
				...this.servicePaymentService.getServicePaymentState().value
					.newServicePaymentFormValue,
				amount: this.amountForm.getRawValue().amount || this.debt.amount,
				amountType: this.amountForm.value.amountType,
			},
		});
	}

	amountRadio() {
		this.amountForm.controls.amount.patchValue(this.debt.amount);
		this.amountForm.controls.amount.disable();
	}

	otherAmountRadio() {
		this.amountForm.controls.amount.patchValue(0);
		this.amountForm.controls.amount.enable();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onCancel() {
		this.modalService.openDialog(
			makeFlowExitModal({
				component: FlowExitModalComponent,
				title: this.translateService.instant('pages.payments.service.exitModal.title'),
				description: this.translateService.instant('pages.payments.service.exitModal.description'),
				cancel: this.translateService.instant('pages.payments.service.exitModal.cancel'),
				confirm: this.translateService.instant('pages.payments.service.exitModal.confirm'),
				onCancel: () => {},
				onConfirm: () => {
					this.goToLanding();
				}
			})
		);
	}

	private trackPageView() {
		this.analyticsService.trackPageView({
			name: 'Importedelpago',
			family: 'Pagos',
			subfamily: 'Servicios',
			action: 'Pagar',
		}, {
			name: 'NuevoPagoServicio',
			details: {
				transactionstep: '2'
			}
		}, {
			transactionstep02: '1'
		});
	}
}
