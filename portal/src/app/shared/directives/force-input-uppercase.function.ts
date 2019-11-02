/**
 * Function to force uppercase on keyboard event data and preserve
 * cursor position
 * @param e Keyboard event
 */
export const forceInputUppercase = (e: KeyboardEvent) => {
  const input = e.target as HTMLInputElement;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.toUpperCase();
  input.setSelectionRange(start, end);
};
