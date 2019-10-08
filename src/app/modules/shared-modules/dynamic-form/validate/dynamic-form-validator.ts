import { TDynamicFormValidatorCallback } from "../dynamic-form.interfaces";

export class DynamicFormValidator {
  private _name: string;
  private _message: string;
  private _validateFn: TDynamicFormValidatorCallback;

  constructor(
    name: string,
    message: string,
    validate: TDynamicFormValidatorCallback
  ) {
    this._name = name;
    this._message = message;
    this._validateFn = validate;
  }

  get name(): string {
    return this._name;
  }

  get message(): string {
    return this._message;
  }

  get validate(): TDynamicFormValidatorCallback {
    return this._validateFn;
  }
}
