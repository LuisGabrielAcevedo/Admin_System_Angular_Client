import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { DynamicFormValidator } from './validate/dynamin-form-validator';
import { Observable } from 'rxjs';

export type VisibleCallback = (arg: FormModel) => boolean;
export type DisableCallback = (arg: FormModel) => boolean;
export type ValidatorCallback = (form: FormGroup) => ValidatorFn;
export type AsyncValidatorCallback = (control: AbstractControl) => Observable<ValidationErrors>;

export enum FormFieldTypes {
  autocomplete = 'AutocompleteComponent',
  asyncAutocomplete = 'AsyncAutocompleteComponent',
  checkbox = 'CheckboxComponent',
  enum = 'EnumSelectComponent',
  radioGroup = 'RadioGroupComponent',
  select = 'SelectComponent',
  switch = 'SwitchComponent',
  textarea = 'TextareaComponent',
  textField = 'TextFieldComponent',
  image = 'ImageComponent',
  datepicker = 'DatepickerComponent',
  numericField = 'NumericFieldComponent',
  passwordField = 'PasswordFieldComponent',
}

export interface MaterialFormData {
  appearance?: string;
  floatLabel?: string;
}

export interface FormField {
  name: any;
  key: string;
  component?: FormFieldTypes;
  dynamicComponent?: any;
  defaultValue?: any;
  mainGroup?: string;
  flexConfig?: {
    rowTitle?: string;
    row?: number;
    flex?: number;
    group?: FormLateralGroup;
  };
  validators?: DynamicFormValidator[];
  asyncValidator?: AsyncValidatorCallback;
  options?: {
    selectOptions?: (...arg: any[]) => Promise<any> | any;
    placeholder?: string;
    label?: string;
    fieldOptions?: (...arg: any[]) => Observable<any>;  
    visibleCondition?: VisibleCallback;
    disableCondition?: DisableCallback;
    associationValue?: string;
    associationText?: string;
    multiple?: boolean;
    depend?: string;
  };
}

export interface FormMainGroup {
  order: number | null;
  name: string;
  fields: FormField[] | FormField[][];
  leftFieldGroup?: FormField[];
  rightFieldGroup?: FormField[];
}

export interface FormModel {
  [key: string]: any;
}

export interface Option {
  value: any;
  text: any;
}

export enum ImageMode {
  select = 'SELECT_PHOTO',
  camera = 'CAMERA',
}

export enum FormLateralGroup {
  left = 'left',
  right = 'right',
}

export interface FormattedValidations {
  validations: ValidatorFn[];
  errorMessages: object;
}

export interface FormResponse {
  valid: boolean;
  currentModel?: FormModel;
  errors?: ValidationErrors;
  editedFields?: FormModel;
}

