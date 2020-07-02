import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from 'libs/core/utils/utils.service';

@Pipe({
	name: 'mcyAccountNumber'
})
export class AccountNumberPipe implements PipeTransform {
	constructor(private utilsService: UtilsService) {}
	transform(value: string | undefined): string {
		if (value) {
			return this.utilsService.formatAccountNumber(value);
		}
		return '';
	}
}