import { DataService } from '@mcy/core/services/data.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { StorageService } from '@mcy/main/services/storage.service';
import groupBy from 'lodash/groupBy';
import { TranslateService } from '@ngx-translate/core';
import {
	ITransfer,
	makeRequestState,
	IRequestState,
	IRequestsResponse,
	IRequest,
	IRequestCurrencySummary,
	IRequestFilters,
	makeRequestFilters,
	IRequestResponse
} from 'client/app/app/models';
import { isWithinInterval } from 'date-fns';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SignaturesService } from './signatures.service';
import { MIN_DATE, MAX_DATE } from 'client/app/app/constants';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { map } from 'rxjs/internal/operators/map';
import { TransferService } from './transfer.service';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class RequestsService extends StatefulService implements OnDestroy {
	public subject = new BehaviorSubject<IRequestState>(makeRequestState({}));
	public subscription: Subscription;
	public documentNumber: string = '';
	public documentType: string = '';
	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private storageService: StorageService,
		private translateService: TranslateService,
		private utilsService: UtilsService,
		private signaturesService: SignaturesService,
		private transferService: TransferService,
		private userService: UserService,
	) {
		super(eventService);
		this.subscription = new Subscription();
		this.documentNumber = this.userService.getUserState().value.user.document.number;
		this.documentType = this.userService.getUserState().value.user.document.type;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	updateRequestsState(data: Partial<IRequestState>) {
		this.subject.next(
			makeRequestState({
				...this.getRequestsState().value,
				...data
			})
		);
	}

	getRequestsState(): BehaviorSubject<IRequestState> {
		return this.subject;
	}

	getRequests(): Observable<IRequestsResponse> {
		return this.dataService.get('v1/requests/requests', {
			params: {
				'from-date': MIN_DATE.toISOString(),
				'to-date': MAX_DATE.toISOString()
			}
		});
	}

	getRequestById(id: string): Observable<IRequestResponse> {
		return this.dataService.get(`v1/requests/requests/${id}`, {
			params: {
				documentNumber: this.storageService.getData('documentNumber'),
				documentType: this.storageService.getData('documentType')
			}
		}).pipe(
			map((response) => response as IRequestResponse),
			switchMap((response: IRequestResponse) => this.transferService.validateRequest(response))
		);
	}

	findRequests(): void {
		this.updateRequestsState({
			requests: [],
			loading: true,
			hasRequestError: false
		});
		this.subscription.add(
			this.getRequests().subscribe(
				(res: IRequestsResponse) => {
					if (res.success) {
						this.updateRequestsState({
							loading: false,
							hasRequestError: false,
							searchedRequest: true,
							requests: res.data,
							statesToShow: this.getRequestToShow(res.data).filter(state => state !== 'CANCELLED')
						});
					} else {
						this.updateRequestsState({ loading: false, searchedRequest: true, hasRequestError: true });
					}
				},
				() => {
					this.updateRequestsState({ loading: false, searchedRequest: true, hasRequestError: true });
				}
			)
		);
	}

	getRequestToShow(data: IRequest[]) {
		return [...new Set(data.map(request => request.state))];
	}

	getRequestsGroupByCurrency(data: IRequest[]) {
		return groupBy(
			data,
			(req: IRequest) => req.currency.symbol
		);
	}

	get requestCurrencySummary(): IRequestCurrencySummary[] {
		const groups: IRequestCurrencySummary[] = [];
		const request = this.getRequestsGroupByCurrency(this.getRequestsState().value.selectedRequests);
		Object.keys(request).forEach(key => {
			if (request[key]) {
				let amount = 0;
				request[key].forEach((req: IRequest ) => {
					amount += req.amount;
				});
				groups.push({
					currency: key,
					amount
				})
			}
		})
		return groups;
	}

	get selectionText() {
		const trasnslate: string =
			this.getRequestsState().value.selectedRequests.length > 1
				? 'selectedRequests'
				: 'selectedRequest';
		return this.translateService.instant(
			`pages.requests.requestsList.${trasnslate}`
		);
	}

	getOperationText(request: IRequest) {
		if (request.type === 'TRANSFER') {
			const translate = this.isSalary(request) ? 'SALARY_PAYMENT' : 'TRANSFER';
			return this.translateService.instant(`pages.requests.operations.${translate}`);
		}
		return this.translateService.instant(`pages.requests.operations.${request.type}`);
	}

	isServicePayment(request: IRequest):boolean{
		return request.type === 'SERVICE_PAYMENT';
	}

	isSalary(request: IRequest): boolean {
		return request.type === 'TRANSFER' && (request.content as ITransfer).conceptCode === 'HAB';
	}

	isProviderPayment(request: IRequest): boolean {
		return request.type === 'SUPPLIER_PAYMENT';
	}

	isTransfer(request: IRequest): boolean {
		return request.type === 'TRANSFER' && (request.content as ITransfer).conceptCode !== 'HAB'
	}

	isScheduledSalary(request: IRequest): boolean {
		return this.isSalary(request) && request.state === 'AUTHORIZED' && !!request.scheduledDate;
	}

	isCheckbook(request: IRequest): boolean {
		return [
			'CHECKBOOK_39',
			'CHECKBOOK_40',
			'CHECKBOOK_44',
			'CHECKBOOK_45',
			'CHECKBOOK_32',
			'CHECKBOOK_33',
			'CHECKBOOK_42',
			'CHECKBOOK_43',
			'CHECKBOOK_70',
			'CHECKBOOK_71',
			'CHECKBOOK_72',
			'CHECKBOOK_73',
			'CHECKBOOK_74'
		].includes(request.type);
	}

	validateSearchField(request: IRequest, filters: IRequestFilters): boolean {
		if (request.detail) {
			return (
				this.utilsService
					.removeSpecialCharater(request.detail)
					.toLocaleLowerCase()
					.includes(
						this.utilsService
							.removeSpecialCharater(filters.searchField)
							.toLowerCase()
					) || request.id.includes(filters.searchField)
			);
		} else {
			return false;
		}
	}

	validateType(request: IRequest, filters: IRequestFilters): boolean {
		switch (filters.typeField) {
			case 'SERVICE_PAYMENT':
				return this.isServicePayment(request);
			case 'SALARY_PAYMENT':
				return this.isSalary(request);
			case 'PROVIDER_PAYMENT':
				return this.isProviderPayment(request);
			case 'TRANSFER':
				return this.isTransfer(request);
			case 'CHECKBOOK':
				return this.isCheckbook(request);
			default:
				return true;
		}
	}

	validateScheduledType(request: IRequest, filters: IRequestFilters): boolean {
		if (filters.scheduledField && filters.scheduledField === 'SALARY_PAYMENT') {
			return this.isScheduledSalary(request);
		} else {
			return true;
		}
	}

	validateState(request: IRequest, filters: IRequestFilters): boolean {
		if (filters.stateField.length === 0) {
			return true;
		} else {
			return filters.stateField.includes(request.state || '');
		}
	}

	validateDateRange(request: IRequest, filters: IRequestFilters): boolean {
		if (request.lastUpdateDate) {
			return isWithinInterval(new Date(request.lastUpdateDate), {
				start: filters.startDate || MIN_DATE,
				end: filters.endDate || MAX_DATE
			});
		} else {
			return false;
		}
	}

	validateMyRequests(request: IRequest, filters: IRequestFilters) {
		if (request.user && filters.myRequests) {
			return (
				request.user.document.number === this.documentNumber &&
				request.user.document.type === this.documentType
			);
		} else {
			return true;
		}
	}

	validateCancelledRequests(request: IRequest, filters: IRequestFilters) {
		if (!filters.cancelledRequests) {
			return request.state !== 'CANCELLED';
		} else {
			return true;
		}
	}

	filterRequests(requests: IRequest[], filters: IRequestFilters) {
		return requests.filter(
			request =>
				this.validateCancelledRequests(request, filters) &&
				this.validateSearchField(request, filters) &&
				this.validateType(request, filters) &&
				this.validateDateRange(request, filters) &&
				this.validateState(request, filters) &&
				this.validateMyRequests(request, filters) &&
				this.validateScheduledType(request, filters)
		);
	}

	selectRequest(selectedRequests: IRequest[], request: IRequest): IRequest[] {
		if (this.signaturesService.getSignState().value.searchedSignatures[request.id]) {
			const currentResquest: IRequest | undefined = selectedRequests.find(req => req.id === request.id);
			if (currentResquest) {
				selectedRequests = selectedRequests.filter(req => req.id !== request.id);
			} else {
				if (selectedRequests.length < 10)
				selectedRequests = [... selectedRequests, request];
			}
		}
		return selectedRequests;
	}

	orderList(request: IRequest[]): IRequest[] {
		const listOrdered = request.sort((oneRequest, otherRequest) => {
			if (oneRequest.lastUpdateDate && otherRequest.lastUpdateDate) {
				if (oneRequest.lastUpdateDate > otherRequest.lastUpdateDate) {
					return -1;
				} else {
					return 1;
				}
			} else {
				return 0;
			}
		});
		return listOrdered;
	}

	cancelRequest(request: IRequest) {
		request.state = 'CANCELLED';
		let requests: IRequest[] = this.getRequestsState().value.requests;
		const requestIndex = requests.findIndex(req => req.id === request.id);
		if (requestIndex) {
			requests[requestIndex] = request;
			requests = requests.filter(req => req.id !== request.id);
			this.updateRequestsState({
				requests
			});
		}
	}

	resetSelectedState() {
		this.updateRequestsState({
			selectedRequests: [],
			selectedFilters: makeRequestFilters({
				stateField: ['PENDING_APPROVAL', 'PARTIALLY_AUTHORIZED']
			})
		})
	}

	resetState() {
		this.updateRequestsState(makeRequestState({}))
	}
}
