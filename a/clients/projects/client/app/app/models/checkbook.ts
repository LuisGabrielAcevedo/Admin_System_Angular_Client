import { makeAccount, IAccountBase } from './account';
import {
	IApiResponseArray,
	IApiResponseObject,
} from '@mcy/core/interfaces/api.interfaces';
export type ICheckbookState = 'APPROVED' | 'DENIED' | '';
export type ICheckbookType =
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
	| 'CHECKBOOK_74';

export interface INewCheckbook {
	account: IAccountBase;
	count: number;
	province: IProvince;
	branch: IBranch;
	currencyCode: string;
	deferred: string;
	typeCode: string;
	typeDescription: string;
}

export interface ICheckbook {
	account: IAccountBase;
	count: number;
	province: IProvince;
	branch: IBranch;
	state: ICheckbookState;
	date: Date;
	typeDescription: string;
}

export interface ICheckbooksResponse extends IApiResponseArray<ICheckbook> {}
export interface ICheckbookResponse extends IApiResponseObject<ICheckbook> {}
export interface IEnablementCheckbookResponse extends IApiResponseObject<IEnablementCheckbookData> {}

export interface ICheckbookTypeInfo {
	type: ICheckbookType;
	description: string;
	code: string;
	deferred: string;
	availableCheckbooks: string;
}

export interface ITypesOfCheckbookResponse
	extends IApiResponseObject<ITypesOfCheckbook> {}

export interface ITypesOfCheckbook {
	checkbookTypes: ICheckbookTypeInfo[];
	provinces: IProvince[];
}

export interface IProvince {
	id: string;
	description: string;
	branchOffices?: IBranch[];
}

export interface IBranch {
	id: string;
	description: string;
	code: string;
	street?: string;
	number?: string;
	location?: string;
}

export interface IEnablementCheckbookData {
	enabled: boolean;
}

export interface IEnablementCheckbook {
	account: IAccountBase;
	initialNumber: string;
	lastNumber: string;
}

export interface ITypesOfCheckbookState {
	typesOfCheckbooks: ICheckbookTypeInfo[];
	provinces: IProvince[];
	searchedTypesOfCheckbooks: boolean;
}

export function makeTypesOfCheckbookState(
	data: Partial<ITypesOfCheckbookState>
) {
	const defaultValue: ITypesOfCheckbookState = {
		typesOfCheckbooks: [],
		provinces: [],
		searchedTypesOfCheckbooks: false,
	};

	return { ...defaultValue, ...data };
}

export function makeCheckbook(data: Partial<ICheckbook>) {
	const defaultValue: ICheckbook = {
		account: makeAccount({}),
		count: 0,
		province: makeProvince({}),
		branch: makeBranch({}),
		state: 'APPROVED',
		date: new Date(),
		typeDescription: ''
	};

	return { ...defaultValue, ...data };
}

export function makeNewCheckbook(data: Partial<INewCheckbook>) {
	const defaultValue: INewCheckbook = {
		account: makeAccount({}),
		count: 1,
		province: makeProvince({}),
		branch: makeBranch({}),
		currencyCode: '',
		deferred: '',
		typeCode: '',
		typeDescription: ''
		};

	return { ...defaultValue, ...data };
}

export function makeCheckbookTypeInfo(data: Partial<ICheckbookTypeInfo>) {
	const defaultValue: ICheckbookTypeInfo = {
		type: 'CHECKBOOK_39',
		description: '',
		code: '',
		deferred: '',
		availableCheckbooks: ''
		};

	return { ...defaultValue, ...data };
}

export function makeTypesOfCheckbook(data: Partial<ITypesOfCheckbook>) {
	const defaultValue: ITypesOfCheckbook = {
		checkbookTypes: [],
		provinces: [],
	};

	return { ...defaultValue, ...data };
}

export function makeBranch(data: Partial<IBranch>) {
	const defaultValue: IBranch = {
		id: '',
		code: '',
		description: ''
	};

	return { ...defaultValue, ...data };
}

export function makeProvince(data: Partial<IProvince>) {
	const defaultValue: IProvince = {
		id: '',
		description: '',
		branchOffices: []
	};

	return { ...defaultValue, ...data };
}

export function makeEnablementCheckbook(data: Partial<IEnablementCheckbook>) {
	const defaultValue: IEnablementCheckbook = {
		account: makeAccount({}),
		initialNumber: '',
		lastNumber: '',
	};

	return { ...defaultValue, ...data };
}

export function makeEnablementCheckbookResponse(data: Partial<IEnablementCheckbookResponse>) {
	const defaultValue: IEnablementCheckbookResponse = {
		status: [
			{
				code: '',
				message: ''
			}
		],
		data: {
			enabled: false
		}
	};

	return { ...defaultValue, ...data };
}


