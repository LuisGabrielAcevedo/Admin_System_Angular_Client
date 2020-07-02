import { Injectable } from '@angular/core';
import { IApiResponseArray, IApiResponseObject } from '@mcy/core/interfaces/api.interfaces';

@Injectable()
export class UtilsServiceMock {
	keypressNumber(_$event: KeyboardEvent) {
		return true;
	}

	formatDate(_date: Date): string {
		return '';
	}

	formatAmount(_value: number | string | undefined): string {
		return '';
	}

	openTabByUrl(_url: string) {
		return '';
	}

	formatBffIsoDate(_date: Date): string {
		return '';
	}

	copyToClipboard(_item: string): void {}

	formatProfileName(_name: string): string {
		return '';
	}

	getDateWithoutTimezone(_date: Date): number {
		return 0;
	}

	removeSpecialCharater(_item: string): string{
		return '';
	}

	isEmptyValidResponse(_res: IApiResponseArray<any> | IApiResponseObject<any>): boolean {
		return true;
	}

	formatAccountNumber(_value: string): string {
		return '';
	}

	censorText(_value: string) {
		return ''
	}
}

