import { FormGroup, ValidationErrors } from '@angular/forms';
import { addError, removeError } from './errors.functions';

export const ValidateChassisAndEngine = (
  type: string,
  msg = 'Los números deben ser iguales.'
) => {
  return (group: FormGroup) => {
    if (type === 'C') {
      let confirmChassisNumberErrors: ValidationErrors = null;
      if (
        group.controls.chassisNumber.value ===
        group.controls.confirmChassisNumber.value
      ) {
        confirmChassisNumberErrors = removeError(
          confirmChassisNumberErrors,
          'notEqual'
        );
      } else {
        confirmChassisNumberErrors = addError(
          group.controls.confirmChassisNumber.errors,
          'notEqual'
        );
      }
      group.controls.confirmChassisNumber.setErrors(confirmChassisNumberErrors);
    } else if (type === 'E') {
      let confirmEngineNumberErrors: ValidationErrors = null;
      if (
        group.controls.engineNumber.value ===
        group.controls.confirmEngineNumber.value
      ) {
        confirmEngineNumberErrors = removeError(
          confirmEngineNumberErrors,
          'notEqual'
        );
      } else {
        confirmEngineNumberErrors = addError(
          group.controls.confirmEngineNumber.errors,
          'notEqual'
        );
      }
      group.controls.confirmEngineNumber.setErrors(confirmEngineNumberErrors);
    } else {
      return null;
    }
  };
};

export const chassisValidator = () => ValidateChassisAndEngine('C');
export const engineValidator = () => ValidateChassisAndEngine('E');
