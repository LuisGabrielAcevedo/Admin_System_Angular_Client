import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Utils } from '@mcy/main/polyfills';

@Injectable()
export class FormValidationsService {
	isObject(control: AbstractControl): ValidationErrors | null {
		const valid = Utils.isObject(control.value);
		return valid ? null : { isObject: true };
	}
}
