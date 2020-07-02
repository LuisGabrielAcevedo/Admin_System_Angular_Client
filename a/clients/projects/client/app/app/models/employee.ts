import { IUser, makeUser } from './user';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface IEmployee {
	user: IUser;
	linkedState: 'ACTIVO' | 'INACTIVO' | 'PENDIENTE_ACTIVACION';
	role: 'ADMIN' | 'CONSULTOR' | 'OPERADOR';
}

export interface IEmployeesState {
	employees: IEmployee[];
	loading: boolean;
	loadingUpdateEmployee: boolean;
	hasErrors: boolean;
	searchedEmployee: boolean;
}

export interface IEmployeeBFF {
	id: string;
	documentNumber: string;
	documentType: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	username: string;
	linkedState: 'ACTIVO' | 'INACTIVO' | 'PENDIENTE_ACTIVACION';
	role: 'ADMIN' | 'CONSULTOR' | 'OPERADOR';
}

export interface IEmployeeResponse extends IApiResponseArray<IEmployeeBFF> {}

export interface IEmployeeObjectResponse extends IApiResponseObject<IEmployeeBFF> {}

export function makeEmployeeBFFResponse(data: Partial<IEmployeeBFF>): IEmployeeBFF {
	const defaultValue: IEmployeeBFF = {
		id: '',
		documentNumber: '',
		documentType: '',
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		username: '',
		linkedState: 'ACTIVO',
		role: 'ADMIN'
	}

	return { ...defaultValue, ...data }

}

export function makeEmployeeResponse(data: Partial<IEmployeeResponse>): IEmployeeResponse {
	const defaultValue: IEmployeeResponse = {
		status: [],
		data: [
			makeEmployeeBFFResponse({})
		],
		success: true
	}

	return { ...defaultValue, ...data }

}

export function makeEmployeeObjectResponse(data: Partial<IEmployeeObjectResponse>): IEmployeeObjectResponse {
	const defaultValue: IEmployeeObjectResponse = {
		status: [],
		data: makeEmployeeBFFResponse({}),
		success: true
	}

	return { ...defaultValue, ...data }

}

export function makeEmployee(data: Partial<IEmployee>): IEmployee {
	const defaultValue: IEmployee = {
		user: makeUser({}),
		linkedState: 'ACTIVO',
		role: 'ADMIN'
	};

	return { ...defaultValue, ...data };
}

export function makeEmployeesState(data: Partial<IEmployeesState>): IEmployeesState {
	const defaultValue: IEmployeesState = {
		employees: [],
		loading: false,
		loadingUpdateEmployee: false,
		hasErrors: false,
		searchedEmployee: false
	};

	return { ...defaultValue, ...data };
}

export function adaptEmployee(data: IEmployee): IEmployeeBFF {
	return makeEmployeeBFFResponse({
		documentNumber: data.user.document.number,
		documentType: data.user.document.type,
		email: data.user.email,
		linkedState: data.linkedState,
		firstName: data.user.firstName,
		lastName: data.user.lastName,
		phone: data.user.cellPhone,
		role: data.role,
		username: data.user.username
	});
}

export function adaptEmployeeBFF(data: IEmployeeBFF): IEmployee {
	return makeEmployee({
		user: makeUser({
			id: data.id,
			username: data.username,
			document: {
				number: data.documentNumber,
				type: data.documentType
			},
			name: `${data.firstName} ${data.lastName}`.trim() ,
			firstName: data.firstName,
			lastName: data.lastName,
			cellPhone: data.phone,
			email: data.email
		}),
		linkedState: data.linkedState,
		role: data.role
	});
}
