import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { IServicesResponse } from 'client/app/app/models/service';
import { IServiceCategoriesResponse, IServiceCategory } from 'client/app/app//models/service-category';
import {
	makeServicePaymentState, IServicePaymentState, IServicePaymentsResponse, IServicePayment, PaymentState, makeServicePaymentFormValue,
} from 'client/app/app/models/service-payment';
import { IServiceDebtsResponse } from 'client/app/app/models/service-debt';
import { IApiStatusResponse, IHttpError } from '@mcy/core/interfaces/api.interfaces';
import { ToastService } from '@mcy/core/services/toast.service';
import { DataService } from '@mcy/core/services/data.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { CSVService } from 'client/app/app/services/csv.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { IRequestResponse, makeTransferDetailSuccess, ITransferDetailSuccess, IRequest } from 'client/app/app/models';
import { map, tap } from 'rxjs/operators';
import { TransactionUtilsService } from './transaction-utils.service';

@Injectable()
export class ServicePaymentService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IServicePaymentState>(
		makeServicePaymentState({})
	);
	public subscription: Subscription;
	constructor(
		public eventService: EventService,
		private data: DataService,
		private toast: ToastService,
		private storage: StorageService,
		private translateService: TranslateService,
		private csvService: CSVService,
		private utilsService: UtilsService,
		private transactionUtilsService: TransactionUtilsService
		) {
			super(eventService);
			this.subscription = new Subscription();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	getCategories(): Observable<IServiceCategoriesResponse> {
		return this.data.get('v1/pagomiscuentas/categories');
	}

	getServices(category: IServiceCategory): Observable<IServicesResponse> {
		return this.data.get(`v1/pagomiscuentas/categories/${category.id}/services`);
	}

	getDebt(id: string, serviceId: string): Observable<IServiceDebtsResponse> {
		return this.data.get('v1/pagomiscuentas/debts', {
			params: {
				banelcoClientId: id,
				// TODO remove in the future
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
				serviceId
		}});
	}

	getServicePaymentState(): BehaviorSubject<IServicePaymentState> {
		return this.subject;
	}

	updateServicePaymentState(data: Partial<IServicePaymentState>) {
		this.subject.next(makeServicePaymentState({ ...this.getServicePaymentState().value, ...data }));
	}

	getServicePayments(): Observable<IServicePaymentsResponse> {
		return this.data.get('v0/pagomiscuentas/payments');
	}

	findServicePayments(): void {
		this.updateServicePaymentState({ loading: true });
		this.subscription.add(
			this.getServicePayments().subscribe(
				(res: IServicePaymentsResponse) => {
					this.updateServicePaymentState({ loading: false, searchedServicePayments: true });
					if (res.success && res.data.length) {
						this.updateServicePaymentState({ servicePayments: res.data });
					} else {
						res.status.forEach((status: IApiStatusResponse) =>
							this.toast.message(status.message)
						);
					}
				},
				(error: IHttpError) => {
					this.updateServicePaymentState({ loading: false, searchedServicePayments: true });
					this.toast.message(error.message);
				}
			)
		);
	}

	resetFormState() {
		this.subject.value.newServicePaymentFormValue = makeServicePaymentFormValue({});
	}

	requestPaymentService(data: IServicePayment, _softToken: string): Observable<IRequestResponse> {
		return this.data.post('v1/transactions/payments', {
			body: data,
			params: {
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
			}
		});
	}

	submitRequestPaymentService(data: IServicePayment, softToken?: string): Observable<IRequestResponse> {
		this.updateServicePaymentState({ loading: true, hasServicePaymentErrors: false });
		return this.data.post('v1/transactions/payments', {
			body: data,
			headers: {
				softToken: softToken ? softToken : null
			},
			params: {
				documentNumber: this.storage.getData('documentNumber'),
				documentType: this.storage.getData('documentType'),
			}
		}).pipe(
			map((response) => response as IRequestResponse),
			tap((response: IRequestResponse) => {
				if (response.success && response.data) {
					this.updateServicePaymentState({ lastServicePaymentRequest: response.data, loading: false, hasServicePaymentErrors: false });
				}
			})
		);
	}

	getTableHeaders(): string[]  {
		return [
			this.translateService.instant('pages.payments.servicePaymentsList.serviceName'),
			this.translateService.instant('pages.payments.servicePaymentsList.amount'),
			this.translateService.instant('pages.payments.servicePaymentsList.date'),
			this.translateService.instant('pages.payments.servicePaymentsList.state')
		];
	}

	formattedDate(date: Date | undefined) {
		if (date) {
			return this.utilsService.formatDate(new Date(date));
		}

		return '';
	}

	stateDescription(state: PaymentState | undefined) {
		if (state === 'APPROVED') {
			return this.translateService.instant('pages.payments.state.successful');
		}

		if (state === 'DENIED') {
			return this.translateService.instant('pages.payments.state.rejected');
		}

		return '';
	}

	serializeService(service: IServicePayment): string[] {
		return [
			service.description || '',
			`"${service.currency.symbol} ${this.utilsService.formatAmount(service.amount)}"`,
			this.formattedDate(service.date),
			this.stateDescription(service.state)
		];
	}

	exportToCSV(servicePayments: IServicePayment[]) {
		const csvData: string[][] = [];
		const fileNameTranslation = this.translateService.instant('pages.payments.servicePaymentsList.servicePaymentFileName');
		const header = Object.values(this.getTableHeaders());
		csvData.push(header);
		servicePayments.forEach((service: IServicePayment) => {
			csvData.push(this.serializeService(service));
		});
		this.csvService.downloadCSV(csvData, fileNameTranslation);
	}

	resetState() {
		this.updateServicePaymentState(makeServicePaymentState({}));
	}

	getContentForPaymentSuccess(lastServicePaymentRequest: IRequest): ITransferDetailSuccess {
		return makeTransferDetailSuccess({
			...this.transactionUtilsService.getContentForRequestState(lastServicePaymentRequest, 'service-payment-success', 'pages.payments.servicePayment.success'),
			descriptionReciept: this.translateService.instant('common.requestNumber'),
		});
	}

	getAnalyticsPaymentType(paymentCode: number): string {
		if (paymentCode === 0) {
			return 'Valor inteiro';
		} else  {
			return 'Outro valor';
		}
	}

}
