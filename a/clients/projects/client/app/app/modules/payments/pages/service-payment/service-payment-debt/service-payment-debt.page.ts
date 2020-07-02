import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormGroup,
	FormBuilder,
	ValidatorFn,
	Validators,
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors
} from '@angular/forms';
import {
	IService,
	IServiceCategory,
	IServiceDebt,
	IServiceState,
	makeServiceState,
	makeServiceCategoryState,
	IServiceCategoryState,
	makeServicePaymentState,
	IServicePaymentState } from 'client/app/app/models';
import { Subscription, timer, of } from 'rxjs';
import { ServiceCategoryService } from 'client/app/app/services/service-category.service';
import { switchMap, map, finalize, tap, catchError } from 'rxjs/operators';
import { ServiceService } from 'client/app/app/services/service.service';
import { IsObjectValidator } from 'client/app/app/validators/object.validator';
import { CONTRAINTS, AUTOCOMPLETE_DEBOUNCE } from 'client/app/app/constants';
import { ServiceDebtService } from 'client/app/app/services/service-debt.service';
import { ServicePaymentService } from 'client/app/app/services/service-payment.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { makeFlowExitModal } from 'client/app/signup/models/modal';
import { ModalService } from '@mcy/core/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { FlowExitModalComponent } from '@mcy/core/components/flow-exit-modal/flow-exit-modal.component';
import { IValidatorMessage } from '@mcy/main/components/input/input.component';
import { AnalyticsService } from '@mcy/main/services/analytics.service';

@Component({
	selector: 'mcy-service-payment-debt',
	templateUrl: './service-payment-debt.page.html',
	styleUrls: ['./service-payment-debt.page.scss'],
})
export class ServicePaymentDebtPage implements OnInit, OnDestroy {
	public debtForm: FormGroup = new FormGroup({});
	public categoryValidators: ValidatorFn[] = [Validators.required, IsObjectValidator.valid];
	public serviceValidators: ValidatorFn[] = [Validators.required, IsObjectValidator.valid];
	public debtIdMinLength = CONTRAINTS.PAYMENTS.SERVICE.DEBT_ID.MIN_LENGTH;
	public debtIdMaxlength = CONTRAINTS.PAYMENTS.SERVICE.DEBT_ID.MAX_LENGTH;
	public debtValidators: ValidatorFn[] = [
		Validators.required,
		Validators.minLength(this.debtIdMinLength),
		Validators.maxLength(this.debtIdMaxlength)
	];
	public banelcoIdValidators = [ Validators.required ];
	public debtAsyncValidators: AsyncValidatorFn[] = [];
	public filteredServices: IService[] = [];
	public filteredCategories: IServiceCategory[] = [];
	public subscription: Subscription = new Subscription();
	public debt: IServiceDebt | null = null;
	public serviceState: IServiceState = makeServiceState({});
	public serviceCategoryState: IServiceCategoryState = makeServiceCategoryState({});
	public servicePaymentState: IServicePaymentState = makeServicePaymentState({});
	private previousDebtIdValue = '';
	private previousDebtIdResult: ValidationErrors | null = null;
	public asyncDebtIdLoading = false;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private categoryService: ServiceCategoryService,
		private serviceService: ServiceService,
		private debtService: ServiceDebtService,
		private servicePaymentService: ServicePaymentService,
		private modalService: ModalService,
		private analyticsService: AnalyticsService,
		private translateService: TranslateService
	) {}

	ngOnInit() {
		this.debtForm = this.fb.group({
			category: [{value: null, disabled: true }, this.categoryValidators],
			service: [{value: null, disabled: true }, this.serviceValidators],
			banelcoClientId: [{ value: null, disabled: true }, this.banelcoIdValidators]
		});

		const categoryControl: AbstractControl = this.debtForm.controls.category;
		const serviceControl: AbstractControl = this.debtForm.controls.service;
		const banelcoClientIdControl: AbstractControl  = this.debtForm.controls.banelcoClientId;

		this.subscription.add(
			this.servicePaymentService.getServicePaymentState().subscribe(state => {
				this.servicePaymentState = state;
				this.debtAsyncValidators = this.servicePaymentState.newServicePaymentFormValue.fromDebts
					? []
					: [this.asycnBanelcoClientIdValidator()];
				if (this.servicePaymentState.newServicePaymentFormValue.banelcoClientId) {
					categoryControl.patchValue(state.newServicePaymentFormValue.category, {emitEvent: false});
					serviceControl.patchValue(state.newServicePaymentFormValue.service, {emitEvent: false});
					banelcoClientIdControl.patchValue(state.newServicePaymentFormValue.banelcoClientId);
					this.debt = state.newServicePaymentFormValue.debt;
					if (!this.servicePaymentState.newServicePaymentFormValue.fromDebts) {
						serviceControl.enable();
						banelcoClientIdControl.enable();
					}
				}
			})
		);

		this.subscription.add(
			this.categoryService.getServiceCategoryState().subscribe((state) => {
				this.serviceCategoryState = state;
				if (!state.searchedCategories && !this.serviceCategoryState.loading) {
					this.categoryService.findServiceCategories();
				} else {
					if (this.serviceCategoryState.categories.length && !this.servicePaymentState.newServicePaymentFormValue.fromDebts) {
						categoryControl.enable();
					}
				}
			})
		);

		this.subscription.add(
			this.serviceService.getServiceState().subscribe((state) => {
				this.serviceState = state;
				this.filteredServices = this.serviceState.services;
				if (this.serviceState.searchedServices) {
					serviceControl.enable();
				}
			})
		);

		this.trackPageView();
	}

	get showHint() {
		return this.debtForm.controls.banelcoClientId.errors && !this.debtForm.controls.banelcoClientId.errors.pattern
	}

	asycnBanelcoClientIdValidator(): AsyncValidatorFn {
		let error = false;
		return (control: AbstractControl) => {
			const serviceControl: AbstractControl = this.debtForm.controls.service;
			const serviceId: string = serviceControl.value.id;
			if (control.value !== this.previousDebtIdValue) {
				return timer(AUTOCOMPLETE_DEBOUNCE).pipe(
					tap(() => this.asyncDebtIdLoading = true ),
					switchMap(() => this.debtService.getServiceDebt(control.value, serviceId).pipe(
						map(resp => {
							if (resp.success && resp.data.length) {
								this.debt = resp.data[0];
								this.previousDebtIdResult = null;
								return null;
							} else {
								error = true;
								this.previousDebtIdResult = { pattern: true };
								return  { pattern: true };
							};
						}),
						catchError(() => {
							error = true;
							this.previousDebtIdResult = { pattern: true };
							return of({ pattern: true });
						}),
						finalize(() => {
							this.asyncDebtIdLoading = false;
							this.previousDebtIdValue = control.value;
							control.patchValue(control.value);
							if (!error) {
								control.updateValueAndValidity();
								control.markAllAsTouched();
							}
						})
					))
				)
			} else {
				return of(this.previousDebtIdResult)
			}
		};
	}

	goToLanding() {
		this.router.navigate(['/app/payments']);
	}

	onBack() {
		this.router.navigate(['/app/payments']);
	}

	onContinue() {
		this.servicePaymentService.updateServicePaymentState({
			newServicePaymentFormValue: {
				... this.servicePaymentService.getServicePaymentState().value.newServicePaymentFormValue,
				service: this.debtForm.value.service,
				category: this.debtForm.value.category,
				debt: this.debt!,
				banelcoClientId: this.debtForm.value.banelcoClientId,
				currency: this.debt!.currency
			}
		});
		this.router.navigate(['/app/payments/service/amount']);
	}

	displayServiceDescription(item?: IService): string {
		return item ? item.description : '';
	}

	displayCategoryDescription(item?: IServiceCategory): string {
		return item ? item.description : '';
	}

	searchFilteredCategories(value: string | IServiceCategory) {
		if (typeof value === 'string') {
			this.resetForm();
			const tempValue = new RegExp(value, 'gi');
			this.filteredCategories = this.serviceCategoryState.categories.filter((s) => s.description.match(tempValue));
		}
	}

	onSelectCategory(event: MatAutocompleteSelectedEvent) {
		const serviceControl: AbstractControl = this.debtForm.controls.service;
		const banelcoClientIdControl: AbstractControl | null = this.debtForm.controls.banelcoClientId;
		serviceControl.patchValue(null);
		this.filteredServices = [];
		this.serviceService.resetState();
		this.serviceService.findServices(event.option.value.id);
		banelcoClientIdControl.disable();
	}

	get errorMessage(): IValidatorMessage {
		return {
			pattern: this.translateService.instant('pages.payments.service.debt.invalidDebtId'),
		};;
	}

	onRetryCategories() {
		this.categoryService.findServiceCategories();
	}

	searchFilteredServices(event: KeyboardEvent) {
		const { value } = (event.target as HTMLInputElement);
		const banelcoClientIdControl: AbstractControl | null = this.debtForm.controls.banelcoClientId
		if (typeof value === 'string' && event.key !== 'Enter') {
			this.debtForm.patchValue({
				banelcoClientId: null,
				debt: null
			});
			banelcoClientIdControl.disable();
			const tempValue = new RegExp(value, 'gi');
			this.filteredServices = this.serviceState.services.filter((s) => s.description.match(tempValue));
		}
	}

	onSelectService(event: MatAutocompleteSelectedEvent) {
		if (event.option.value) {
			const banelcoClientIdControl: AbstractControl | null = this.debtForm.controls.banelcoClientId
			banelcoClientIdControl.patchValue(null);
			banelcoClientIdControl.enable();
		}
	}

	onRetryServices() {
		const categoryControl: AbstractControl = this.debtForm.controls.category;
		this.serviceService.findServices(categoryControl.value.id);
	}

	resetForm() {
		const serviceControl: AbstractControl = this.debtForm.controls.service;
		const banelcoClientIdControl: AbstractControl | null = this.debtForm.controls.banelcoClientId;
		serviceControl.setValue(null);
		banelcoClientIdControl.setValue(null);
		serviceControl.disable();
		banelcoClientIdControl.disable();
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

	get isFormEmpty(): boolean {
		return this.debtForm.value.banelcoClientId === undefined ||
				this.debtForm.value.category === undefined ||
				this.debtForm.value.service === undefined;
	}

	get isLoading(): boolean {
		return this.asyncDebtIdLoading || this.serviceCategoryState.loading || this.serviceState.loading;
	}

	get isValid(): boolean {
		return this.servicePaymentState.newServicePaymentFormValue.fromDebts
			? true
			: (this.debtForm.valid && !this.isFormEmpty && !this.isLoading);
	}

	private trackPageView() {
		this.analyticsService.trackPageView({
			name: 'IdentificarServicio',
			family: 'Pagos',
			subfamily: 'Servicios',
			action: 'Pagar',
		}, {
			name: 'NuevoPagoServicio',
			details: {
				transactionstep: '1'
			}
		}, {
			transactionstep01: '1'
		});
	}
}
