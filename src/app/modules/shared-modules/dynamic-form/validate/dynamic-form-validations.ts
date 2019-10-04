import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { TDynamicFormAsyncValidatorCallback } from "../dynamic-form.interfaces";

export class DynamicFormValidationsFunctions {
  public static patternValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.value) return null;
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  public static confirmValidator(
    control2: AbstractControl,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.value) return null;
      const valid = control.value === control2.value;
      return valid ? null : error;
    };
  }

  public static digitsValidator(
    value: any,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.value) return null;
      const valid = control.value.length === +value;
      return valid ? null : error;
    };
  }
}
