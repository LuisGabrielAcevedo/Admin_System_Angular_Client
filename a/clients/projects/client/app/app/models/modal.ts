import { IContact, makeContact, CSVFilter } from './contact';
import { IEmployee, makeEmployee } from 'client/app/app/models/employee';
import { IRequest, makeRequest } from './request';

export interface IModal {
	component: any;
	title?: string;
}

export interface IDeleteContactModal extends IModal {
	cancel: string;
	confirm: string;
	contact: IContact;
	onCancel: () => void;
	onClose: () => void;
	onConfirm: () => void;
}

export interface IWelcomeModal extends IModal {
	pageId: string;
	userId: string;
	versionId: string;
	showOnboarding: boolean;
	onConfirm: () => void;
}

export interface IExportCSVModal extends IModal {
	cancel: string;
	confirm: string;
	onCancel: () => void;
	onClose: () => void;
	onConfirm: (filter: CSVFilter) => void;
}

export interface ITermsAndConditionsModal extends IModal {
	onConfirm: () => void;
	onCancel: () => void;
	tycDescription: string;
	confirm: string,
	userId: string;
	username: string;
	cancel: string;
	versionId: string;
	pageId: string;
}

export interface ICancelRequestModal extends IModal {
	request: IRequest;
	cancel: string;
	confirm: string;
	onCancel: () => void;
	onConfirm: () => void;
}

export interface ITokenExpirationModal extends IModal {
	username: string;
}

export interface ISalaryPaymentCancelModal extends IModal {
	cancel: string;
	confirm: string;
	onCancel: () => void;
	onConfirm: () => void;
}

export interface IuncoverAmountModal extends IModal {
	cancel: string;
	confirm: string;
	onCancel: () => void;
	onConfirm: (check: boolean) => void;
}

export interface IToggleBindModal extends IModal {
	cancel: string;
	confirm: string;
	employee: IEmployee;
	onCancel: () => void;
	onClose: () => void;
	onConfirm: () => void;
}


export interface INeedHelpModal extends IModal {
	onClose: () => void;
}

export function makeModal(data: Partial<IModal>) {
	const defaultValue: IModal = {
		component: null,
		title: ''
	};

	return { ...defaultValue, ...data };
}

export function makeDeleteContactModal(data: Partial<IDeleteContactModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: IDeleteContactModal = {
		...modal,
		onConfirm: () => {},
		onCancel: () => {},
		onClose: () => {},
		contact: makeContact({}),
		confirm: '',
		cancel: ''
	};

	return { ...defaultValue, ...data };
}



export function makeExportCSVModal(data: Partial<IExportCSVModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: IExportCSVModal = {
		...modal,
		onClose: () => {},
		onConfirm: () => {},
		onCancel: () => {},
		confirm: '',
		cancel: ''
	};

	return { ...defaultValue, ...data };
}

export function makeTokenExpirationModal(data: Partial<ITokenExpirationModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: ITokenExpirationModal = {
		...modal,
		username: ''
	};

	return { ...defaultValue, ...data };
}

export function makeWelcomeModal(data: Partial<IWelcomeModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: IWelcomeModal = {
		...modal,
		onConfirm: () => {},
		userId: '',
		versionId: '',
		pageId: '',
		showOnboarding: false
	};

	return { ...defaultValue, ...data };
}

export function makeTermsAndConditionsModal(data: Partial<ITermsAndConditionsModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: ITermsAndConditionsModal = {
		...modal,
		onConfirm: () => {},
		onCancel: () => {},
		tycDescription: '',
		username: '',
		confirm: '',
		userId: '',
		cancel: '',
		versionId: '',
		pageId: ''
	};

	return { ...defaultValue, ...data };
}

export function makeSalaryPaymentCancelModal(data: Partial<ISalaryPaymentCancelModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: ISalaryPaymentCancelModal = {
		...modal,
		onConfirm: () => {},
		onCancel: () => {},
		confirm: '',
		cancel: ''
	};

	return { ...defaultValue, ...data };
}

export function makeCancelRequestModal(data: Partial<ICancelRequestModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: ICancelRequestModal = {
		...modal,
		request: makeRequest({}),
		onConfirm: () => {},
		onCancel: () => {},
		confirm: '',
		cancel: ''
	};

	return { ...defaultValue, ...data };
}

export function makeUncoverAmountModal(data: Partial<IuncoverAmountModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: IuncoverAmountModal = {
		...modal,
		onConfirm: () => {},
		onCancel: () => {},
		confirm: '',
		cancel: ''
	};

	return { ...defaultValue, ...data };
}

export function makeToggleBindModal(data: Partial<IToggleBindModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: IToggleBindModal = {
		...modal,
		onConfirm: () => {},
		onCancel: () => {},
		onClose: () => {},
		employee: makeEmployee({}),
		confirm: '',
		cancel: ''
	};

	return { ...defaultValue, ...data };
}


export function makeNeedHelpModal(data: Partial<INeedHelpModal>) {
	const modal: IModal = makeModal({});
	const defaultValue: INeedHelpModal = {
		...modal,
		onClose: () => {}
	};

	return { ...defaultValue, ...data };
}
