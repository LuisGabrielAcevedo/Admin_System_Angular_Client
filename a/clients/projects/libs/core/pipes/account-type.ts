import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mcyAccountType'
})
export class AccountTypePipe implements PipeTransform {
	constructor() {}
	transform(value: string | undefined): string {
		if (value) {
			const type = value.substring(8, 9);

			if (type === '1') {
				return 'CC';
			}

			if(type === '2') {
				return 'CA';
			}
		}
		return '';
	}
}