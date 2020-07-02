import { Directive, HostListener } from '@angular/core';
import { REGEXP } from '../constants';

@Directive({
	selector: '[mcyAlias]'
})
export class AliasDirective {
	constructor() {}

	@HostListener('keypress', ['$event'])
	keypress($event: KeyboardEvent): boolean {
		return this.keypressCharacter($event);
	}

	keypressCharacter($event: KeyboardEvent) {
		const alias = new RegExp(`^${REGEXP.ALIAS}$`);
		if ($event.code === 'Space') {
			return false;
		}
		if ($event.code === 'Backspace') {
			return false;
		}
		if ($event.code === 'Tab') {
			return false;
		}

		return alias.test($event.key);
	}
}
