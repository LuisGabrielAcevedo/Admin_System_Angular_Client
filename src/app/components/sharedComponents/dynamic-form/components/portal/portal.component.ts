import { Component, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { AsyncAutocompleteComponent } from '../../fields/async-autocomplete/async-autocomplete.component';
import { TextFieldComponent } from '../../fields/text-field/text-field.component';
import { AutocompleteComponent } from '../../fields/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../../fields/checkbox/checkbox.component';
import { DatepickerComponent } from '../../fields/datepicker/datepicker.component';
import { EnumSelectComponent } from '../../fields/enum-select/enum-select.component';
import { ImageComponent } from '../../fields/image/image.component';
import { NumericFieldComponent } from '../../fields/numeric-field/numeric-field.component';
import { PasswordFieldComponent } from '../../fields/password-field/password-field.component';
import { RadioGroupComponent } from '../../fields/radio-group/radio-group.component';
import { SelectComponent } from '../../fields/select/select.component';
import { SwitchComponent } from '../../fields/switch/switch.component';
import { TextareaComponent } from '../../fields/textarea/textarea.component';
import { FormFieldTypes, FormField, MaterialFormData } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements AfterViewInit, OnChanges {
  @Input() public field: FormField;
  @Input() public materialData: MaterialFormData;
  @Input() public form: FormGroup;
  public componentPortal: ComponentPortal<any>;
  constructor() { }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const field: FormField = changes.field ? changes.field.currentValue : undefined;
    if (field) {
      this.field = field;
      this.loadComponent();
    }
  }

  loadComponent() {
    if (this.field.component) {
      this.componentPortal = new ComponentPortal(this.components()[this.field.component]);
    }
    if (this.field.dynamicComponent) {
      this.componentPortal = new ComponentPortal(this.field.dynamicComponent);
    }
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
}
