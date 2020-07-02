import { IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';

export interface IServiceCategoryBase {
	id: string;
	description: string;
}

export interface IServiceCategory extends IServiceCategoryBase {
	type: string;
	suggestOrder: number;
}

export function makeServiceCategory(data: Partial<IServiceCategory>): IServiceCategory {
	const defaultValue: IServiceCategory = {
		id: '',
		description: '',
		suggestOrder: 0,
		type: ''
	};
	return { ...defaultValue, ...data };
}

export function makeServiceCategoryBase(data: Partial<IServiceCategoryBase>): IServiceCategoryBase {
	const defaultValue: IServiceCategoryBase = {
		id: '',
		description: ''
	};
	return { ...defaultValue, ...data };
}

export interface IServiceCategoriesResponse extends IApiResponseArray<IServiceCategory> {}

export interface IServiceCategoryState {
	categories: IServiceCategory[];
	searchedCategories: boolean;
	loading: boolean;
	hasErrorCategories: boolean;
}

export function makeServiceCategoryState(data: Partial<IServiceCategoryState>) {
	const defaultValue: IServiceCategoryState = {
		categories: [],
		searchedCategories: false,
		loading: false,
		hasErrorCategories: false
	};
	return { ...defaultValue, ...data };
}
