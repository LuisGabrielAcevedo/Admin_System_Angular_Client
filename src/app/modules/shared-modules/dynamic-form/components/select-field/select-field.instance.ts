import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { IDynamicFormSelectComponentDirective } from "./select-field.directive";
import {
  EDynamicFormFieldTypes,
  IDynamicFormMaterialData,
  IDynamicFormField,
  IDynamicFormModel
} from "../../dynamic-form.interfaces";
import { IDynamicFormFieldComponent } from "./select-field.component";
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
import { StringListComponent } from "../../fields/string-list/string-list.component";

@Component({
  selector: "app-select-field",
  template: `
    <ng-template dynamic-form-select-component-directive></ng-template>
  `
})
export class DynamicFormSelectComponent implements OnInit, OnChanges {
  @ViewChild(IDynamicFormSelectComponentDirective)
  dynamicFormSelectComponentDirective: IDynamicFormSelectComponentDirective;
  @Input() field: IDynamicFormField;
  @Input() materialData: IDynamicFormMaterialData;
  @Input() form: FormGroup;
  @Input() model: IDynamicFormModel;
  public componentInstance: any;
  public IDynamicFormField: IDynamicFormFieldComponent;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const field: IDynamicFormField = changes.field
      ? changes.field.currentValue
      : undefined;
    const model: IDynamicFormModel = changes.model
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
      this.IDynamicFormField = new IDynamicFormFieldComponent(
        this.components()[this.field.component],
        this.field,
        this.materialData,
        this.form,
        this.model
      );
    }

    if (this.field.dynamicComponent) {
      this.IDynamicFormField = new IDynamicFormFieldComponent(
        this.field.dynamicComponent,
        this.field,
        this.materialData,
        this.form,
        this.model
      );
    }
    this.componentInstance = this.generateInstance<any>(this.IDynamicFormField);
    this.componentInstance.field = this.IDynamicFormField.field;
    this.componentInstance.form = this.IDynamicFormField.form;
    this.componentInstance.materialData = this.IDynamicFormField.materialData;
  }

  updateModel() {
    this.componentInstance.model = this.model;
  }

  components() {
    return {
      [EDynamicFormFieldTypes.asyncAutocomplete]: AsyncAutocompleteComponent,
      [EDynamicFormFieldTypes.autocomplete]: AutocompleteComponent,
      [EDynamicFormFieldTypes.checkbox]: CheckboxComponent,
      [EDynamicFormFieldTypes.datepicker]: DatepickerComponent,
      [EDynamicFormFieldTypes.enum]: EnumSelectComponent,
      [EDynamicFormFieldTypes.image]: ImageComponent,
      [EDynamicFormFieldTypes.numericField]: NumericFieldComponent,
      [EDynamicFormFieldTypes.passwordField]: PasswordFieldComponent,
      [EDynamicFormFieldTypes.radioGroup]: RadioGroupComponent,
      [EDynamicFormFieldTypes.select]: SelectComponent,
      [EDynamicFormFieldTypes.switch]: SwitchComponent,
      [EDynamicFormFieldTypes.textField]: TextFieldComponent,
      [EDynamicFormFieldTypes.textarea]: TextareaComponent,
      [EDynamicFormFieldTypes.stringList]: StringListComponent
    };
  }

  private generateInstance<T>(
    FieldInstanceComponent: IDynamicFormFieldComponent
  ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      FieldInstanceComponent.component
    );
    const viewContainerRef = this.dynamicFormSelectComponentDirective
      .viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <T>componentRef.instance;
    return componentInstance;
  }
}
