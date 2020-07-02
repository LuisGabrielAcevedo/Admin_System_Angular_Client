import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from 'libs/core/utils/utils.service';

@Pipe({
	name: 'mcyCensored'
})
export class CensoredPipe implements PipeTransform {
	constructor(private utilsService: UtilsService) {}
	transform(value: string): string {
		return this.utilsService.censorText(value);
	}
}
