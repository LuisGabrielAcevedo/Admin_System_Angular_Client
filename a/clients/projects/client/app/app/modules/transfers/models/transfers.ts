import { IAccount, makeAccount } from 'client/app/app/models';

export interface IAccountsTransferForm {
	sourceAccount: IAccount;
	destinationAccount: IAccount;
}

export interface IAmountTransferForm {
	amount: number;
	description: string;
}

export function makeAccountsTransferForm(data: Partial<IAccountsTransferForm>) {
	const defaultValue: IAccountsTransferForm = {
		sourceAccount: makeAccount({}),
		destinationAccount: makeAccount({})
	};
	return { ...defaultValue, ...data };
}

export function makeAmountTransferForm(data: Partial<IAmountTransferForm>) {
	const defaultValue: IAmountTransferForm = {
		amount: 0,
		description: ''
	};
	return { ...defaultValue, ...data };
}
