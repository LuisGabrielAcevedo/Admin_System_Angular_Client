import { IRequest, makeRequest } from './request';
import { IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';

export interface ITransaction {
	transaction: IRequest;
	transactionStatus?: string;
}

export function makeTransaction(data: Partial<ITransaction>): ITransaction {
	const defaultValue: ITransaction = {
		transaction: makeRequest({}),
	};
	return { ...defaultValue, ...data };
}

export interface ITransactionState {
	lastTransactions: ITransaction[];
	loadingSignature: boolean,
	hasErrorSignature: boolean,
}

export function makeTransactionState(
	data: Partial<ITransactionState>
): ITransactionState {
	const defaultValue: ITransactionState = {
		lastTransactions: [],
		loadingSignature: false,
		hasErrorSignature: false
	};
	return { ...defaultValue, ...data };
}

export interface ITransactionsErrors {
	[key: string]: string;
}

export interface ITransactionsResponse extends IApiResponseArray<ITransaction> {}
