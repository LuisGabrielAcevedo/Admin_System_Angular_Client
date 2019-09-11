import { ValidatorCallback } from '../dynamic-form.interfaces';

export class DynamicFormValidator {
    private _name: string;
    private _message: string;
    private _validateFn: ValidatorCallback;

    constructor(name: string, message: string, validate: ValidatorCallback ) {
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

    get validate(): ValidatorCallback {
        return this._validateFn;
    }
}
