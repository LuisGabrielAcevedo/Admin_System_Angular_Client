export interface FormFieldError {
  msg: string;
  priority?: number;
}

export interface FormFieldErrorMap {
  [key: string]: FormFieldError;
}

/**
 * Method to create FormFieldError
 * @param message Message of error
 * @param pty Priority of error
 */
export const createFormFieldError = (
  message: string,
  pty: number
): FormFieldError => {
  return { msg: message, priority: pty };
};
