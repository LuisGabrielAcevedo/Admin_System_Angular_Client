import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface IConcept {
	code: string;
	description: string;
	swornDeclaration: boolean;
}

export interface IConceptState {
	concepts: IConcept[]
}

export interface IConceptResponse extends IApiResponseObject<IConcept[]> {}

export function makeConcept(data: Partial<IConcept>): IConcept {
	const defaultValue: IConcept = {
		code: '',
		description: '',
		swornDeclaration: false
	};

	return { ...defaultValue, ...data };
}

export function makeConceptState(data: Partial<IConceptState>): IConceptState {
	const defaultValue: IConceptState = {
		concepts: []
	};

	return { ...defaultValue, ...data };
}