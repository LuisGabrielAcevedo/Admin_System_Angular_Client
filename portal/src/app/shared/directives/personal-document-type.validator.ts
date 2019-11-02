import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import { addError, removeError } from './errors.functions';

export const documentTypeValidator: ValidatorFn = (
  form: FormGroup
): ValidationErrors | null => {
  const dni: AbstractControl = form.get('personalDocumentNumber');
  const type: AbstractControl = form.get('personalDocumentType');
  if (dni.value && type.value) {
    if (
      (type.value.id === 150 && +dni.value >= 90000000) ||
      (type.value.id === 151 && +dni.value < 90000000)
    ) {
      dni.setErrors(addError(dni.errors, 'invalidDocumentType'));
    } else {
      dni.setErrors(removeError(dni.errors, 'invalidDocumentType'));
    }
  }
  return null;
};
