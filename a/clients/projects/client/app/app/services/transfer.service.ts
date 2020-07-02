import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {
	ITransferState,
	makeTransferState,
	ITransfersResponse,
	INewTransfer,
	makeNewTransfer,
	makeTransferFormValue,
	IRequestResponse,
	IRequest,
	IEnterprise,
} from 'client/app/app/models';
import { DataService } from '@mcy/core/services/data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ITransferDetailSuccess, makeTransferDetailSuccess, ITransfer, ITransferResponse }
	from 'client/app/app/models/transfers';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { TransactionUtilsService } from './transaction-utils.service';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TRANSFER_STATUS } from 'client/app/app/constants';

@Injectable()
export class TransferService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<ITransferState>(makeTransferState({}));
	public subscription: Subscription = new Subscription();

	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private translateService: TranslateService,
		private transactionUtilsService: TransactionUtilsService,
		private userService: UserService,
	) {
		super(eventService);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	findTransfers(): void {
		let tranfersData: ITransfer[] = [];
		this.updateTransferState({
			transfers: [],
			loading: true,
			hasTranferErrors: false
		})
		this.subscription.add(
			this.getTransfers()
			.subscribe((res: ITransfersResponse) => {
				if (res.success && res.data.length) {
					tranfersData = res.data.filter((element) => element.conceptCode !== 'HAB');
					this.orderTranfersByDate(tranfersData);
					this.updateTransferState({ transfers: tranfersData, searchedTransfers: true, loading: false });
				} else {
					this.updateTransferState({ loading: false, hasTranferErrors: true, searchedTransfers: true });
				}
			}, (res: HttpErrorResponse) => {
				if (res.error.status[0].code === TRANSFER_STATUS.EMPTY_LIST) {
					this.updateTransferState({ transfers: tranfersData, searchedTransfers: true, loading: false });
				} else {
					this.updateTransferState({ loading: false, hasTranferErrors: true, searchedTransfers: true });
				}
			})
		);
	}

	validateRequest(requestResponse: IRequestResponse): Observable<IRequestResponse> {
		const isTransferOrProvider = requestResponse.data.type === 'TRANSFER' || requestResponse.data.type === 'SUPPLIER_PAYMENT';
		if (requestResponse.success && requestResponse.data.state === 'AUTHORIZED' && isTransferOrProvider ) {
			const transfer = requestResponse.data.content as ITransfer;
			return this.getTransferById(requestResponse.data.id, transfer.conceptCode).pipe(
				map((response) => {
					if (response.success) {
						return {
							...requestResponse,
							data: {
								...requestResponse.data,
								content: { 
									...transfer, 
									state: response.data.state,
									date: response.data.date
								}
							}
						};
					} else {
						return requestResponse
					}
				}),
				catchError(() => of(requestResponse)));
		}
		return of(requestResponse);
	}

	submitRequestTransfer(data: INewTransfer, softToken?: string): Observable<IRequestResponse> {
		this.updateTransferState({ loadingNewTransfer: true, hasNewTransferErrors: false });
		return this.dataService.post('v1/transactions/transfers', {
			body: data,
			headers: {
				softToken: softToken ? softToken : null,
			},
		}).pipe(
			map((response) => response as IRequestResponse),
			switchMap((response: IRequestResponse) => this.validateRequest(response)),
			tap((response: IRequestResponse) => {
				if (response.success && response.data) {
					this.updateTransferState({ lastTransfer: response.data, loadingNewTransfer: false, hasNewTransferErrors: false });
				}
			})
		);
	}

	updateTransferState(data: Partial<ITransferState>) {
		this.subject.next(makeTransferState({ ...this.getTransferState().value, ...data }));
	}

	getTransferState(): BehaviorSubject<ITransferState> {
		return this.subject;
	}

	getTransfers(): Observable<ITransfersResponse> {
		return this.dataService.get('v1/transfers/transfers', { params: {
			conceptId: 'TRF',
			originCuit: this.userService.getEnterpriseState().value.selectedEnterprise.cuilt
		} });
	}

	getTransferById(id: string, conceptId: string): Observable<ITransferResponse> {
		return this.dataService.get(`v1/transfers/transfers/${id}`, {
			params: {
				conceptId,
				originCuit: this.userService.getEnterpriseState().value.selectedEnterprise.cuilt
			}
		});
	}

	getNewTransferFromForm(): INewTransfer {
		const transferForm = this.getTransferState().value.newTransferFormValue;
		const entepriseState: IEnterprise = this.userService.getEnterpriseState().value.selectedEnterprise;
		const enterpriseName: string = entepriseState.name;

		return makeNewTransfer({
			accountType: transferForm.destinationAccount.type,
			amount: transferForm.amount,
			conceptCode: '',
			currencyCode: transferForm.destinationAccount.currency.code,
			destinationCuilt: transferForm.destinationAccount.cuilt,
			destinationCbvu: transferForm.destinationAccount.cbvu,
			originCuilt: transferForm.sourceAccount.cuilt,
			destinationHolder: enterpriseName,
			originCbvu: transferForm.sourceAccount.cbvu,
		});
	}

	resetFormState() {
		this.updateTransferState({
			newTransferFormValue: makeTransferFormValue({}),
			lastTransfer: null
		});
	}

	resetState() {
		this.updateTransferState(makeTransferState({}));
	}

	getContentForTransferSuccess(lastProviderPaymentRequest: IRequest): ITransferDetailSuccess {
		return makeTransferDetailSuccess({
			...this.transactionUtilsService.getContentForRequestState(lastProviderPaymentRequest, 'transfer-success', 'pages.transfers.thirdParty.success'),
			descriptionReciept: this.translateService.instant('common.requestNumber'),
		});
	}

	orderTranfersByDate(payments: ITransfer[]) {
		payments.sort( (a , b) =>new Date(b.date).getTime() - new Date(a.date).getTime());
	}
}
