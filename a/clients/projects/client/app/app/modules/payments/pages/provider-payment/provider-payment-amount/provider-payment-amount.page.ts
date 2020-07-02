import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CONTRAINTS, CURRENCIES } from 'client/app/app/constants';
import { REGEXP } from '@mcy/core/constants';
import { ISelectOption } from '@mcy/core/components/select/select.component';
import { Subscription } from 'rxjs';
import { ProviderPaymentService } from 'client/app/app/services/provider-payment.service';
import { IProviderPaymentState, makeProviderPaymentState, makeProviderPaymentFormValue } from 'client/app/app/models/provider-payment';
import { ModalService } from '@mcy/core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { makeAccount } from 'client/app/app/models';

@Component({
	templateUrl: './provider-payment-amount.page.html',
	styleUrls: ['./provider-payment-amount.page.scss']
})
export class ProviderPaymentAmountPage implements OnInit, OnDestroy  {
	public subscription: Subscription = new Subscription();
	public complete: boolean = false;
	public amountForm: FormGroup;
	public balanceValidators: ValidatorFn[] = [Validators.required, Validators.min(0.01)];
	public currencyValidators: ValidatorFn[] = [Validators.required];
	public descriptionValidators: ValidatorFn[] = [
		Validators.maxLength(CONTRAINTS.TRANSFER.REFERENCE.MAX_LENGTH),
		Validators.pattern(REGEXP.DESCRIPTION)
	];
	public descriptionMaxlength = CONTRAINTS.TRANSFER.REFERENCE.MAX_LENGTH;
	public currenciesListOption: ISelectOption[] = [];
	public providerPaymentState: IProviderPaymentState = makeProviderPaymentState({});

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private providerPaymentService: ProviderPaymentService,
		private modalService: ModalService,
		private translateService: TranslateService,
	) {
		this.amountForm = this.fb.group({
			amount: [0, this.balanceValidators],
			currency: [null, this.currencyValidators],
			currencyCode: [null, this.currencyValidators],
			description: ['', this.descriptionValidators]
		});
	}

	ngOnInit() {
		this.subscription.add(this.providerPaymentService.getProviderPaymentState().subscribe((providerPaymentState: IProviderPaymentState) => {
			this.providerPaymentState = providerPaymentState;
			this.amountForm.get('amount')!.patchValue(this.providerPaymentState.newProviderPaymentFormValue.amount);
			this.amountForm.get('description')!.patchValue(this.providerPaymentState.newProviderPaymentFormValue.paymentDescription);
			this.currenciesListOption = this.currenciesList;
			if (this.providerPaymentState.newProviderPaymentFormValue.currency.code.length) {
				this.amountForm.get('currencyCode')!.patchValue(this.providerPaymentState.newProviderPaymentFormValue.currency.code);
				this.amountForm.get('currency')!.patchValue(this.providerPaymentState.newProviderPaymentFormValue.currency);
			} else {
				this.amountForm.get('currencyCode')!.patchValue(CURRENCIES[0].code);
				this.amountForm.get('currency')!.patchValue(CURRENCIES[0]);
			}
		}));
	}

	get descriptionMissings(): number {
		const { description } = this.amountForm.value;
		return description
			? this.descriptionMaxlength - description.length
			: this.descriptionMaxlength
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get currenciesList(): ISelectOption[] {
		return CURRENCIES.map((concept) => {
			return {
				viewValue: concept.symbol,
				value: concept.code
			};
		});
	}

	back() {
		this.router.navigate(['/app/payments/provider/contact']);
	}

	next() {
		const providerPaymentState = makeProviderPaymentState({
			...this.providerPaymentState,
			newProviderPaymentFormValue: makeProviderPaymentFormValue({
				...this.providerPaymentState.newProviderPaymentFormValue,
				amount: this.amountForm.value.amount,
				currency: this.amountForm.value.currency,
				paymentDescription: this.amountForm.value.description,
				sourceAccount: makeAccount({})
			})
		});
		this.providerPaymentService.updateProviderPaymentState(providerPaymentState);
		this.router.navigate(['/app/payments/provider/account']);
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	currencyChange() {
		const value = CURRENCIES.find((currency) => {
			return currency.code === this.amountForm.value.currencyCode
		});
		this.amountForm.get('currency')!.patchValue(value);
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
}
