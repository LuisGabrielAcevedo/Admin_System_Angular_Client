/*
       <app-form-field
          label="STRING"
          tooltip="STRING"
          [formSubmitted]="submitAttemptBoolean"
        >
          <!-- YOUR INPUT FIELD -->
        </app-form-field>
 */

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl, FormControlName, ValidationErrors } from '@angular/forms';
import { FormFieldErrorMap, FormFieldError } from './form-field-error.model';

@Component({
  selector: 'app-form-field',
  template: `
    <app-field
      [label]="label"
      [required]="required"
      [errors]="errors"
      [tooltip]="tooltip"
    >
      <ng-content></ng-content>
    </app-field>
  `
})
export class FormFieldComponent implements OnChanges, AfterViewInit {
  @Input() label: string = '';
  @Input() tooltip: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() errorMessages: FormFieldErrorMap = {};

  @ContentChild(FormControlName)
  private formControlNameRef: FormControlName;

  public formControl: FormControl;
  public errors: Array<string> = [];
  public required: boolean = false;

  constructor(public cdr: ChangeDetectorRef) {}

  update() {
    this.calculateRequired();
    this.calculateErrors();
  }

  ngAfterViewInit() {
    if (!this.formControlNameRef) return;
    if (this.formControlNameRef.control === this.formControl) return;
    this.registerFormControl(this.formControlNameRef.control);
    this.cdr.detectChanges();
  }

  registerFormControl(formControl: FormControl) {
    if (!formControl) return;
    this.formControl = formControl;
    const update = this.update.bind(this);
    this.formControl.statusChanges.subscribe(update);
    this.overrideMarkAsTouched(this.formControl, update);
    this.calculateRequired();
  }

  overrideMarkAsTouched(
    control: FormControl,
    callback: Function = (control: FormControl) => {}
  ) {
    const origFunc = control.markAsTouched;
    control.markAsTouched = function() {
      origFunc.apply(this, arguments);
      callback(this);
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formControl) {
      this.registerFormControl(this.formControl);
    }
    if (changes.formSubmitted) {
      this.calculateErrors();
    }
  }

  getControlName(control: FormControl) {
    return Object.entries(control.parent.controls).filter(
      e => e[1] === control
    )[0][0];
  }

  calculateErrors() {
    const INVALID: FormFieldError = { msg: 'Inválido', priority: -1 };
    const REQUIRED: FormFieldError = { msg: 'Obligatorio', priority: -2 };

    let errors: FormFieldError[] = [];

    if (
      this.formControl &&
      this.formControl.touched &&
      this.formControl.invalid
    ) {
      errors.push(INVALID);
      const customErrors = this.loadCustomErrors(
        this.formControl.errors,
        this.errorMessages
      );
      errors.push(...customErrors);
    }
    if (
      this.formControl &&
      this.formControl.untouched &&
      this.formControl.invalid &&
      this.formSubmitted
    ) {
      errors.push(REQUIRED);
    }
    const HIGHEST_PRIORITY = (a, b) => (b.priority || 0) - (a.priority || 0);
    this.errors = [errors.sort(HIGHEST_PRIORITY).map(e => e.msg)[0]];
  }

  loadCustomErrors(
    errors: ValidationErrors,
    errorMessages: FormFieldErrorMap
  ): FormFieldError[] {
    if (
      !errors ||
      !errorMessages ||
      Object.entries(errors).length < 1 ||
      Object.entries(errorMessages).length < 1
    )
      return [];
    let currentErrors: FormFieldError[] = [];
    for (let e in errors) {
      if (errorMessages[e]) currentErrors.push(errorMessages[e]);
    }
    return currentErrors;
  }

  calculateRequired() {
    if (!this.formControl || !this.formControl.validator) return;
    const name = this.getControlName(this.formControl);
    const validators = this.formControl.validator(name as any);
    this.required = validators && validators.required;
  }
}
