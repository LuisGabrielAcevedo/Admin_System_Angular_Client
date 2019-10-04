import { NgModule } from "@angular/core";
import { DynamicFormSelectComponent } from "./select-field.instance";
import { IDynamicFormSelectComponentDirective } from "./select-field.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DynamicFormSelectComponent,
    IDynamicFormSelectComponentDirective
  ],
  imports: [CommonModule],
  exports: [DynamicFormSelectComponent]
})
export class DynamicFormSelectComponentModule {}
