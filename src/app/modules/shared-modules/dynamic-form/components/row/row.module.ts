import { NgModule } from "@angular/core";
import { RowComponent } from "./row.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DynamicFormSelectComponentModule } from "../select-field/select-field.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [RowComponent],
  imports: [CommonModule, FlexLayoutModule, DynamicFormSelectComponentModule],
  exports: [RowComponent]
})
export class DynamicFormRowModule {}
