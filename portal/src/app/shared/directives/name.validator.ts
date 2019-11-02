import { GenericRegexValidator } from './generic-regex.validator';

const VALID_NAME_REGEX: RegExp = /^[a-zñA-ZÑ]+([ ]{1}[a-zñA-ZÑ]+)*$/;

/**
 * Functions to validate names and lastnames.
 */
export const FirstNameValidator = () =>
  GenericRegexValidator(VALID_NAME_REGEX, 'invalidFirstName');
export const LastNameValidator = () =>
  GenericRegexValidator(VALID_NAME_REGEX, 'invalidLastName');
