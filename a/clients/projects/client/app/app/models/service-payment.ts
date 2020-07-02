import { ICurrency, makeCurrency } from './currency';
import { IAccountBase, makeAccountBase, IAccount, makeAccount } from './account';
import { IApiResponseObject, IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';
import { IRequest } from './request';
import { IServiceDebt, makeServiceDebt } from './service-debt';
import { IService, makeService, IServiceBase, makeServiceBase } from './service';
import { IServiceCategory, makeServiceCategory, IServiceCategoryBase, makeServiceCategoryBase } from './service-category';
import { AmountType } from './amount-type';

export type PaymentState = 'APPROVED' | 'DENIED';

export interface IServicePayment {
	amount: number;
	description: string;
	banelcoClientId: string;
	invoiceId: string;
	otherAmount: number;
	service: IServiceBase;
	category: IServiceCategoryBase;
	account: IAccountBase;
	currency: ICurrency;
	usdPayment: boolean;
	expirationDate?: Date;
	alias?: string;
	controlNumber?: string;
	transactionNumber?: string;
	date?: Date;
	state?: PaymentState;
}

export interface IServicePaymentResponse extends IApiResponseObject<IServicePayment> {}
export interface IServicePaymentsResponse extends IApiResponseArray<IServicePayment> {}
export function makeServicePayment(data: Partial<IServicePayment>): IServicePayment {
	const defaultValue: IServicePayment = {
		banelcoClientId: '',
		description: '',
		usdPayment: false,
		service: makeServiceBase({}),
		category: makeServiceCategoryBase({}),
		amount: 0,
		otherAmount: -1,
		invoiceId: '',
		currency: makeCurrency({}),
		account: makeAccountBase({})
	};
	return { ...defaultValue, ...data };
}

export interface IServicePaymentState {
	newServicePaymentFormValue: IServicePaymentFormValue;
	servicePayments: IServicePayment[];
	lastServicePaymentRequest: IRequest | null;
	searchedServicePayments: boolean;
	loading: boolean;
	hasServicePaymentErrors: boolean;
}

export interface IServicePaymentFormValue {
	account: IAccount;
	amount: number;
	currency: ICurrency;
	debt: IServiceDebt;
	banelcoClientId: string;
	category: IServiceCategory,
	service: IService;
	amountType: AmountType | null;
	fromDebts: boolean;
}

export function makeServicePaymentFormValue(data: Partial<IServicePaymentFormValue>) {
	const defaultValue: IServicePaymentFormValue = {
		account: makeAccount({}),
		currency: makeCurrency({}),
		amount: 0,
		debt: makeServiceDebt({}),
		banelcoClientId: '',
		category: makeServiceCategory({}),
		service: makeService({}),
		amountType: null,
		fromDebts: false
	};
	return { ...defaultValue, ...data };
}

export function makeServicePaymentState(data: Partial<IServicePaymentState>) {
	const defaultValue: IServicePaymentState = {
		servicePayments: [],
		searchedServicePayments: false,
		loading: false,
		newServicePaymentFormValue: makeServicePaymentFormValue({}),
		lastServicePaymentRequest: null,
		hasServicePaymentErrors: false
	};
	return { ...defaultValue, ...data };
}

export function makeServicePaymentsStates(): PaymentState[] {
	return [
		'APPROVED',
		'DENIED'
	];
}
