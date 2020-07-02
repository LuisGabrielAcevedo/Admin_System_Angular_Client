export interface IBank {
	id: string;
	name: string;
}

export function makeBank(data: Partial<IBank>): IBank {
	const defaultValue: IBank = {
		id: '',
		name: ''
	};

	return { ...defaultValue, ...data };
}
