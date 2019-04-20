import { ValidatorFn } from '@angular/forms';

export interface IAutocompleteData {
    placeholder?: string;
    validations?: ValidatorFn[];
    defaultOption?: any;
    disable?: Boolean;
}
