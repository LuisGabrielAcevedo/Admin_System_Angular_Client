import { Injectable, EventEmitter } from '@angular/core';
import { ValidatorFn, FormGroup } from '@angular/forms';
import { FormattedValidations } from './dynamic-form.interfaces';
import { DynamicFormValidator } from './validate/dynamin-form-validator';

@Injectable()
export class DynamicFormService {
    public dependEvent: EventEmitter<{key: string, value: any, clear: boolean}> = new EventEmitter();
    public validateControls: EventEmitter<any> = new EventEmitter();

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
