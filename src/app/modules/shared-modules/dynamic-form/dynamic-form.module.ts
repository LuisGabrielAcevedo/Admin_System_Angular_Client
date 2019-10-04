import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicFormComponent } from "./dynamic-form.component";
import { AsyncAutocompleteComponent } from "./fields/async-autocomplete/async-autocomplete.component";
import { AutocompleteComponent } from "./fields/autocomplete/autocomplete.component";
import { CheckboxComponent } from "./fields/checkbox/checkbox.component";
import { DatepickerComponent } from "./fields/datepicker/datepicker.component";
import { EnumSelectComponent } from "./fields/enum-select/enum-select.component";
import { ImageComponent } from "./fields/image/image.component";
import { NumericFieldComponent } from "./fields/numeric-field/numeric-field.component";
import { PasswordFieldComponent } from "./fields/password-field/password-field.component";
import { RadioGroupComponent } from "./fields/radio-group/radio-group.component";
import { SelectComponent } from "./fields/select/select.component";
import { SwitchComponent } from "./fields/switch/switch.component";
import { TextFieldComponent } from "./fields/text-field/text-field.component";
import { TextareaComponent } from "./fields/textarea/textarea.component";
import { AsyncAutocompleteModule } from "./fields/async-autocomplete/async-autocomplete.module";
import { AutocompleteModule } from "./fields/autocomplete/autocomplete.module";
import { CheckboxModule } from "./fields/checkbox/checkbox.module";
import { DatepickerModule } from "./fields/datepicker/datepicker.module";
import { EnumSelectModule } from "./fields/enum-select/enum-select.module";
import { ImageModule } from "./fields/image/image.module";
import { NumericFieldModule } from "./fields/numeric-field/numeric-field.module";
import { PasswordFieldModule } from "./fields/password-field/password-field.module";
import { RadioGroupModule } from "./fields/radio-group/radio-group.module";
import { SelectModule } from "./fields/select/select.module";
import { SwitchModule } from "./fields/switch/switch.module";
import { TextFieldModule } from "./fields/text-field/text-field.module";
import { TextareaModule } from "./fields/textarea/textarea.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SimpleFormComponent } from "./components/simple-form/simple-form.component";
import { TabsFormComponent } from "./components/tabs-form/tabs-form.component";
import { StepsFormComponent } from "./components/steps-form/steps-form.component";
import { MatTabsModule } from "@angular/material/tabs";
import { DynamicFormService } from "./dynamic-form.service";
import { PanelsFormComponent } from "./components/panels-form/panels-form.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { DynamicFormSelectComponentModule } from "./components/select-field/select-field.module";
import { DynamicFormRowModule } from "./components/row/row.module";
import { StringListComponent } from "./fields/string-list/string-list.component";
import { StringListModule } from "./fields/string-list/string-list.module";

@NgModule({
  declarations: [
    DynamicFormComponent,
    SimpleFormComponent,
    TabsFormComponent,
    StepsFormComponent,
    PanelsFormComponent
  ],
  imports: [
    CommonModule,
    AsyncAutocompleteModule,
    AutocompleteModule,
    CheckboxModule,
    DatepickerModule,
    EnumSelectModule,
    ImageModule,
    NumericFieldModule,
    PasswordFieldModule,
    RadioGroupModule,
    SelectModule,
    SwitchModule,
    TextFieldModule,
    TextareaModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    DynamicFormSelectComponentModule,
    DynamicFormRowModule,
    StringListModule
  ],
  entryComponents: [
    AsyncAutocompleteComponent,
    AutocompleteComponent,
    CheckboxComponent,
    DatepickerComponent,
    EnumSelectComponent,
    ImageComponent,
    NumericFieldComponent,
    PasswordFieldComponent,
    RadioGroupComponent,
    SelectComponent,
    SwitchComponent,
    TextFieldComponent,
    TextareaComponent,
    StringListComponent
  ],
  exports: [DynamicFormComponent],
  providers: [DynamicFormService]
})
export class DynamicFormModule {}
