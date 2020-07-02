import { IFindContactFormState, ITransfer } from './transfers';
import { IAccount, makeAccount } from './account';
import { IContact, makeContact } from './contact';
import { ICurrency, makeCurrency } from './currency';
import { makeFindContactFormChangeEvent } from './form';
import { IRequest } from './request';


export interface IProviderPayment extends ITransfer {
}
export interface IProviderPaymentState {
	newProviderPaymentFormValue: IProviderPaymentFormValue,
	providerPayments: IProviderPayment[];
	lastProviderPaymentRequest: IRequest | null;
	lastProviderPaymentContact: IContact | null;
	searchedProviderPayments: boolean;
	loading: boolean;
	loadingNewPayment: boolean;
	hasNewPaymentErrors: boolean;
	hasProviderPaymentErrors: boolean;
}

export interface IProviderPaymentFormValue {
	findContactFormState: IFindContactFormState;
	sourceAccount: IAccount;
	destinationAccount: IAccount;
	destinationContact: IContact;
	amount: number;
	currency: ICurrency;
	executionDate: Date;
	paymentDescription: string;
}

export function makeProviderPaymentState(data: Partial<IProviderPaymentState>): IProviderPaymentState {
	const defaultValue: IProviderPaymentState = {
		newProviderPaymentFormValue: makeProviderPaymentFormValue({}),
		lastProviderPaymentRequest: null,
		lastProviderPaymentContact: null,
		loading: false,
		providerPayments: [],
		searchedProviderPayments: false,
		hasProviderPaymentErrors: false,
		hasNewPaymentErrors: false,
		loadingNewPayment: false,
	};

	return { ...defaultValue, ...data };
}

export function makeProviderPaymentFormValue(data: Partial<IProviderPaymentFormValue>): IProviderPaymentFormValue {
	const defaultValue: IProviderPaymentFormValue = {
		findContactFormState: {
			selectedTab: 0,
			formValue:  makeFindContactFormChangeEvent({}),
		},
		sourceAccount: makeAccount({}),
		destinationAccount: makeAccount({}),
		destinationContact: makeContact({}),
		currency: makeCurrency({}),
		amount: 0,
		executionDate: new Date(),
		paymentDescription: '',

	};

	return { ...defaultValue, ...data };
}
