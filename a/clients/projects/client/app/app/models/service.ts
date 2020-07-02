import { IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';
import { ICurrency, makeCurrency } from './currency';

export interface IServiceBase {
	id: string;
	description: string;
}

export interface IService extends IServiceBase {
	otherAmountAllowed?: OtherAmountAllowed;
	suggestOrder: number;
	paymentType: any;
	usdPaymentAllowed: boolean;
	recurrentPaymentAllowed: boolean; // TODO Futuro
	type: string; // TODO No se sabe bien el valor, es algo interno de PMC
	currency: ICurrency;
	onlyQuery?: false, // no se usa en front aun
}

type OtherAmountAllowed = 'EQUAL' | 'GREATER_THAN' | 'ANY'; // V1

export interface IServicesResponse extends IApiResponseArray<IService> {}

export function makeService(data: Partial<IService>): IService {
	const defaultValue: IService = {
		id: '',
		otherAmountAllowed: 'ANY',
		description: '',
		currency: makeCurrency({}),
		suggestOrder: 0,
		usdPaymentAllowed: false,
		recurrentPaymentAllowed: false,
		paymentType: null,
		type: ''
	};

	return { ...defaultValue, ...data };
}

export interface IServiceState {
	services: IService[];
	loading: boolean;
	searchedServices: boolean;
	hasServiceError: boolean;
}

export function makeServiceState(data: Partial<IServiceState>) {
	const defaultValue: IServiceState = {
		services: [],
		loading: false,
		searchedServices: false,
		hasServiceError: false
	};
	return { ...defaultValue, ...data };
}

export function makeServiceBase(data: Partial<IServiceBase>) {
	const defaultValue: IServiceBase = {
		id: '',
		description: ''
	};
	return { ...defaultValue, ...data };
}
