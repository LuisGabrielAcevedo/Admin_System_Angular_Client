import { AccountType, IAccount, makeAccount } from './account';
import { ICurrency, makeCurrency } from './currency';
import { IContact, makeContact } from './contact';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { FormValue, IFindContactFormChangeEvent, makeFindContactFormChangeEvent } from './form';
import { IRequest } from './request';
import { IConcept, makeConcept } from './concept';

export interface INewTransfer {
	accountType: AccountType;
	amount: number;
	conceptCode: string;
	currencyCode: string;
	destinationCuilt: string;
	destinationCbvu: string;
	destinationHolder: string;
	originCuilt: string;
	originCbvu: string;
	description?: string;
	scheduledDate?: Date
}

export type ITransferStateStatus = 'APPROVED' | 'DENIED' | 'INPROGRESS'; // WIP PLACEHOLDER VALUES

export interface ITransferPdf {
	id: string;
	file: string; // Content-type application pdf base64
}

export interface ITransferPdfResponse extends IApiResponseObject<ITransferPdf> {}

export interface ITransfer {
	id?: string; // TODO review
	amount: number;
	conceptCode: string;
	controlNumber: string;
	currency: ICurrency;
	date: Date;
	destinationCbvu: string;
	destinationCuilt: string;
	destinationHolder: string;
	originCbvu: string;
	originCuilt: string;
	state?: ITransferStateStatus;
}

export interface IFindContactFormState {
	selectedTab: number;
	formValue: FormValue<IFindContactFormChangeEvent>;
	selectedContact?: IContact;
}

export interface ITransferFormValue {
	findContactFormState: IFindContactFormState;
	sourceAccount: IAccount;
	destinationAccount: IAccount;
	destinationContact: IContact;
	concept: IConcept;
	amount: number;
	currency: ICurrency;
	executionDate: Date;
	paymentDescription: string;
	uncoverAmount: boolean;
}

export interface ITransferState {
	newTransferFormValue: ITransferFormValue;
	transfers: ITransfer[];
	lastTransfer: IRequest | null;
	lastTransferContact: IContact | null;
	searchedTransfers: boolean;
	hasNewTransferErrors: boolean
	loadingNewTransfer: boolean;
	loading: boolean;
	hasTranferErrors: boolean;
}

export interface ITransferFilters {
	searchKeyword: string;
	transferStatus: ITransferStateStatus | '';
	transferExecutionDateFrom: string;
	transferExecutionDateTo: string;
}

export interface ITransferDetailSuccess {
	state: string,
	descriptionReciept: string,
	icon:string,
	title:string,
	class: string,
	iconButtonSecundary:string,
	textButtonSecundary:string,
	allowDownload: boolean
}

export interface ITransfersResponse extends IApiResponseArray<ITransfer> {}
export interface ITransferResponse extends IApiResponseObject<ITransfer> {}

export function makeTransferFormValue(data: Partial<ITransferFormValue>): ITransferFormValue {
	const defaultValue: ITransferFormValue = {
		findContactFormState: {
			selectedTab: 0,
			formValue:  makeFindContactFormChangeEvent({}),
		},
		sourceAccount: makeAccount({}),
		destinationAccount: makeAccount({}),
		destinationContact: makeContact({}),
		concept: makeConcept({}),
		currency: makeCurrency({}),
		amount: 0,
		executionDate: new Date(),
		paymentDescription: '',
		uncoverAmount: false,
	};

	return { ...defaultValue, ...data };
}

export function makeTransferState(data: Partial<ITransferState>): ITransferState {
	const defaultValue: ITransferState = {
		newTransferFormValue: makeTransferFormValue({}),
		loadingNewTransfer: false,
		hasNewTransferErrors: false,
		lastTransfer: null,
		lastTransferContact: makeContact({}),
		transfers: [],
		searchedTransfers: false,
		loading: false,
		hasTranferErrors: false
	};

	return { ...defaultValue, ...data };
}

export function makeNewTransfer(data: Partial<INewTransfer>): INewTransfer {
	const defaultValue: INewTransfer = {
		amount: 0,
		accountType: 'CA',
		conceptCode: '',
		destinationHolder: '',
		originCuilt: '',
		originCbvu: '',
		destinationCuilt: '',
		destinationCbvu: '',
		currencyCode: ''
	};

	return { ...defaultValue, ...data };
}

export function makeTransfer(data: Partial<ITransfer>): ITransfer {
	const defaultValue: ITransfer = {
		amount: 0,
		conceptCode: '',
		controlNumber: '',
		destinationHolder: '',
		originCuilt: '',
		originCbvu: '',
		destinationCuilt: '',
		destinationCbvu: '',
		date: new Date(),
		currency: makeCurrency({})
	};

	return { ...defaultValue, ...data };
}

export function makeTransferFilters(data: Partial<ITransferFilters>) {
	const defaultValue: ITransferFilters = {
		searchKeyword: '',
		transferExecutionDateFrom: '',
		transferExecutionDateTo: '',
		transferStatus: ''
	};

	return { ...defaultValue, ...data };
}

export function makeTransferStateStatus(): ITransferStateStatus[] {
	return [
		'APPROVED',
		'DENIED',
		'INPROGRESS'
	]
}

export function makeTransferDetailSuccess(data: Partial<ITransferDetailSuccess>): ITransferDetailSuccess {
	const defaultValue: ITransferDetailSuccess = {
		state: '',
		descriptionReciept: '',
		icon:'',
		title:'',
		class: '',
		iconButtonSecundary:'',
		textButtonSecundary:'',
		allowDownload: false
	};

	return { ...defaultValue, ...data };
}
