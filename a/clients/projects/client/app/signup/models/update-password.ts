import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface IUpdatePasswordState {
	userName: string;
	oldPassword: string;
	newPassword: string;
	isLoading: boolean;
	hasErrors: boolean;
}

export function makeUpdatePasswordState(data: Partial<IUpdatePasswordState>): IUpdatePasswordState {
	const defaultValue: IUpdatePasswordState = {
		userName: '',
		oldPassword: '',
		newPassword: '',
		isLoading: false,
		hasErrors: false
	};

	return { ...defaultValue, ...data };
}

export interface UpdatePasswordResponse extends IApiResponseObject<IUpdatePasswordState>{}
