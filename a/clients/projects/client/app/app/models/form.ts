export interface FormValue<T> {
	valid: boolean;
	value: T;
}

export interface IFindContactFormChangeEvent {
	cbvu?: string; 
	alias?: string;
	searchBy: 'cbvu' | 'alias'; 
}

export function makeFindContactFormChangeEvent(
	data: Partial<FormValue<IFindContactFormChangeEvent>>): FormValue<IFindContactFormChangeEvent> {
	const defaultValue: FormValue<IFindContactFormChangeEvent> = {
		valid: false,
		value: {
			searchBy: 'cbvu',
			alias: '',
			cbvu: ''
		}
	}

	return { ...defaultValue, ...data }
}
