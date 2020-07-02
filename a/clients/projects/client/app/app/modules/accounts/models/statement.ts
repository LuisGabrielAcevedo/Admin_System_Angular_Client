import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { IAccount } from 'client/app/app/models';

export interface IStatement {
	id: string;
	date: Date;
}

export interface IStatementsState {
	statements: IStatement[],
	searched: boolean,
	loading: boolean,
	hasErrorStatements: boolean,
	selectedAccount: IAccount | null
}

export interface IStatementPdf {
	id: string;
	file: string; // Content-type application pdf base64
}

export function makeStatement(data: Partial<IStatement>): IStatement {
	const defaultValue: IStatement = {
		id: '',
		date: new Date()
	};

	return { ...defaultValue, ...data };
}

export function makeStatementsState(data: Partial<IStatementsState>) {
	const defaultValue: IStatementsState = {
		statements: [],
		searched: false,
		loading: false,
		hasErrorStatements: false,
		selectedAccount: null
	};

	return { ...defaultValue, ...data };
}

export interface IStatementResponse extends IApiResponseArray<IStatement> {}

export interface IStatementPdfResponse extends IApiResponseObject<IStatementPdf> {}

