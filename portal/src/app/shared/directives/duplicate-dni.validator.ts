import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import { addError, removeError } from './errors.functions';

export const duplicateDniValidator: ValidatorFn = (
  form: FormGroup
): ValidationErrors | null => {
  const owner: FormGroup = form.get('owner') as FormGroup;
  const coOwner: FormGroup = form.get('coOwner') as FormGroup;
  if (owner && coOwner) {
    const ownerDni: AbstractControl = owner.get('personalDocumentNumber');
    const coOwnerDni: AbstractControl = coOwner.get('personalDocumentNumber');
    if (ownerDni.value && coOwnerDni.value) {
      if (ownerDni.value === coOwnerDni.value) {
        ownerDni.setErrors(addError(ownerDni.errors, 'duplicate'));
        coOwnerDni.setErrors(addError(coOwnerDni.errors, 'duplicate'));
      } else {
        ownerDni.setErrors(removeError(ownerDni.errors, 'duplicate'));
        coOwnerDni.setErrors(removeError(coOwnerDni.errors, 'duplicate'));
      }
    }
  }
  return null;
};
