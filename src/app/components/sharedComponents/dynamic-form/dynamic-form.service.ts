import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators, FormGroup } from '@angular/forms';
import { FormFieldValidation, ValidationCallback } from './dynamic-form.interfaces';
import { DynamicFormValidations } from './dynamic-form-validations';

@Injectable()
export class DynamicFormService {
    public dependEvent: EventEmitter<{key: string, value: any, clear: boolean}> = new EventEmitter();
    public addValidationsAction(control: AbstractControl, validations: Array<FormFieldValidation | ValidationCallback>, form: FormGroup) {
        const angularValidation: { [key: string]: (arg: any) => ValidatorFn | any } = {
            required: () => Validators.required,
            email: () => Validators.email,
            minLength: (arg) => Validators.minLength(+arg),
            maxLength: (arg) => Validators.maxLength(+arg),
            min: (arg) => Validators.min(+arg),
            max: (arg) => Validators.max(+arg),
            requiredTrue: () => Validators.requiredTrue,
            hasNumber: () => DynamicFormValidations.patternValidator(/\d/, { hasnumber: true }),
            hasCapitalCase: () => DynamicFormValidations.patternValidator(/[A-Z]/, { hascapitalcase: true }),
            hasSmallCase: () => DynamicFormValidations.patternValidator(/[a-z]/, { hassmallcase: true }),
            hasSpecialCharacters: () => DynamicFormValidations.patternValidator(/[*@!#%&()^~{},.?¿¡]+/,{ hasspecialcharacters: true }),
            confirm: (arg) => DynamicFormValidations.confirmValidator(form.controls[arg], {confirm: true})
        }
        let errorMessages: object = {};
        let allValidations: ValidatorFn[] = [];
        validations.forEach(validation => {
            if (typeof validation === 'object') {
                let rule: string = validation.rule.split(':')[0];
                const value: string = validation.rule.split(':')[1];
                allValidations.push(angularValidation[rule](value));
                if (rule === 'requiredTrue') rule = 'required';
                errorMessages[rule.toLowerCase()] = validation.message;
            }
        });
        control['errorMessages'] = errorMessages;
        control.setValidators(allValidations);
    }
}
