import { Injectable, EventEmitter } from '@angular/core';
import { ValidatorFn, FormGroup } from '@angular/forms';
import { FormattedValidations } from './dynamic-form.interfaces';
import { DynamicFormValidator } from './validate/dynamin-form-validator';

@Injectable()
export class DynamicFormService {
    public resetControl: EventEmitter<any> = new EventEmitter();
    public setActiveGroup: EventEmitter<number> = new EventEmitter();

    public formatValidations(validations: DynamicFormValidator[], form: FormGroup): FormattedValidations {
        let errorMessages: object = {};
        let formattedValidations: ValidatorFn[] = [];
        validations.forEach(validation => {
            formattedValidations.push(validation.validate(form));
            errorMessages[validation.name.toLowerCase()] = validation.message;
        });
        return {
            validations: formattedValidations,
            errorMessages
        };
    }
}
