import { ICurrency, makeCurrency } from './currency';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface IServiceDebt {
	amount: number;
	banelcoClientId: string;
	categoryId?: string;
	invoiceId: string;
	serviceId: string;
	description: string;
	otherAmount: number;
	usdPayment: boolean;
	expirationDate: Date;
	currency: ICurrency;
}

export interface IServiceDebtResponse extends IApiResponseObject<IServiceDebt> {}
export interface IServiceDebtsResponse extends IApiResponseArray<IServiceDebt> {}

export function makeServiceDebt(data: Partial<IServiceDebt>): IServiceDebt {
	const defaultValue: IServiceDebt = {
		banelcoClientId: '',
		serviceId: '',
		categoryId: '',
		invoiceId: '',
		description: '',
		otherAmount: 0,
		usdPayment: false,
		amount: 0,
		currency: makeCurrency({}),
		expirationDate: new Date()
	};

	return { ...defaultValue, ...data };
}

export interface IServiceDebtState {
	debts: IServiceDebt[];
	searchedDebts: boolean;
	loading: boolean;
	hasServiceDebtsErrors: boolean;
}

export function makeServiceDebtState(data: Partial<IServiceDebtState>) {
	const defaultValue: IServiceDebtState = {
		debts: [],
		searchedDebts: false,
		loading: false,
		hasServiceDebtsErrors: false
	};
	return { ...defaultValue, ...data };
}
