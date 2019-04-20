import { ValidatorFn } from '@angular/forms';

export interface FormField {
  disabled?: boolean;
  options?: string[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value: any;
  field?: string;
}

export enum FormContainerComponentType {
  Input = 'FormInputComponent',
  Select = 'FormSelectComponent',
  Autocomplete = 'FormAutocompleteComponent',
  ImageSelect = 'FormImageSelectComponent',
  Button = 'FormButtonComponent',
  Checkbox = 'FormCheckboxComponent'
}

export interface FormContainerComponentData {
  inputData?: {
    options?: string[];
    placeholder?: string;
    value?: any;
    field?: string;
  };
}

export interface FormOutputData {
  value?: any;
  field?: string;
}
