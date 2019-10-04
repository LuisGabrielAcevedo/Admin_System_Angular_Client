import { Input } from "@angular/core";
import {
  IDynamicFormField,
  IDynamicFormOption,
  IDynamicFormModel,
  IDynamicFormMaterialData
} from "../dynamic-form.interfaces";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Subscription, Observable, of } from "rxjs";
import { debounceTime } from "rxjs/operators";

export class BaseFieldComponent {
  @Input() public field: IDynamicFormField;
  @Input() public form: FormGroup;
  @Input() public materialData: IDynamicFormMaterialData;
  @Input() set model(model: IDynamicFormModel) {
    this.modelComponent = model;
  }
  protected subscriptions: Subscription[] = [];
  public modelComponent: IDynamicFormModel;
  public options: IDynamicFormOption[] = [];
  public loading = false;
  public compareFn: ((f1: any, f2: any) => boolean) | null = this
    .compareByValue;
  public visibleValue = true;
  public disableValue = false;
  public key = () => this.field.key;
  public appearance = () => this.materialData.appearance || "legacy";
  public floatLabel = () => this.materialData.floatLabel || "";
  public label = () =>
    this.field.options && this.field.options.label
      ? this.field.options.label
      : this.field.name;
  public placeholder = () =>
    this.field.options && this.field.options.placeholder
      ? this.field.options.placeholder
      : "";
  public multiple = () => this.field.options && this.field.options.multiple;
  public dependValue = () => this.field.options && this.field.options.depend;
  public hasDisableCondition = () =>
    this.field.options && this.field.options.disableCondition;
  public hasVisibleCondition = () =>
    this.field.options && this.field.options.visibleCondition;

  public compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  public initComponent() {
    if (this.field.options && this.field.options.disableCondition) {
      this.subscriptions.push(
        this.form.valueChanges
          .pipe(debounceTime(200))
          .subscribe(value => this.disable(value))
      );
      this.disable(this.form.value);
    }

    if (this.field.options && this.field.options.visibleCondition) {
      this.subscriptions.push(
        this.form.valueChanges
          .pipe(debounceTime(200))
          .subscribe(value => this.visible(value))
      );
      this.visible(this.form.value);
    }
  }

  public loadFieldOptions(value?: any): Observable<any> {
    return this.field.options && this.field.options.fieldOptions
      ? this.field.options.fieldOptions(value)
      : of([]);
  }

  public visible(currentModel: IDynamicFormModel): void {
    this.visibleValue = !!this.field.options.visibleCondition(currentModel);
  }

  public disable(currentModel: IDynamicFormModel): void {
    this.disableValue = !!this.field.options.disableCondition(currentModel);
  }

  public validateControl(): boolean {
    const control: AbstractControl = this.form.controls[this.field.key];
    return !control.valid && control.touched;
  }

  public errorMessage(): string {
    const control: AbstractControl = this.form.controls[this.field.key];
    if (!control.errors) return "";
    const rule: string = Object.keys(control.errors)[0];
    return control["errorMessages"][rule];
  }

  public required() {
    const control: AbstractControl = this.form.controls[this.field.key];
    return control["errorMessages"] && control["errorMessages"]["required"];
  }
}
