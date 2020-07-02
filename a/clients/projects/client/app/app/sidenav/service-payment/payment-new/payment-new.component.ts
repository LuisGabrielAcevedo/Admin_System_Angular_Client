import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { PaymentConfirmationComponent } from '../payment-confirmation/payment-confirmation.component';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { IService } from 'client/app/app/models/service';
import { IAccount } from 'client/app/app/models/account';
import { IServiceCategory } from 'client/app/app/models/service-category';
import { ISidenavData, makeSidenavClose } from 'client/app/app/models/sidenav';
import { Subscription, Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { switchMap, filter, debounceTime } from 'rxjs/operators';
import { MatStepper, MatStep } from '@angular/material';
import { Utils } from '@mcy/main/polyfills';
import { FormValidationsService } from 'client/app/app/services/form-validations.service';
import { AmountType } from 'client/app/app/models/amount-type';
import { IServiceDebt } from 'client/app/app/models/service-debt';
import { AUTOCOMPLETE_DEBOUNCE } from 'client/app/app/constants';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'client/app/app/services/account.service';

@Component({
	templateUrl: './payment-new.component.html',
	styleUrls: ['./payment-new.component.scss']
})
export class PaymentNewComponent implements OnInit, OnDestroy {
	@Input() public data: ISidenavData = {};
	@ViewChild('stepper', {static: true}) stepperRef!: MatStepper;
	@ViewChild('step1', {static: true}) step1Ref!: MatStep;
	@ViewChild('step2', {static: true}) step2Ref!: MatStep;
	public subscriptions: Subscription[] = [];
	public serviceStepForm: FormGroup;
	public paymentStepForm: FormGroup;
	public debtId: FormControl;
	public filteredServices: Observable<IService[]>  = new Observable();
	public services: IService[] = [];
	public accounts: IAccount[] = [];
	public categories: IServiceCategory[] = [];
	public currencySimbol = 'ARS';
	public serviceIdMinLength = 10;
	public pesosCode = '032';
	public debt: IServiceDebt | null = null;
	public messages: { [key: string]: any; } = {
		invalidDebtId: 'El número no es válido',
		unCoverAmountPay: 'Para realizar este pago de servicio, usted deberá usar fondos del descubierto ¿Quiere seguir con la operación?'
	};
	public unCoverAmountDialog = false;
	public otherAmountValidators: ValidatorFn[] = [Validators.required];

	constructor(
		private fb: FormBuilder,
		private formValidationsService: FormValidationsService,
		private sidenavService: SidenavService,
		private translateService: TranslateService,
		public paymentService: ServicePaymentService,
		private accountService: AccountService,
	) {
		this.serviceStepForm = this.fb.group({
			service: [null, [Validators.required, this.formValidationsService.isObject]],
			category: null
		});

		this.debtId = this.fb.control('', [Validators.required, Validators.minLength(this.serviceIdMinLength)]);

		this.paymentStepForm = this.fb.group({
			description: [{ value: null, disabled: true }, Validators.required],
			expirationDate: [{ value: null, disabled: true }, Validators.required],
			amount: [{ value: null, disabled: true }],
			otherAmount: null,
			amountType: [null, Validators.required],
			account: [null, [Validators.required]]
		});
	}

	ngOnInit() {
		this.loadAccounts();
		if (this.isEdit()) {
			this.loadCategories();
		}
		const categoryControl: AbstractControl | null = this.serviceStepForm.get('category');
		const serviceControl: AbstractControl | null = this.serviceStepForm.get('service');
		const amountTypeControl: AbstractControl | null = this.paymentStepForm.get('amountType');
		const otherAmountControl: AbstractControl | null = this.paymentStepForm.get('otherAmount');

		if (serviceControl) {
			this.filteredServices = serviceControl.valueChanges.pipe(
				filter(v => typeof v === 'string'),
				switchMap((value) => {
					const tempValue = new RegExp(value, 'gi');
					return of(this.services.filter(s => s.description.match(tempValue)));
				})
			);
			this.subscriptions.push(
				serviceControl.statusChanges.subscribe(() => {
					this.debtId.patchValue('');
				})
			);
		}

		if (categoryControl) {
			this.subscriptions.push(
				categoryControl.valueChanges.pipe(
					switchMap((value: IServiceCategory) => this.paymentService.getServices(value)))
				.subscribe(resp => {
					this.services = resp.data;
				})
			);
		}

		if (amountTypeControl && otherAmountControl) {
			this.subscriptions.push(
				amountTypeControl.valueChanges.subscribe(v => {
					otherAmountControl.setValidators(v === AmountType.total
						? []
						: [Validators.required]
					);
					otherAmountControl.updateValueAndValidity();
					if (v === AmountType.total) {
						otherAmountControl.reset();
					}
				})
			);

		}

		this.subscriptions.push(
			this.debtId.valueChanges.pipe(
				filter(value => value.length >= this.serviceIdMinLength),
				debounceTime(AUTOCOMPLETE_DEBOUNCE),
				switchMap((value) => this.paymentService.getDebt(value, serviceControl!.value.id))
			).subscribe(
				resp => {
					if (resp.success && resp.data.length) {
						this.debt = resp.data[0] as IServiceDebt;
						this.paymentStepForm.patchValue({
							...this.debt,
							amountType: this.debt.usdPayment
								? AmountType.partial
								: AmountType.total,
							otherAmount: null,
							account: null,
							expirationDate: '04 DIC 2019'
						});
					} else {
						this.debt = null;
						this.debtId.setErrors({invalidDebtId: true});
						this.debtId.markAllAsTouched();
					}
				}
			)
		);

		if (this.data && this.data.payment) {
			this.paymentStepForm.patchValue({
				...this.data.payment.debt,
				otherAmount: this.data.payment.otherAmount,
				amountType: this.data.payment.otherAmount
					? AmountType.partial
					: AmountType.total,
				account: this.data.payment.account,
				expirationDate: '04 DIC 2019'
			});
			this.serviceStepForm.patchValue(this.data.payment, {emitEvent: false});
			this.debtId.patchValue(this.data.payment.debtId, {emitEvent: false});
			this.debt = this.data.payment.debt || null;
			this.step1Ref.completed = true;
			this.step2Ref.completed = true;
			this.stepperRef.selectedIndex = 2;
		}
	}

	loadAccounts() {
		this.accountService.findAccounts();
		this.subscriptions.push(this.accountService.getAccountState().subscribe(state => {
			this.accounts = state.accounts.filter(
				account => account.currency.code === this.pesosCode
			);
		}));
	}

	loadCategories() {
		this.subscriptions.push(this.paymentService.getCategories().subscribe(resp => {
			this.categories = resp.data;
		}));
	}

	validateAccount() {
		const accountControl: AbstractControl | null = this.paymentStepForm.get('account');
		const otherAmountControl: AbstractControl | null = this.paymentStepForm.get('otherAmount');
		if (accountControl && otherAmountControl  && this.debt) {
			const account: IAccount = accountControl.value;
			const amount = otherAmountControl.value ? Number(otherAmountControl.value) : this.debt.amount;

			let balance = 0;

			// TODO potential bug! review, balance can be null!
			if (account.balance) {
				balance = account.balance;
			}

			if (account && amount > balance && account.uncoverBalance) {
				this.unCoverAmountDialog = true;
			}
		}
	}

	displayServiceDescription(item?: IService): string  {
		return item ? item.description : '';
	}

	displayServiceHint(): string {
		const control: AbstractControl | null = this.paymentStepForm.get('service');
		return control && control.valid
			? '(¡Ya puedes continuar!)'
			: '(Ej: Aysa)';
	}

	displayDebtHint(): string {
		return this.debtId.valid && this.debt
			? '(¡Ya puedes continuar!)'
			: '';
	}

	displayDebtIdErrors(): string {
		return this.debtId.errors ? this.messages[Object.keys(this.debtId.errors)[0]] : '';
	}

	compareCategories(category1: IServiceCategory, category2: IServiceCategory): boolean {
		return Utils.compareField('description', category1, category2);
	}

	isOtherAmount(): boolean | null {
		const control: AbstractControl | null = this.paymentStepForm.get('amountType');
		return control && control.value === AmountType.partial;
	}

	continue() {
		this.validateAccount();
		if (!this.unCoverAmountDialog) {
			this.nextStep();
		}
	}

	nextStep() {
		this.sidenavService.nextStep({
			title: 'Pagar servicio',
			component: PaymentConfirmationComponent,
			data: {
				edit: this.data && this.data.edit,
				payment: {
					... this.serviceStepForm.value,
					... this.paymentStepForm.getRawValue(),
					debtId: this.debtId.value,
					debt: this.debt
				}
			},
			closeAction: makeSidenavClose({
				text: this.translateService.instant('pages.payments.sidenavCancel.message'),
				cancelText: this.translateService.instant('common.cancel'),
				confirmText: this.translateService.instant('common.ok')
			})
		});
	}

	cancel() {
		this.unCoverAmountDialog = false;
	}
	isEdit(): boolean {
		return !this.data || (this.data && !this.data.edit);
	}

	isStep1Edit(): boolean {
		return this.isEdit() && this.step1Ref.completed && this.stepperRef.selectedIndex !== 0;
	}

	isStep2Edit(): boolean {
		return this.isEdit() && this.step2Ref.completed && this.stepperRef.selectedIndex !== 1;
	}

	isStep1CompletedLabel(): boolean {
		return this.step1Ref.completed && this.stepperRef.selectedIndex !== 0 && this.serviceStepForm.valid;
	}

	isStep2CompletedLabel(): boolean {
		return this.step2Ref.completed && this.stepperRef.selectedIndex !== 1 && this.debtId.valid;
	}

	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
}

