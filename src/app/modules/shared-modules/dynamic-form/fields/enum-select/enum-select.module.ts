import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnumSelectComponent } from "./enum-select.component";
import { MatSelectModule, MatFormFieldModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormDirectivesModule } from "../../directives/dynamic-form-directives.module";

@NgModule({
  declarations: [EnumSelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    DynamicFormDirectivesModule
  ]
})
export class EnumSelectModule {}
