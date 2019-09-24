import { NgModule } from "@angular/core";
import { RowComponent } from "./row.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DynamicFormSelectFieldModule } from "../select-field/select-field.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [RowComponent],
  imports: [CommonModule, FlexLayoutModule, DynamicFormSelectFieldModule],
  exports: [RowComponent]
})
export class DynamicFormRowModule { }
