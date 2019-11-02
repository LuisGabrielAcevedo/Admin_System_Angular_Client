export const showHideInput = (e: KeyboardEvent): void => {
  const input = e.target as HTMLInputElement;
  input.type = e.type === 'blur' ? 'password' : 'text';
};
