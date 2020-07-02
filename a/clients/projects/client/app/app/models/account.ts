import { ICurrency, makeCurrency } from './currency';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface IAccountBase {
	number: string;
	type: AccountType;
}

export type AccountType = 'CA' | 'CC';

export interface IAccount extends IAccountBase {
	alias: string;
	cbvu: string;
	cuilt: string;
	balance?: number;
	uncoverBalance: number;
	currency: ICurrency;
}

export interface IAccountAlias {
	assignedAlias: string;
	cbvu: string;
	status: string;
}

export interface IAccountsResponse extends IApiResponseArray<IAccount> {}
export interface IAccountResponse extends IApiResponseObject<IAccount> {}

export interface IBalanceDetailResponse extends IApiResponseObject<IBalanceDetail> {}

export function makeAccountBase(data: Partial<IAccountBase>): IAccountBase {
	const defaultValue: IAccountBase = {
		number: '',
		type: 'CC'
	};

	return { ...defaultValue, ...data };
}

export function makeAccount(data: Partial<IAccount>): IAccount {
	const accountBase = makeAccountBase({});
	const defaultValue: IAccount = {
		...accountBase,
		alias: '',
		cbvu: '',
		cuilt: '',
		balance: 0,
		uncoverBalance: 0,
		currency: makeCurrency({})
	};

	return { ...defaultValue, ...data };
}

export interface IAccountState {
	accounts: IAccount[],
	searchedAccounts: boolean,
	loading: boolean,
	hasErrorAccounts: boolean,
	editAlias: {
		isAliasAlreadyInUse: boolean
	}
}

export interface IBalanceDetailState {
	selectedAccount: IAccount | null,
	balanceDetail: IBalanceDetail | null,
	searchedBalance: boolean,
	loadingBalance: boolean,
	hasErrorBalance: boolean
}

export function makeAccountState(data: Partial<IAccountState>) {
	const defaultValue: IAccountState = {
		accounts: [],
		searchedAccounts: false,
		loading: false,
		hasErrorAccounts: false,
		editAlias: {
			isAliasAlreadyInUse:false
		}
	};

	return { ...defaultValue, ...data };
}

export function makeBalanceDetailState(data: Partial<IBalanceDetailState>) {
	const defaultValue: IBalanceDetailState = {
		selectedAccount: null,
		balanceDetail: null,
		searchedBalance: false,
		loadingBalance: false,
		hasErrorBalance: false
	};

	return { ...defaultValue, ...data };
}

export interface IAccountBalanceByCurrency {
	balance: number;
	currency: string;
}

export interface IAccountAliasRequest {
	currentAlias: string;
	newAlias: string;
	cbvu: string;
	cuilt: string;
}

export function makeAccountAliasRequest(data: Partial<IAccountAliasRequest>) {
	const defaultValue: IAccountAliasRequest = {
		currentAlias: '',
		newAlias: '',
		cbvu: '',
		cuilt: ''
	};

	return { ...defaultValue, ...data };
}

export function makeAccountAlias(data: Partial<IAccountAlias>) {
	const defaultValue: IAccountAlias = {
		assignedAlias: '',
		cbvu: '',
		status: ''
	};

	return { ...defaultValue, ...data };
}

export interface IAccountAliasResponse extends IApiResponseObject<IAccountAlias> {}

export interface IBalanceDetail {
	actualCountableBalance: number;
	debitBlockedValue: boolean;
	dailyMovementAvailable: number;
	creditLimit: number;
	fundsTotalApplication: number;
	availableBalance: number;
	lastUpdateDate: Date;
	numericCreditOfDay: number;
	depositToCompesate: number;
	operatingBalance: number;
	overdraftAgreement: number;
}

export function makeBalanceDetail(
	data: Partial<IBalanceDetail>
): IBalanceDetail {
	const defaultValue: IBalanceDetail = {
		actualCountableBalance: 0,
		debitBlockedValue: false,
		dailyMovementAvailable: 0,
		creditLimit: 0,
		fundsTotalApplication: 0,
		availableBalance: 0,
		lastUpdateDate: new Date(),
		numericCreditOfDay: 0,
		depositToCompesate: 0,
		operatingBalance: 0,
		overdraftAgreement: 0
	};

	return { ...defaultValue, ...data };
}
