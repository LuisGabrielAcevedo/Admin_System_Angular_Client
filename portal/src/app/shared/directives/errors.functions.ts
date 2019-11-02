import { ValidationErrors } from '@angular/forms';

export const removeError = (errors: ValidationErrors, errorName: string) => {
  if (!errors) return null;
  let errorCopy = { ...errors };
  if (!errors[errorName]) return errorCopy;
  delete errorCopy[errorName];
  return Object.entries(errorCopy).length > 0 ? errorCopy : null;
};

export const addError = (errors: ValidationErrors, errorName: string) => {
  if (!errorName) return errors;
  return { ...errors, ...{ [errorName]: true } };
};
