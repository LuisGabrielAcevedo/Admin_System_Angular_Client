import { AbstractControl } from '@angular/forms';

export class CbvuValidator {
	static valid(control: AbstractControl): { [key: string]: any } | null {
		const numbers = new RegExp('^[0-9]*$');
		const length = 22;

		if (control.value.length > length || !numbers.test(control.value)) {
			return { cbvuformat: true };
		}

		if (control.value.length < length) {
			return { cbvuformat: true, missings: length - control.value.length };
		}

		return null;
	}
}
