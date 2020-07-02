import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { PasswordService } from './password.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { IUsernameValidationResponse } from 'client/app/signup/models/signup';
import { XHRService } from '@mcy/main/services/xhr.service';

@Injectable()
export class ValidatorService {

	private previousUsernameValidationValue = '';
	private previousUsernameValidationResult: ValidationErrors | null = null;

	constructor(
		private xhrService: XHRService,
		private passwordService: PasswordService,
	) {}

	// SYNCRONIC VALIDATORS
	PasswordValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const valid = this.passwordService.getLevel(control.value) > 0;
			return valid ? null : { invalid: {value: control.value} };
		};
	}

	noWhitespaceValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value || '';
			const isWhitespace = value.startsWith(' ') || value.endsWith(' ') || value.includes('  ');
			return !isWhitespace ? null : { invalid: {value: control.value} };
		}
	}

	EqualToField(key: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const form = control.parent;
			if (!form) return null;
			return form.value[key] === control.value ? null : { equalToField: { value: control.value } };
		}
	}

	// ASYNCRONIC VALIDATORS
	DuplicateUsernameAsyncValidator(): AsyncValidatorFn {
		return (control: AbstractControl) => {
			if (this.previousUsernameValidationValue !== control.value) {
				return this.validateUsername(control.value).pipe(
					map(isValid => { 
						this.previousUsernameValidationResult = isValid ? null : { duplicateUsername: true };
						this.previousUsernameValidationValue = control.value;
						return isValid ? null : { duplicateUsername: true} } ),
				)
			} else {
				return of(this.previousUsernameValidationResult);
			}
		};
	}

	validateUsername(username: string): Observable<boolean> {
		return this.xhrService.get('v1/registrations/registration/check', {
			params: { username }
		}).pipe(
			map(response => (response as IUsernameValidationResponse).data.isValid )
		)
	}
 	
}
