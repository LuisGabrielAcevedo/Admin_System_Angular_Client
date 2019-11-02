import { FormGroup, ValidationErrors } from '@angular/forms';
import { addError, removeError } from './../directives/errors.functions';

export const ValidateCellPhoneBlacklist = isblacklist => {
  return (group: FormGroup) => {
    let cellPhoneErrors: ValidationErrors = null;

    if (group.controls.number.errors) {
      cellPhoneErrors = group.controls.number.errors;
    }

    if (isblacklist()) {
      cellPhoneErrors = addError(group.controls.number.errors, 'blacklist');
      group.controls.number.markAsTouched();
    } else {
      cellPhoneErrors = removeError(group.controls.number.errors, 'blacklist');
    }

    group.controls.number.setErrors(cellPhoneErrors);
  };
};

export const ValidateCellPhoneTotalNum = () => {
  return (group: FormGroup) => {
    const area = group.controls.areaCode.value;
    const num = group.controls.number.value;
    let cellPhoneErrors: ValidationErrors = null;

    if (group.controls.number.errors) {
      cellPhoneErrors = group.controls.number.errors;
    }
    const errorCondition = area && num && area.length + num.length !== 10;

    if (errorCondition) {
      cellPhoneErrors = addError(group.controls.number.errors, 'totalNumber');
      group.controls.number.markAsTouched();
    } else {
      cellPhoneErrors = removeError(
        group.controls.number.errors,
        'totalNumber'
      );
    }

    group.controls.number.setErrors(cellPhoneErrors);
  };
};

export const ValidateCellPhoneAllTheSame = () => {
  return (group: FormGroup) => {
    const num = group.controls.number.value;
    let cellPhoneErrors: ValidationErrors = null;

    if (group.controls.number.errors) {
      cellPhoneErrors = group.controls.number.errors;
    }

    const errorCondition = num && num.split('').every(char => char === num[0]);

    if (errorCondition && num.length > 5) {
      cellPhoneErrors = addError(group.controls.number.errors, 'allTheSame');
      group.controls.number.markAsTouched();
    } else {
      cellPhoneErrors = removeError(group.controls.number.errors, 'allTheSame');
    }

    group.controls.number.setErrors(cellPhoneErrors);
  };
};
