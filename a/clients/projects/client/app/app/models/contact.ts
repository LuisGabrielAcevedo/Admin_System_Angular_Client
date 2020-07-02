import { IBank } from './bank';
import { IApiResponseObject, IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';
import { ICurrency, makeCurrency } from './currency';
import { AccountType } from './account';

export type ContactCategory = 'SERVICE' | 'PROVIDER' | 'CLIENT' | 'EMPLOYEE' | 'OTHERS' | 'UNKNOWN';

export enum CSVFilterType {
	all = 'all',
	favorites = 'favorites'
}

export interface IContact {
	id?: string;
	name: string;
	alias: string;
	cbvu: string;
	cuilt: string;
	email: string | null;
	favorite: boolean;
	activeAccount: boolean;
	accountNumber: string;
	accountType: AccountType;
	reference: string;
	category: ContactCategory;
	lastAmountPaid: [
		{
			amount: number;
			currency: ICurrency;
		},
	];
	bank: IBank;
}

export type CSVFilter =
	CSVFilterType.all |
	CSVFilterType.favorites |
	ContactCategory;

export interface IContactState {
	contacts: IContact[];
	loading: boolean;
	hasErrorContacts: boolean;
	searchedContacts: boolean;
}

export interface ISearchContact {
	type: 'cbvu' | 'alias' | 'id' | 'category';
	value: string | number;
}

export function makeContact(data: Partial<IContact>): IContact {
	const defaultValue: IContact = {
		id: '',
		cbvu: '',
		alias: '',
		name: '',
		cuilt: '',
		accountNumber: '',
		accountType: 'CA',
		email: null,
		reference: '',
		category: 'OTHERS',
		activeAccount: false,
		favorite: false,
		bank: {
			id: '',
			name: '',
		},
		lastAmountPaid: [{
			amount: 0,
			currency: makeCurrency({}),
		}]
	};

	return { ...defaultValue, ...data };
}

export function makeContactState(data: Partial<IContactState>): IContactState {
	const defaultValue: IContactState = {
		contacts: [],
		loading: false,
		searchedContacts: false,
		hasErrorContacts: false,
	};

	return { ...defaultValue, ...data };
}

export function makeContactCategories(): ContactCategory[] {
	return [
		'PROVIDER',
		'SERVICE',
		'CLIENT',
		'EMPLOYEE',
		'OTHERS'
	];
}

export interface IServiceContactResponse extends IApiResponseObject<IContact | null> {}
export interface IServiceMultipleContactResponse extends IApiResponseArray<IContact> {}

export function adaptContact(data: any): IContact {
	return makeContact({
		...data,
		category: categoryAdapter(data.category),
	});
}

function categoryAdapter(data: string): ContactCategory {
	let category: ContactCategory = 'OTHERS';

	switch(data) {
		case 'SERVICIO': 
			category = 'SERVICE';
			break;
		
		case 'PROVEEDOR':
			category = 'PROVIDER';
			break;

		case 'CLIENTE':
			category = 'CLIENT';
			break;

		case 'EMPLEADO':
			category = 'EMPLOYEE';
			break;

		case 'OTRO':
			category = 'OTHERS';
			break;
	}

	return category;
}

export function adaptContactToBFF(contact: IContact) {
	const adaptedContact: any = { 
		...contact,
		category: adaptCategoryToBFF(contact.category)
	};

	return adaptedContact;
}

function adaptCategoryToBFF(category: ContactCategory): string {
	let adaptedCategory: string = 'OTHERS';

	switch(category) {
		case 'SERVICE': 
			adaptedCategory = 'SERVICIO';
			break;
		
		case 'PROVIDER':
			adaptedCategory = 'PROVEEDOR';
			break;

		case 'CLIENT':
			adaptedCategory = 'CLIENTE';
			break;

		case 'EMPLOYEE':
			adaptedCategory = 'EMPLEADO';
			break;

		case 'OTHERS':
			adaptedCategory = 'OTRO';
			break;
	}

	return adaptedCategory;
}
