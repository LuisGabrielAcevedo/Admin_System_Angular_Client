import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[mcyNoSpecialCharacters]'
})
export class NoSpecialCharactersDirective {
	constructor() {}
	@HostListener('keypress', ['$event'])
	keypress($event: KeyboardEvent): boolean {
		const patern = /[A-Za-z0-9]/;
		if ($event.code === 'Backspace') {
			return true;
		}
		if ($event.code === 'Semicolon') {
			return true;
		}
		if ($event.code === 'Space') {
			return true;
		}
		return patern.test($event.key);
	}

}
