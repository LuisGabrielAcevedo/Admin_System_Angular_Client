import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Utils } from '@mcy/main/polyfills';

export class IsObjectValidator {
	static valid(control: AbstractControl) : ValidationErrors | null {
		const valid = Utils.isObject(control.value);
		return valid ? null : { isObject: true };
	}
}
