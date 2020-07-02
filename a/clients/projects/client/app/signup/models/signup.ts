import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface ISignupState {
	signupFormValue: ISignupFormValue;
	isPositiveValidationLoading: boolean;
	isSignupLoading: boolean;
	hasPositiveValidationErrors: boolean;
	isPositiveValidationValid: boolean;
	hasUserForgotCredentials: boolean;
}

export interface IUserDocumentType {
	code: string;
	documentType: string;
	description: string;
}

export interface IDocument {
	documentNumber: string;
	documentType: IUserDocumentType;
}

export interface IDocumentSuccess {
	isValid: boolean;
}

export interface IUsernameValidation {
	isValid: boolean;
}

export interface IUserRegistration {}

export interface IDocumentResponse extends IApiResponseObject<IDocumentSuccess> {}

export interface IUsernameValidationResponse extends IApiResponseObject<IUsernameValidation> {};

export interface IUserRegistrationResponse extends IApiResponseObject<IUserRegistration> {};

export interface IPositiveValidationResponse extends IApiResponseObject<IPositiveValidationBff> {};

export interface IPositiveValidationBff {
	token: string;
}

export interface ISignupFormValue {
	documentType: IUserDocumentType;
	documentNumber: string;
	username: string;
	password: string;
	token: string;
}

export interface ISignupBFF {
	documentNumber: string;
	documentType: string;
	password: string;
	username: string;
}

export interface IDocumentBff {
	type: string;
	number: string;
}

export function makeDocumentBff(data: Partial<IDocumentBff>): IDocumentBff {
	const defaultValue: IDocumentBff = {
		number: '',
		type: ''
	};

	return { ...defaultValue, ...data };
}

export function adaptDocument(data: any): IUserDocumentType {
	return makeUserDocumentType({
		...data
	});
}

export function makeDocument(data: Partial<IDocument>): IDocument {
	const defaultValue: IDocument = {
		documentNumber: '',
		documentType: makeUserDocumentType({})
	};

	return { ...defaultValue, ...data };
}

export function makeUserDocumentType(data: Partial<IUserDocumentType>): IUserDocumentType {
	const defaultValue: IUserDocumentType = {
		code: '',
		documentType: '',
		description: '',
	};

	return { ...defaultValue, ...data };
}

export function makeSignupFormValue(data: Partial<ISignupFormValue>): ISignupFormValue {
	const defaultValue: ISignupFormValue = {
		documentType: makeUserDocumentType({}),
		documentNumber: '',
		username: '',
		password: '',
		token: ''
	};

	return { ...defaultValue, ...data };
}

export function makeSignupBffData(data: Partial<ISignupBFF>): ISignupBFF {
	const defaultValue: ISignupBFF = {
		documentNumber: '',
		documentType: '',
		password: '',
		username: ''
	};

	return { ...defaultValue, ...data };
}

export function makeUserRegistrationResponse(data: Partial<IUserRegistrationResponse>): IUserRegistrationResponse {
	const defaultValue: IUserRegistrationResponse = {
		status: [],
		data: {}
	};

	return { ...defaultValue, ...data };
}

export function makePositiveValidationResponse(data: Partial<IPositiveValidationResponse>): IPositiveValidationResponse {
	const defaultValue: IPositiveValidationResponse = {
		status: [],
		data: {
			token: ''
		}
	};

	return { ...defaultValue, ...data };
}

export function adaptUserDataToBFF(userData: ISignupFormValue): ISignupBFF {
	const adaptedContact: ISignupBFF = {
		documentNumber: userData.documentNumber,
		documentType: userData.documentType.documentType,
		password: userData.password,
		username: userData.username
	};

	return adaptedContact;
}

export function makeSignupState(data: Partial<ISignupState>): ISignupState {
	const defaultValue: ISignupState = {
		signupFormValue: makeSignupFormValue({}),
		isPositiveValidationLoading: false,
		isSignupLoading: false,
		hasPositiveValidationErrors: false,
		isPositiveValidationValid: true,
		hasUserForgotCredentials: false
	};

	return { ...defaultValue, ...data };
}
