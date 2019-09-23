import { NgModule } from "@angular/core";
import { SelectFieldComponent } from "./select-field.instance";
import { FormFieldDirective } from "./select-field.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [SelectFieldComponent, FormFieldDirective],
  imports: [CommonModule],
  exports: [SelectFieldComponent]
})
export class DynamicFormSelectFieldModule {}
