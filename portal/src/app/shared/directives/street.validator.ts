import { GenericRegexValidator } from './generic-regex.validator';

const VALID_STREET_REGEX: RegExp = /^[a-zñA-ZÑ0-9]+([ ]{1}[a-zñA-ZÑ0-9]+)*$/;

/**
 * Function to validate street names.
 */
export const StreetNameValidator = () =>
  GenericRegexValidator(VALID_STREET_REGEX, 'invalidStreet');
