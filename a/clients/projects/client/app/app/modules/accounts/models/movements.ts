import {
	IApiResponseArray,
	IApiResponseObject
} from '@mcy/core/interfaces/api.interfaces';
import { IConcept, ICurrency, makeCurrency } from 'client/app/app/models';
import { AccountType, IAccount } from 'client/app/app/models/account';
import { makeConcept } from 'client/app/app/models';

type AccountMovementDetail = 'S' | 'N';

export interface IAccountMovement {
	id: string;
	requestId?: string;
	amount: number;
	balance: number;
	accountingDate: Date;
	valueDate: Date;
	description?: string;
	moreDetail: AccountMovementDetail;
	eventCode: string;
	currency: ICurrency;
}

export interface IAccountMovementState {
	movements: IAccountMovement[];
	selectedAccount: IAccount | null;
	isLoading: boolean;
	hasMovementsErrors: boolean;
}

export interface IAccountMovementDetail {
	accountDocumentNumber: string;
	accountDocumentType: string;
	accountNumber: string;
	accountType: AccountType;
	cbvu: string;
	accountingDate: string;
	valueDate: string;
	amount: number;
	currency: ICurrency;
	referenceNumber: string;
	creditDebitIndicator: string;
	accountBranch?: string;
	accountBranchAddress?: string;
	description?: string;
	cardNumber?: string;
	originAccountHolder?: string,
	originAccountDocumentNumber?: string,
	concept?: IConcept;
	price?: number;
	companyName?: string;
}

export function makeAccountMovement(
	data: Partial<IAccountMovement>
): IAccountMovement {
	const defaultValue: IAccountMovement = {
		id: '',
		amount: 0,
		balance: 0,
		accountingDate: new Date(),
		valueDate: new Date(),
		moreDetail: 'S',
		eventCode: '',
		currency: makeCurrency({})
	};

	return { ...defaultValue, ...data };
}

export function makeAccountMovementDetail(
	data: Partial<IAccountMovementDetail>
): IAccountMovementDetail {
	const defaultValue: IAccountMovementDetail = {
		accountDocumentNumber: '',
		accountDocumentType: '',
		accountNumber: '',
		accountType: 'CC',
		cbvu: '',
		accountingDate: '',
		valueDate: '',
		amount: 0,
		currency: makeCurrency({}),
		referenceNumber: '',
		creditDebitIndicator: '',
		accountBranch: '',
		accountBranchAddress: '',
		description: '',
		cardNumber: '',
		originAccountHolder: '',
		originAccountDocumentNumber: '',
		concept: makeConcept({}),
		price: 0,
		companyName: ''
	};

	return { ...defaultValue, ...data };
}

export function makeAccountMovementState(data: Partial<IAccountMovementState>): IAccountMovementState {
	const defaultValue: IAccountMovementState = {
		movements: [],
		selectedAccount: null,
		isLoading: false,
		hasMovementsErrors: false
	};

	return { ...defaultValue, ...data };
}

export interface IMovementsResponse extends IApiResponseArray<IAccountMovement> {}
export interface IMovementDetailResponse extends IApiResponseObject<IAccountMovementDetail> {}
