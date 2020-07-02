import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface ISignIn {
	token: string;
}

export interface ISignInResponse extends IApiResponseObject<ISignIn> {}

export interface IUserAccount {
	user: string;
	password: string;
}

export interface ISesionData {
	username: string;
	token: string;
}

export interface IUserAccountResponse {
	success: boolean;
	messages: string[];
}


export function makeUserAccount(data: Partial<IUserAccount>): IUserAccount {
	const defaultValue: IUserAccount = {
		user: '',
		password: ''
	};

	return { ...defaultValue, ...data };
}

export function makeSignIn(data: Partial<ISignIn>): ISignIn {
	const defaultValue: ISignIn = {
		token: ''
	};

	return { ...defaultValue, ...data };
}

export function makeUserAccountResponse(data: Partial<IUserAccountResponse>): IUserAccountResponse {
	const defaultValue: IUserAccountResponse = {
		success: false,
		messages: []
	};

	return { ...defaultValue, ...data };
}

export function makeSesionData(data: Partial<ISesionData>): ISesionData {
	const defaultValue: ISesionData = {
		username: '',
		token: ''
	};

	return { ...defaultValue, ...data };
}
