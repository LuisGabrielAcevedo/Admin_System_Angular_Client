import { AbstractControl, FormControl } from '@angular/forms';
import * as moment from 'moment';

/**
 * @param min Minimum valid date for age/date validation.
 * @param max Maximum valid date for age/date validation.
 * @param msg Error message.
 */
export const ValidateDate = (min = 0, max = 100, msg = 'validDate') => {
  return (control: FormControl) => {
    const a: any = moment(control.value, ['DD-MM-YYYY', 'DDMMYYYY']);
    if (
      !a.isValid() ||
      moment().diff(a, 'years', true) < 0 ||
      moment().diff(a, 'years', true) > max
    ) {
      return { ['invalidDate']: true };
    } else if (moment().diff(a, 'years', true) < min) {
      return { [msg]: true };
    } else {
      return null;
    }
  };
};

export const Under21Validator = () => ValidateDate(21, 100, 'under21');
export const Under18Validator = () => ValidateDate(18, 100, 'under18');
export const NotOlderThan50Validator = () =>
  ValidateDate(0, 50, 'notOlderThan50');
