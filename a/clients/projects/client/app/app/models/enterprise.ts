export interface IEnterprise {
	id: string;
	name: string;
	cuilt: string;
	address: string;
	number: string;
	phoneNumber: string;
	enterpriseType: string
}

export interface IEnterpriseState {
	enterprises: IEnterprise[];
	searchedEnterprises: boolean;
	selectedEnterprise: IEnterprise;
	enterpriseDefault: string;
	hasEnterpriseErrors: boolean;
	isLoading: boolean;
}

export interface IEnterpriseDefaultData {
	username: string
	enterpriseDefault: string
}

export function makeEnterprise(data: Partial<IEnterprise>): IEnterprise {
	const defaultValue: IEnterprise = {
		id: '',
		name: '',
		cuilt: '',
		address: '',
		number: '',
		phoneNumber: '',
		enterpriseType: ''
	};

	return { ...defaultValue, ...data };
}

export function makeEnterpriseState(data: Partial<IEnterpriseState>): IEnterpriseState {
	const defaultValue: IEnterpriseState = {
		enterprises: [],
		searchedEnterprises: false,
		selectedEnterprise: makeEnterprise({}),
		enterpriseDefault: '',
		hasEnterpriseErrors: false,
		isLoading: false
	};

	return { ...defaultValue, ...data };
}
