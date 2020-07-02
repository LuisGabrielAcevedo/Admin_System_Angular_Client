import { IContact, IAccount, makeContact, ITransfer, makeFindContactFormChangeEvent } from 'client/app/app/models';
import { IRequest } from 'client/app/app/models/request';
import { IFindContactFormState } from 'client/app/app/models/transfers';

export interface ISalaryPaymentFormValue {
	findContactFormState: IFindContactFormState;
	contact: IContact;
	account?: IAccount;
	momentExecution?: string;
	date: Date;
	description: string;
	amount: number;
	panel: string;
	tab: number;
}

export interface ISalaryPaymentState {
	newSalaryPaymentFormValue: ISalaryPaymentFormValue;
	salaryPayments: ITransfer[];
	searchedSalaryPayments: boolean;
	loading: boolean;
	hasSalaryPaymentErrors: boolean;
	lastSalaryPayment: IRequest | null;
	loadingNewPayment: boolean;
	hasNewPaymentErrors: boolean;
}

export function makeSalaryPaymentFormValue(data: Partial<ISalaryPaymentFormValue>): ISalaryPaymentFormValue {
	const defaultValue: ISalaryPaymentFormValue = {
		findContactFormState: {
			selectedTab: 0,
			formValue:  makeFindContactFormChangeEvent({}),
		},
		contact: makeContact({}),
		account: undefined,
		date: new Date(),
		description: '',
		amount: 0,
		tab: 0,
		panel: '0'
	};

	return { ...defaultValue, ...data };
}

export function makeSalaryPaymentState(data: Partial<ISalaryPaymentState>): ISalaryPaymentState {
	const defaultValue: ISalaryPaymentState = {
		newSalaryPaymentFormValue: makeSalaryPaymentFormValue({}),
		salaryPayments: [],
		searchedSalaryPayments: false,
		loading: false,
		hasSalaryPaymentErrors: false,
		lastSalaryPayment: null,
		loadingNewPayment: false,
		hasNewPaymentErrors: false,
	};

	return { ...defaultValue, ...data };
}
