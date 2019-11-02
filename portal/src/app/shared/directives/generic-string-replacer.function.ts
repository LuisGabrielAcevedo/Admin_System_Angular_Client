/**
 * Function to replace a string for an empty space when it matches
 * a regex test, returns the new string with the replaced values.
 * @param input The string to check for replacement
 * @param regex The regex to do the test with
 */
export const genericStringReplacer = (input: string, regex: RegExp): string => {
  if (!input || !regex) return;
  return input.replace(regex, '');
};
