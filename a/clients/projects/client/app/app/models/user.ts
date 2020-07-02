import { IApiResponseObject, IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';
import { IEnterprise } from 'client/app/app/models';

export interface IUser {
	id: string;
	username: string;
	document: {
		number: string,
		type: string
	}
	name: string;
	firstName: string;
	lastName: string;
	cellPhone: string;
	email: string;
};

export interface IUserApp extends IUser {
	lastEntry: Date;
}

export interface IUserRequest extends IUser {
	signedDate: Date;
}

export interface IUserState {
	user: IUserApp;
	searchedUser: boolean;
	hasUserErrors: boolean;
	pages: ISignablePage[];
	isLoading: boolean;
	securityToken: string;
	permissions: string[];
	loadingPositiveValidation: boolean;
	hasUserPositiveValidationErrors: boolean;
	loadingPermissions: boolean;
	hasErrorsPermissions: boolean;
}

export interface ISignablePage {
	name: string;
	latest: string;
	html?: string;
	pageId: string;
	versionId: string;
}


export function makeSignablePage(data: Partial<ISignablePage>): ISignablePage {
	const defaultValue: ISignablePage = {
		name: '',
		latest: '',
		html: '',
		pageId: '',
		versionId: ''
	};

	return { ...defaultValue, ...data };
}

export function makeUser(data: Partial<IUser>): IUser {
	const defaultValue: IUser = {
		id: '',
		username: '',
		document: {
			number: '',
			type: ''
		},
		name: '',
		firstName: '',
		lastName: '',
		cellPhone: '',
		email: ''
	};

	return { ...defaultValue, ...data };
}

export interface ISignablePageState {
	termsAndConditions: {
		signed: boolean;
		data: ISignablePage;
	};
	welcome: {
		signed: boolean;
		data: ISignablePage;
	};
}

export function makeSignablePageState(data: Partial<ISignablePageState>): ISignablePageState {
	const defaultValue: ISignablePageState = {
		termsAndConditions: {
			signed: true,
			data: makeSignablePage({})
		},
		welcome: {
			signed: true,
			data: makeSignablePage({})
		}
	};

	return { ...defaultValue, ...data };
}

export function makeUserApp(data: Partial<IUserApp>): IUserApp {
	const defaultValue: IUserApp = {
		id: '',
		username: '',
		document: {
			number: '',
			type: ''
		},
		name: '',
		firstName: '',
		lastName: '',
		lastEntry: new Date(),
		cellPhone: '',
		email: ''
	};

	return { ...defaultValue, ...data };
}

export function makeUserRequest(data: Partial<IUserRequest>): IUserRequest {
	const defaultValue: IUserRequest = {
		id: '',
		username: '',
		document: {
			number: '',
			type: ''
		},
		name: '',
		firstName: '',
		lastName: '',
		signedDate: new Date(),
		cellPhone: '',
		email: ''
	};

	return { ...defaultValue, ...data };
}

export interface IUserResponse {
	id: string;
	username: string;
	documentNumber: string;
	documentType: string;
	firstName: string;
	lastName: string;
	cellPhone: string;
	email: string;
};

export function makeUserResponse(data: Partial<IUserResponse>): IUserResponse {
	const defaultValue: IUserResponse = {
		id: '',
		username: '',
		documentNumber: '',
		documentType: '',
		firstName: '',
		lastName: '',
		cellPhone: '',
		email: ''
	};

	return { ...defaultValue, ...data };
}

export function makeUserState(data: Partial<IUserState>): IUserState {
	const defaultValue: IUserState = {
		user: makeUserApp({}),
		searchedUser: false,
		hasUserErrors: false,
		pages: [makeSignablePage({})],
		isLoading: false,
		hasUserPositiveValidationErrors: false,
		loadingPositiveValidation: false,
		hasErrorsPermissions: false,
		loadingPermissions: false,
		permissions: [],
		securityToken: ''
	};

	return { ...defaultValue, ...data };
}

export interface IUserData {
	enterprises: IEnterprise[];
	user: IUserApp;
}

export interface IUserDataResponse {
	enterprises: IEnterprise[];
	enterpriseDefault: string;
	user: IUserResponse;
	pages: ISignablePage[];
}

export function makeUserDataResponse(data: Partial<IUserDataResponse>): IUserDataResponse {
	const defaultValue: IUserDataResponse = {
		enterprises: [],
		enterpriseDefault: '',
		user: makeUserResponse({}),
		pages: [makeSignablePage({})]
	};

	return { ...defaultValue, ...data };
}

export interface IProfileDataResponse extends IApiResponseObject<IUserDataResponse> { }

export interface IProfileUpdateResponse extends IApiResponseObject<IUserResponse> { }

export interface IUserPermissionsResponse extends IApiResponseArray<string> {}

export interface ISignPageResponse extends IApiResponseObject<ISignPageBFFResponse> { }

export interface ISignPageBFFResponse {
	message: string;
}


export function makeSignPageBffResponse(data: Partial<ISignPageBFFResponse>): ISignPageBFFResponse {
	const defaultValue: ISignPageBFFResponse = {
		message: ''
	};

	return { ...defaultValue, ...data };
}

export function makeSignPageResponse(data: Partial<ISignPageResponse>): ISignPageResponse {
	const defaultValue: ISignPageResponse = {
		status: [],
		data: makeSignPageBffResponse({})
	};

	return { ...defaultValue, ...data };
}

export function makeProfileDataResponse(data: Partial<IProfileDataResponse>): IProfileDataResponse {
	const defaultValue: IProfileDataResponse = {
		status: [],
		data: makeUserDataResponse({})
	};

	return { ...defaultValue, ...data };
}

export function makeProfileUpdateResponse(data: Partial<IProfileUpdateResponse>): IProfileUpdateResponse {
	const defaultValue: IProfileUpdateResponse = {
		status: [],
		data: makeUserResponse({}),
		success: true
	};

	return { ...defaultValue, ...data };
}

export interface ISoftTokenValidation {
	isValid: boolean;
}

export interface ISoftTokenValidationResponse extends IApiResponseObject<ISoftTokenValidation> { }
export interface ITokenGenerationResponse extends IApiResponseObject<{}> {};
