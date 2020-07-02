import { Directive, HostListener } from '@angular/core';
import { REGEXP } from '@mcy/core/constants/index';

@Directive({
	selector: '[mcyOnlyNumbers]'
})
export class OnlyNumbersDirective {
	constructor() {}

	@HostListener('keypress', ['$event'])
	keypress($event: KeyboardEvent): boolean {
		return this.keypressNumber($event);
	}

	keypressNumber($event: KeyboardEvent) {
		const numbers = new RegExp(REGEXP.NUMERIC);
		if ($event.code === 'Space') {
			return false;
		}
		if ($event.code === 'Backspace') {
			return false;
		}
		if ($event.code === 'Tab') {
			return false;
		}

		return numbers.test($event.key);
	}

	@HostListener('paste', ['$event'])
	onPaste($event: ClipboardEvent ): boolean {
		return this.isPasteValid($event)
	}

	isPasteValid($event: ClipboardEvent ) {
		const numbers = new RegExp(REGEXP.NUMERIC);
		if($event.clipboardData){
			return numbers.test($event.clipboardData.getData('text'));
		}		
		return false
	}
}
