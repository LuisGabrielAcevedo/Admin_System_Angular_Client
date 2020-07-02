import { ICurrency, makeCurrency} from './currency';
import { IUserRequest, makeUserRequest } from './user';
import { ITransfer } from './transfers';
import { IServicePayment, makeServicePayment } from './service-payment';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { ICheckbook } from './checkbook';
export type RequestType =
	'SERVICE_PAYMENT'
	| 'TRANSFER'
	| 'CHECKBOOK_39'
	| 'CHECKBOOK_40'
	| 'CHECKBOOK_44'
	| 'CHECKBOOK_45'
	| 'CHECKBOOK_32'
	| 'CHECKBOOK_33'
	| 'CHECKBOOK_42'
	| 'CHECKBOOK_43'
	| 'CHECKBOOK_70'
	| 'CHECKBOOK_71'
	| 'CHECKBOOK_72'
	| 'CHECKBOOK_73'
	| 'CHECKBOOK_74'
	| 'SUPPLIER_PAYMENT';
export type RequestFiltersType =
	'SERVICE_PAYMENT' |
	'SALARY_PAYMENT'|
	'TRANSFER'|
	'CHECKBOOK' |
	'PROVIDER_PAYMENT' |
	'ALL';
export type RequestState =
	'PENDING_APPROVAL' |
	'PARTIALLY_AUTHORIZED' |
	'AUTHORIZED'|
	'REJECTED' |
	'CANCELLED';
export type RequestFiltersState =
	'PENDING_APPROVAL' |
	'PARTIALLY_AUTHORIZED' |
	'AUTHORIZED'|
	'REJECTED'|
	'ALL' |
	'CANCELLED';
export type RequestAction = 'REJECT' | 'SIGN' | 'CANCEL';

export interface IRequest {
	id: string;
	type: RequestType;
	detail: string;
	amount: number;
	currency: ICurrency;
	creationDate: Date;
	lastUpdateDate: Date;
	state: RequestState;
	user: IUserRequest;
	signers: IUserRequest[];
	rejecter?: IUserRequest;
	rejectionReason: string;
	scheduledDate?: Date;
	content: ITransfer | IServicePayment | ICheckbook;
	description?: string;
}

export interface IRequestCurrencySummary {
	currency: string;
	amount: number;
}

export interface IRequestAction {
	type: RequestAction;
	color: string;
	path: string;
	id: string;
}

export interface IRequestCarouselAction {
	action: 'DETAIL' | 'CANCEL',
	request: IRequest
}

export interface IRequestResponse extends IApiResponseObject<IRequest> {}
export interface IRequestsResponse extends IApiResponseArray<IRequest> {}


export interface IRequestState {
	requests: IRequest[];
	searchedRequest: boolean;
	loading: boolean;
	hasRequestError: boolean,
	statesToShow: RequestState[],
	selectedRequests: IRequest[];
	selectedFilters: IRequestFilters
}

export function makeRequestColorClassByState() {
	return {
		PENDING_APPROVAL: '--pending-approval',
		PARTIALLY_AUTHORIZED: '--partially-authorized',
		AUTHORIZED: '--authorized',
		REJECTED: '--rejected',
		CANCELLED: '--cancelled'
	};
}

export function makeRequest(data: Partial<IRequest>) {
	const defaultValue: IRequest = {
		id: '',
		type: 'SERVICE_PAYMENT',
		detail: '',
		amount: 0,
		currency: makeCurrency({}),
		creationDate: new Date(),
		lastUpdateDate: new Date(),
		state: 'PENDING_APPROVAL',
		user: makeUserRequest({}),
		signers: [],
		rejectionReason: '',
		content: makeServicePayment({})
	};

	return { ...defaultValue, ...data };
}

export function makeRequestState(data: Partial<IRequestState>): IRequestState {
	const defaultValue: IRequestState = {
		requests: [],
		searchedRequest: false,
		loading: false,
		hasRequestError: false,
		statesToShow: [],
		selectedRequests: [],
		selectedFilters: makeRequestFilters({
			stateField: ['PENDING_APPROVAL','PARTIALLY_AUTHORIZED']
		})
	};

	return { ...defaultValue, ...data };
}

export function makeRequestType(): RequestFiltersType[] {
	return [
		'SERVICE_PAYMENT',
		'SALARY_PAYMENT',
		'TRANSFER',
		'CHECKBOOK',
		'PROVIDER_PAYMENT',
		'ALL'
	];
}

export function makeRequestStatus(): RequestState[] {
	return [
		'PENDING_APPROVAL' ,
		'PARTIALLY_AUTHORIZED',
		 'AUTHORIZED',
		 'REJECTED'
	];
}

export interface IRequestFilters {
	searchField: string;
	stateField: RequestFiltersState[];
	typeField?: RequestFiltersType;
	startDate: Date | null;
	endDate: Date | null;
	myRequests?: boolean;
	cancelledRequests?: boolean;
	scheduledField?: RequestFiltersType;
}

export function makeRequestFilters(filters:  Partial<IRequestFilters>) {
	const defaultValue: IRequestFilters = {
		searchField: '',
		stateField: [],
		typeField: 'ALL',
		startDate: null,
		endDate: null
	};

	return { ...defaultValue, ...filters };
}
