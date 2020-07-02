import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class FormValidationsServiceMock {
	isObject(_control: AbstractControl): ValidationErrors | null {
		return null;
	}
}
