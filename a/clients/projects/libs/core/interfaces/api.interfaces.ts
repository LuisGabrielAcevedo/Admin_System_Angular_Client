export interface IApiStatusResponse {
	code: string;
	message: string;
	traceId?: string;
}

export interface IApiResponseBase {
	status: IApiStatusResponse[];
	success?: boolean;
}

export interface IApiResponseObject<T> extends IApiResponseBase {
	data: T;
}

export interface IApiResponseArray<T> extends IApiResponseBase {
	data: T[];
}

export enum ApiStatusCode {
	success = '000',
	warning = '422'
}

export interface IHttpError {
	message: string;
}
