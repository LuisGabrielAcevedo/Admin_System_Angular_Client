import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { IError } from '@mcy/main/models';

export interface ISignIn {
	token: string
}

export interface ISignInResponse extends IApiResponseObject<ISignIn> {}

export interface IUserAccount {
	user: string;
	password: string;
}

export interface IHttpErrorLogin {
	error: {
		code: string,
		description: string
	}
}

export interface ILoginState {
	token: string;
	documentNumber: string;
	cbvu: string; // TODO reevaluate
	documentType: string;
	error?: IError;
	isLoading: boolean;
}

export function makeLoginState(data: Partial<ILoginState>): ILoginState {
	const defaultValue: ILoginState = {
		token: '',
		documentNumber: '',
		cbvu: '',
		documentType: '',
		isLoading: false,
	};

	return { ...defaultValue, ...data };
}
