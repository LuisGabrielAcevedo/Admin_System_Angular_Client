import { Injectable } from '@angular/core';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';
import { REGEXP } from '@mcy/core/constants';

@Injectable()
export class UtilsService {
	public format: (...args: any[]) => string = format;
	public es: object = es;

	keypressNumber($event: KeyboardEvent) {
		const numbers = new RegExp('^[0-9]$');
		if ($event.code === 'Space') {
			return false;
		}
		if ($event.code === 'Backspace') {
			return false;
		}
		if ($event.code === 'Tab') {
			return false;
		}
		if (numbers.test($event.key)) {
			return true;
		}
		return false;
	}

	formatDate(date: Date, withHours?: boolean, customFormat?: string): string {
		const dateFormat = customFormat ? customFormat : 'dd MMM yyyy';
		const dateFullFormat: string = withHours ? `${dateFormat} HH:mm` : dateFormat;
		const dateWithoutTimezone: number = this.getDateWithoutTimezone(date);

		const fnsDate: string = this.format(dateWithoutTimezone, dateFullFormat, {locale: this.es});
		const formattedDate = fnsDate.toUpperCase();
		return formattedDate;
	}

	getDateWithoutTimezone(date: Date): number {
		const msDate: number = date.getTime();
		const msTimezoneOffset: number = date.getTimezoneOffset() * 60 * 1000;
		return msDate + msTimezoneOffset;
	}

	formatBffIsoDate(date: Date): string {
		const isoDate: string = date.toISOString();
		const index: number = isoDate.indexOf('T');
		return isoDate.substring(0, index);
	}

	formatProfileName(name: string): string {
		name = name.trim();
		const names = name.split(' ');
		return names.length > 1
			? names[0].charAt(0) + names[1].charAt(0)
			: name.charAt(0);
	}

	formatAccountNumber(value: string | undefined): string {
		if(value) {
			const lastValueCharacter = value.length;

			const firstPartAccount = value.substring(lastValueCharacter - 4, 0);
			const secondPartAccount = value.substring(lastValueCharacter - 1, lastValueCharacter - 4);
			const thirdPartAccount = value.substring(lastValueCharacter, lastValueCharacter - 1);

			const formattedAccount = `${firstPartAccount}-${secondPartAccount}/${thirdPartAccount}`;

			return formattedAccount;
		}
		return ''
	}

	formatAmount(value: number | string | undefined): string {
		const decimalsLength = 2;
		const formattedValue = value ? value.toString() : '';
		let numbers = formattedValue.split('.')[0]
			? formattedValue.split('.')[0]
			: '0';
		numbers = numbers.replace(REGEXP.DOTTED_NUMBER, '$1.');
		let decimals = formattedValue.split('.')[1]
			? formattedValue.split('.')[1].slice(0,decimalsLength)
			: '';
		while(decimals.length < decimalsLength) {
			decimals += '0';
		}
		return `${numbers},${decimals}`
	}

	copyToClipboard(item:string): void {
		const listener = (event: ClipboardEvent ) => {
			if(event.clipboardData){
				event.clipboardData.setData('text/plain', (item));
				event.preventDefault();
			}
		};
		document.addEventListener('copy', listener);
		document.execCommand('copy');
		document.removeEventListener('copy', listener);
	}

	removeSpecialCharater(text: string): string{
		return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
	}

	isEmptyValidResponse(res: IApiResponseArray<any> | IApiResponseObject<any>): boolean {
		return res.status.length > 0 && ( res.status[0].code.includes('404') || res.status[0].code.includes('400'));
	}

	censorText(value: string) {
		return value.replace(/.(?=.{4,}$)/g, '•');
	}
}
