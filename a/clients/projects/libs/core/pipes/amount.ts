import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from 'libs/core/utils/utils.service';

@Pipe({
	name: 'mcyAmount'
})
export class AmountPipe implements PipeTransform {
	constructor(private utilsService: UtilsService) {}
	transform(value: number | string | undefined): string {
		return this.utilsService.formatAmount(value);
	}
}
