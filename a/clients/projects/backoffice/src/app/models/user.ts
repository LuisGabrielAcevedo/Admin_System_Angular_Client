import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export type RoleType = 'ADMINISTRADOR' | 'CONSULTOR' | 'OPERADOR' | 'SUPERADMIN';

export interface IEnterprise {
	id: string;
	name: string;
	cuilt: string;
	users: IEnterpriseUser[];
}

export interface IEnterpriseUser {
	id: string;
	documentType: string;
	documentNumber: string;
	firstName: string;
	lastName: string;
	username: string;
	enterpriseRole: 'ADMINISTRADOR' | 'CONSULTOR' | 'OPERADOR' | 'SUPERADMIN'
}

export interface IUser {
	id: string;
	username: string;
	documentNumber: string;
	documentType: string;
	cellPhone: string;
	email: string;
	lastName: string;
	firstName: string;
}

export interface IUserEnterprise {
	id: string;
	cuilt: string;
	name: string;
	role: RoleType;
}

export interface IUserDetails extends IUser {
	softTokenState: 'ACTIVO' | 'SIN_REGISTRO' | 'EN_PROCESO' | 'BLOQUEADO' | 'VENCIDO';
	favoriteEnterpriseId: string;
	enterprises: IUserEnterprise[];
}

export interface IUserState {
	users: IUser[],
	userSelected: IUserDetails
	enterprise: IEnterprise | null,
	searchedEnterprise: boolean;
	loadingEnterprise: boolean;
	hasEnterpriseErrors: boolean;
	searchedUser: boolean;
	loadingUser: boolean;
	hasUserErrors: boolean;
	searchedUserDetails: boolean;
	loadingUserDetails: boolean;
	hasUserErrorsDetails: boolean;
}

export function makeUser(data: Partial<IUser>) {
	const defaultValue: IUser = {
		id: '',
		username: '',
		documentNumber: '',
		documentType: '',
		cellPhone: '',
		email: '',
		lastName: '',
		firstName: ''
	}

	return { ...defaultValue, ...data };
}

export function makeUserEnterprise(data: Partial<IUserEnterprise>) {
	const defaultValue: IUserEnterprise = {
		id: '',
		cuilt: '',
		name: '',
		role: 'OPERADOR'
	}

	return { ...defaultValue, ...data };
}

export function makeUserDetails(data: Partial<IUserDetails>) {
	const defaultValue: IUserDetails = {
		...makeUser({}),
		softTokenState: 'SIN_REGISTRO',
		favoriteEnterpriseId: '',
		enterprises: []
	}

	return { ...defaultValue, ...data };
}

export function makeEnterprise(data: Partial<IEnterprise>): IEnterprise {
	const defaultValue: IEnterprise = {
		cuilt: '',
		id: '',
		name: '',
		users: []
	};

	return { ...defaultValue, ...data };
}

export function makeUserState(data: Partial<IUserState>) {
	const defaultValue: IUserState = {
		users: [],
		userSelected: makeUserDetails({}),
		enterprise: null,
		searchedEnterprise: false,
		loadingEnterprise: false,
		hasEnterpriseErrors: false,
		searchedUser: false,
		loadingUser: false,
		hasUserErrors: false,
		searchedUserDetails: false,
		loadingUserDetails: false,
		hasUserErrorsDetails: false,
	};

	return { ...defaultValue, ...data };
}

export interface IEnterpriseResponse extends IApiResponseObject<Partial<IEnterprise>> {};
export interface IUserData { users: IUserDetails[] }
export interface IUserResponse extends IApiResponseObject<IUserData> {};
export interface IUsersData { users: IUser[] }
export interface IUsersResponse extends IApiResponseObject<IUsersData> {};
