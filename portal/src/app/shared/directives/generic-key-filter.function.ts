import { genericStringReplacer } from './generic-string-replacer.function';

/**
 * Method to filter keys based on a regex test
 * @param e Keyboard event to check
 * @param regex Regex to do the test with
 */
export const genericKeyFilter = (e: KeyboardEvent, regex: RegExp) => {
  if (!e || !regex) return;
  if (e.code === 'Backspace' || e.code === 'Delete') return;
  if (e.ctrlKey) return;

  const newInput = genericStringReplacer(e.key, regex);

  if (!newInput) {
    e.preventDefault();
    e.stopPropagation();
  }
};
