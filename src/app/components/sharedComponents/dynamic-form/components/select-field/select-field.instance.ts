import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormFieldDirective } from "./select-field.directive";
import {
  FormFieldTypes,
  MaterialFormData,
  FormField,
  FormModel
} from "../../dynamic-form.interfaces";
import { FormFieldComponent } from "./select-field.component";
import { AsyncAutocompleteComponent } from "../../fields/async-autocomplete/async-autocomplete.component";
import { TextFieldComponent } from "../../fields/text-field/text-field.component";
import { AutocompleteComponent } from "../../fields/autocomplete/autocomplete.component";
import { CheckboxComponent } from "../../fields/checkbox/checkbox.component";
import { DatepickerComponent } from "../../fields/datepicker/datepicker.component";
import { EnumSelectComponent } from "../../fields/enum-select/enum-select.component";
import { ImageComponent } from "../../fields/image/image.component";
import { NumericFieldComponent } from "../../fields/numeric-field/numeric-field.component";
import { PasswordFieldComponent } from "../../fields/password-field/password-field.component";
import { RadioGroupComponent } from "../../fields/radio-group/radio-group.component";
import { SelectComponent } from "../../fields/select/select.component";
import { SwitchComponent } from "../../fields/switch/switch.component";
import { TextareaComponent } from "../../fields/textarea/textarea.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-select-field",
  template: `
    <ng-template app-select-field-directive></ng-template>
  `
})
export class SelectFieldComponent implements OnInit, OnChanges {
  @ViewChild(FormFieldDirective) formfieldDirective: FormFieldDirective;
  @Input() field: FormField;
  @Input() materialData: MaterialFormData;
  @Input() form: FormGroup;
  @Input() model: FormModel;
  public componentInstance: any;
  public formField: FormFieldComponent;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const field: FormField = changes.field
      ? changes.field.currentValue
      : undefined;
    const model: FormModel = changes.model
      ? changes.model.currentValue
      : undefined;
    if (field) {
      this.field = field;
      this.loadComponent();
    }

    if (model && Object.keys(model).length) {
      this.model = model;
      this.updateModel();
    }
  }

  loadComponent() {
    if (this.field.component) {
      this.formField = new FormFieldComponent(
        this.components()[this.field.component],
        this.field,
        this.materialData,
        this.form,
        this.model
      );
    }

    if (this.field.dynamicComponent) {
      this.formField = new FormFieldComponent(
        this.field.dynamicComponent,
        this.field,
        this.materialData,
        this.form,
        this.model
      );
    }
    this.componentInstance = this.generateInstance<any>(this.formField);
    this.componentInstance.field = this.formField.field;
    this.componentInstance.form = this.formField.form;
    this.componentInstance.materialData = this.formField.materialData;
  }

  updateModel() {
    this.componentInstance.model = this.model;
  }

  components() {
    return {
      [FormFieldTypes.asyncAutocomplete]: AsyncAutocompleteComponent,
      [FormFieldTypes.autocomplete]: AutocompleteComponent,
      [FormFieldTypes.checkbox]: CheckboxComponent,
      [FormFieldTypes.datepicker]: DatepickerComponent,
      [FormFieldTypes.enum]: EnumSelectComponent,
      [FormFieldTypes.image]: ImageComponent,
      [FormFieldTypes.numericField]: NumericFieldComponent,
      [FormFieldTypes.passwordField]: PasswordFieldComponent,
      [FormFieldTypes.radioGroup]: RadioGroupComponent,
      [FormFieldTypes.select]: SelectComponent,
      [FormFieldTypes.switch]: SwitchComponent,
      [FormFieldTypes.textField]: TextFieldComponent,
      [FormFieldTypes.textarea]: TextareaComponent
    };
  }

  private generateInstance<T>(FieldInstanceComponent: FormFieldComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      FieldInstanceComponent.component
    );
    const viewContainerRef = this.formfieldDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <T>componentRef.instance;
    return componentInstance;
  }
}
