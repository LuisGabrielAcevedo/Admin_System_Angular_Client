import { GenericRegexValidator } from './generic-regex.validator';

const VALID_EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]+)+$/;

/**
 * Function to validate email addresses.
 */
export const ValidateEmail = () =>
  GenericRegexValidator(VALID_EMAIL_REGEX, 'invalidEmail');
