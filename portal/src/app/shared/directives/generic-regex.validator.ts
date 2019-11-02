import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Generic function to validate inputs against a given Regular Expression.
 */
export const GenericRegexValidator = (
  regex: RegExp,
  msg: string
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control || !control.value) return null;
    return regex.test(control.value) ? null : { [msg]: true };
  };
};
