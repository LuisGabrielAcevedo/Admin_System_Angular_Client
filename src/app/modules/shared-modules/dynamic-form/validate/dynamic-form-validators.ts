import { DynamicFormValidator } from './dynamin-form-validator';
import { Validators, FormGroup } from '@angular/forms';
import { DynamicFormValidationsFunctions } from './dynamic-form-validations';
import { Observable } from 'rxjs';
import { AsyncValidatorCallback } from '../dynamic-form.interfaces';

export class DynamicFormValidators {
    public static required(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'required',
            data && data.message ? data.message : 'The field is required',
            (form: FormGroup) => Validators.required
        );
    }

    public static requiredTrue(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'required',
            data && data.message ? data.message : 'The field is required',
            (form: FormGroup) => Validators.requiredTrue
        );
    }

    public static email(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'email',
            data && data.message ? data.message : 'Please enter a valid email address',
            (form: FormGroup) => Validators.email
        );
    }

    public static minLength(data: ValidatorDataWithValue | number): DynamicFormValidator {
        const value: number = typeof data === 'object' ? data.value : data;
        const message: string = typeof data === 'object' ? data.message : null;
        return new DynamicFormValidator(
            'minLength',
            message || `Must be at least ${value} characters`,
            (form: FormGroup) => Validators.minLength(value)
        );
    }

    public static maxLength(data: ValidatorDataWithValue): DynamicFormValidator {
        const value: number = typeof data === 'object' ? data.value : data;
        const message: string = typeof data === 'object' ? data.message : null;
        return new DynamicFormValidator(
            'maxLength',
            message || `It must not contain more than ${value} characters`,
            (form: FormGroup) => Validators.maxLength(value)
        );
    }

    public static min(data: ValidatorDataWithValue | number): DynamicFormValidator {
        const value: number = typeof data === 'object' ? data.value : data;
        const message: string = typeof data === 'object' ? data.message : null;
        return new DynamicFormValidator(
            'min',
            message || `The number must be greater than ${value}`,
            (form: FormGroup) => Validators.min(value)
        );
    }

    public static max(data: ValidatorDataWithValue | number): DynamicFormValidator {
        const value: number = typeof data === 'object' ? data.value : data;
        const message: string = typeof data === 'object' ? data.message : null;
        return new DynamicFormValidator(
            'max',
            message || `The number must be less than ${value}`,
            (form: FormGroup) => Validators.max(value)
        );
    }

    public static digits(data: ValidatorDataWithValue | number): DynamicFormValidator {
        const value: number = typeof data === 'object' ? data.value : data;
        const message: string = typeof data === 'object' ? data.message : null;
        return new DynamicFormValidator(
            'digits',
            message || `Must contain only ${value} digits`,
            (form: FormGroup) => DynamicFormValidationsFunctions.digitsValidator(value, {digits: true})
        );
    }

    public static hasNumber(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'hasNumber',
            data && data.message ? data.message : 'Must contain at least 1 number',
            (form: FormGroup) => DynamicFormValidationsFunctions.patternValidator(/\d/, { hasnumber: true })
        );
    }

    public static hasCapitalCase(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'hasCapitalCase',
            data && data.message ? data.message : 'Must contain at least 1 in Capital Case',
            (form: FormGroup) => DynamicFormValidationsFunctions.patternValidator(/[A-Z]/, { hascapitalcase: true })
        );
    }

    public static onlyCapitalCase(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'onlyCapitalCase',
            data && data.message ? data.message : 'Must contain only uppercase',
            (form: FormGroup) => DynamicFormValidationsFunctions.patternValidator(/^[A-Z ]+$/, { onlycapitalcase: true })
        );
    }

    public static hasSmallCase(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'hasSmallCase',
            data && data.message ? data.message : 'Must contain at least 1 Letter in Small Case',
            (form: FormGroup) => DynamicFormValidationsFunctions.patternValidator(/[a-z]/, { hassmallcase: true })
        );
    }

    public static hasSpecialCharacters(data?: ValidatorData): DynamicFormValidator {
        return new DynamicFormValidator(
            'hasSpecialCharacters',
            data && data.message ? data.message : 'Must contain at least 1 Special Character',
            (form: FormGroup) => DynamicFormValidationsFunctions.patternValidator(/[*@!#%&()^~{},.?¿¡]+/, { hasspecialcharacters: true })
        );
    }

    public static confirm(data?: ValidatorDataWithField | string): DynamicFormValidator {
        const field: string = typeof data === 'object' ? data.field : data;
        const message: string = typeof data === 'object' ? data.message : null;
        return new DynamicFormValidator(
            'confirm',
            message || `Do not match with the ${field} field`,
            (form: FormGroup) => DynamicFormValidationsFunctions.confirmValidator(form.controls[field], { confirm: true })
        );
    }
}

export interface ValidatorData {
    message?: string;
}

export interface ValidatorDataWithValue extends ValidatorData {
    value: number;
}

export interface ValidatorDataWithField extends ValidatorData {
    field: string;
}