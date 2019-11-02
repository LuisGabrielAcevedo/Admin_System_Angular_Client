import { ValidationErrors, AbstractControl } from '@angular/forms';
import { addError, removeError } from './errors.functions';

/**
 * Function to validate equality of two form control values
 * apply erros in case the validation fails.
 * @param firstPerson First form control
 * @param secondPerson Second form control
 */
export const ValidateSamePerson = (
  firstPerson: AbstractControl,
  secondPerson: AbstractControl
): void => {
  if (!firstPerson || !secondPerson) return;
  let firstPersonErrors: ValidationErrors = null;
  let secondPersonErrors: ValidationErrors = null;

  if (
    firstPerson.value &&
    secondPerson.value &&
    firstPerson.value === secondPerson.value
  ) {
    firstPersonErrors = addError(firstPerson.errors, 'duplicate');
    secondPersonErrors = addError(secondPerson.errors, 'duplicate');
  } else {
    firstPersonErrors = removeError(firstPerson.errors, 'duplicate');
    secondPersonErrors = removeError(secondPerson.errors, 'duplicate');
  }
  firstPerson.setErrors(firstPersonErrors);
  secondPerson.setErrors(secondPersonErrors);
};
