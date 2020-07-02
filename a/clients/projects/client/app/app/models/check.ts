import { ICurrency, makeCurrency } from './currency';
import { AccountType } from './account';
import { IApiResponseArray, IApiStatusResponse } from '@mcy/core/interfaces/api.interfaces';
export type CheckIssuedStateType = 'PAID'| 'TO_COVER' | 'REJECTED';
export type CheckReceivedStateType = 'ACCREDITED' | 'PENDING_ACCREDITATION' | 'DISCOUNTED' | 'REJECTED';

export interface ICheck {
	number: string;
	code: string; // CMC7
	rejectionReason: string;
	accreditationDate: Date;
	rejectionDate: Date;
	amount: number;
	currency: ICurrency;
}

export interface ICheckIssued extends ICheck {
	state: CheckIssuedStateType;
}

export interface ICheckReceived extends ICheck{
	state: CheckReceivedStateType;
}

export interface ICheckDiscounted {
	number: string;
	debitAccount: {
		number: string;
		type: AccountType;
	}
	deadline : string;
	finishDate: Date;
	tna: number;
	cftea: string;
	accreditationDate: Date;
	amount: number;
	currency: ICurrency;
}

export interface ICheckState {
	checksIssued: ICheckIssued[];
	checksReceived: ICheckReceived[];
	checksDiscounted: ICheckDiscounted[];
	searchedChecksIssued: boolean;
	searchedChecksReceived: boolean;
	searchedChecksDiscounted: boolean;
	loadingChecksIssued: boolean;
	loadingChecksReceived: boolean;
	loadingChecksDiscounted: boolean;
	hasErrorChecksIssued: boolean;
	hasErrorChecksReceived: boolean;
	hasErrorChecksDiscounted: boolean;
	warningChecksIssuedList: string[];
	warningChecksReceivedList: string[];
	checksIssuedStates: CheckIssuedStateType[];
	tabSelected: number;
	checksIssuedErrorStatus: IApiStatusResponse[];
	checksReceivedErrorStatus: IApiStatusResponse[];
	checksDiscountedErrorStatus: IApiStatusResponse[];
}

export interface IChecksIssuedResponse extends IApiResponseArray<ICheckIssued> {}
export interface IChecksReceivedResponse extends IApiResponseArray<ICheckReceived> {}
export interface IChecksDiscountedResponse extends IApiResponseArray<ICheckDiscounted> {}



export function makeCheckIssued(data: Partial<ICheckIssued>) {
	const defaultValue: ICheckIssued = {
		number: '',
		code: '',
		state: 'PAID',
		rejectionReason: '',
		accreditationDate: new Date(),
		rejectionDate: new Date(),
		amount: 0,
		currency: makeCurrency({})
	};
	return { ...defaultValue, ...data };
}

export function makeCheckReceived(data: Partial<ICheckReceived>) {
	const defaultValue: ICheckReceived = {
		number: '',
		code: '',
		state: 'ACCREDITED',
		rejectionReason: '',
		accreditationDate: new Date(),
		rejectionDate: new Date(),
		amount: 0,
		currency: makeCurrency({})
	};
	return { ...defaultValue, ...data };
}

export function makeCheckDiscounted(data: Partial<ICheckDiscounted>) {
	const defaultValue: ICheckDiscounted = {
		number: '',
		debitAccount: {
			number: '',
			type: 'CA'
		},
		deadline : '',
		finishDate: new Date(),
		tna: 0,
		cftea: '',
		accreditationDate: new Date(),
		amount: 0,
		currency: makeCurrency({})
	};
	return { ...defaultValue, ...data };
}

export function makeCheck(data: Partial<ICheck>) {
	const defaultValue: ICheck = {
		number: '',
		code: '',
		rejectionReason: '',
		accreditationDate: new Date(),
		rejectionDate: new Date(),
		amount: 0,
		currency: makeCurrency({})
	};
	return { ...defaultValue, ...data };
}

export function makeCheckState(data: Partial<ICheckState>) {
	const defaultValue: ICheckState = {
		checksIssued: [],
		checksReceived: [],
		checksDiscounted: [],
		searchedChecksIssued: false,
		searchedChecksReceived: false,
		searchedChecksDiscounted: false,
		loadingChecksIssued: false,
		loadingChecksReceived: false,
		loadingChecksDiscounted: false,
		hasErrorChecksIssued: false,
		hasErrorChecksReceived: false,
		hasErrorChecksDiscounted: false,
		checksIssuedStates: [],
		tabSelected: 0,
		checksIssuedErrorStatus: [],
		checksReceivedErrorStatus: [],
		checksDiscountedErrorStatus: [],
		warningChecksIssuedList: [],
		warningChecksReceivedList: [],
	};
	return { ...defaultValue, ...data };
}

export function makeChecksIssuedStates(): CheckIssuedStateType[] {
	return [
		'PAID', 'TO_COVER' , 'REJECTED'
	];
}

export function makeChecksReceivedStates(): CheckReceivedStateType[] {
	return [
		'ACCREDITED', 'PENDING_ACCREDITATION', 'DISCOUNTED', 'REJECTED'
	];
}
