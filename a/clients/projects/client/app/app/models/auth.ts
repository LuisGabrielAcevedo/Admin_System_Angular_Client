import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface ILogoutResponse extends IApiResponseObject<ILogoutBffResponse>{}

export interface ILogoutBffResponse {
	message?: string;
}