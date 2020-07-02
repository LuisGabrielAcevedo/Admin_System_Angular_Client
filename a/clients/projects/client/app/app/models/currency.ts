export interface ICurrency {
	code: string;
	symbol: string;
	description: string;
}

export function makeCurrency(data: Partial<ICurrency>): ICurrency {
	const defaultValue: ICurrency = {
		code: '',
		symbol: '',
		description: ''
	};

	return { ...defaultValue, ...data };
}
