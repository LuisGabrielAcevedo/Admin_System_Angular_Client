import { IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';

export interface ISignCapacity {
	id: string;
	signAllowed: boolean;
	signed?: boolean;
}

export interface ISavedSignatures{
	[key: string]: ISignCapacity
}

export interface ISignState {
	searchedSignatures: ISavedSignatures;
}

export function makeSignState(data: Partial<ISignState>): ISignState {
	const defaultValue: ISignState = {
		searchedSignatures: {}
	};
	return { ...defaultValue, ...data };
}

export interface ISignCapacityResponse extends IApiResponseArray<ISignCapacity> {}