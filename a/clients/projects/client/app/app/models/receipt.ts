import { IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

export interface IReceiptPdf {
	id: string;
	file: string; // Content-type application pdf base64
}

export interface IReceiptPdfResponse extends IApiResponseObject<IReceiptPdf> {}

export function makeReceiptPdf(data: Partial<IReceiptPdf>) {
	const defaultValue: IReceiptPdf = {
		id: '',
		file: ''
	};

	return { ...defaultValue, ...data };
}

