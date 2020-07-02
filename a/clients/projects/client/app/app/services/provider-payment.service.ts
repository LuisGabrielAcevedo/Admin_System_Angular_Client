import { Injectable, OnDestroy } from '@angular/core';
import {
	IProviderPaymentState,
	makeProviderPaymentState,
	IRequest,
	ITransferDetailSuccess,
	IRequestResponse,
	INewTransfer,
	makeTransferDetailSuccess,
	makeProviderPaymentFormValue,
	ITransfersResponse,
	ITransfer
} from 'client/app/app/models';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { DataService } from '@mcy/core/services/data.service';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';
import { TransactionUtilsService } from './transaction-utils.service';
import { TransferService } from './transfer.service';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { TRANSFER_STATUS } from 'client/app/app/constants';

@Injectable()
export class ProviderPaymentService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IProviderPaymentState>(makeProviderPaymentState({}));
	public subscription: Subscription;

	constructor(
		public eventService: EventService,
		private translateService: TranslateService,
		private dataService: DataService,
		private transactionUtilsService: TransactionUtilsService,
		private userService: UserService,
		private transferService: TransferService
	) {
		super(eventService);
		this.subscription = new Subscription();
	}

	findProviderPayments(): void {
		this.updateProviderPaymentState({ loading: true });
		this.subscription.add(
			this.getProviderPayments()
			.subscribe((res: ITransfersResponse) => {
				if (res.success && res.data.length) {
					const payments = res.data;
					this.orderPaymentsByDate(payments);
					this.updateProviderPaymentState({ providerPayments: payments,
						searchedProviderPayments: true, loading: false,
						hasProviderPaymentErrors: false });
				} else {
					this.updateProviderPaymentState({ loading: false, hasProviderPaymentErrors: true, searchedProviderPayments: true });
				}
			}, (res: HttpErrorResponse) => {
				if (res.error.status[0].code === TRANSFER_STATUS.EMPTY_LIST) {
					this.updateProviderPaymentState({ searchedProviderPayments: true, loading: false, hasProviderPaymentErrors: false });
				} else {
					this.updateProviderPaymentState({ loading: false, hasProviderPaymentErrors: true, searchedProviderPayments: true });
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	submitProviderPayment(data: INewTransfer, softtoken?: string): Observable<IRequestResponse> {
		data.conceptCode = 'FAC';
		this.updateProviderPaymentState({ loadingNewPayment: true });
		return this.dataService.post('v1/transactions/transfers', {
			body: data,
			headers: {
				softToken: softtoken ? softtoken : null
			}
		}).pipe(
			map((response) => response as IRequestResponse),
			switchMap((response: IRequestResponse) => this.transferService.validateRequest(response)),
			tap((response: IRequestResponse) => {
				if (response.success && response.data) {
					this.updateProviderPaymentState({
						lastProviderPaymentRequest: response.data,
						loadingNewPayment: false,
						hasNewPaymentErrors: false
					})
				}
			})
		);
	}

	getProviderPaymentState(): BehaviorSubject<IProviderPaymentState> {
		return this.subject;
	}

	updateProviderPaymentState(data: Partial<IProviderPaymentState>) {
		this.subject.next(makeProviderPaymentState({...this.getProviderPaymentState().value, ...data}));
	}

	resetFormState() {
		this.updateProviderPaymentState(makeProviderPaymentState({
			newProviderPaymentFormValue: makeProviderPaymentFormValue({}),
		}));
	}

	resetState() {
		this.updateProviderPaymentState(makeProviderPaymentState({}));
	}

	getContentForTransferSuccess(lastProviderPaymentRequest: IRequest): ITransferDetailSuccess {
		return makeTransferDetailSuccess({
			...this.transactionUtilsService.getContentForRequestState(lastProviderPaymentRequest, 'provider-payment-success', 'pages.payments.providers.success'),
			descriptionReciept: this.translateService.instant('common.requestNumber'),
		});
	}

	getProviderPayments():  Observable<ITransfersResponse>{
		return this.dataService.get('v1/transfers/transfers', { params: {
			conceptId: 'FAC',
			originCuit: this.userService.getEnterpriseState().value.selectedEnterprise.cuilt
			}
		});
	}

	orderPaymentsByDate(payments: ITransfer[]) {
		payments.sort( (a , b) =>new Date(b.date).getTime() - new Date(a.date).getTime());
	}
}
