import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DynamicFormValidations {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }

    static confirmValidator(control2: AbstractControl, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const valid = control.value === control2.value;
            return valid ? null : error;
        };
    }
}