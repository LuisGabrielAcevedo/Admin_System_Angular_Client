import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'mcyCbuToAccount'
})
export class CbuToAccount implements PipeTransform {
	constructor() {}
	transform(value: string | undefined): string {
		if (value) {
			const account = value.substring(10, value.length - 1);
			return account;
		}
		return '';
	}
}