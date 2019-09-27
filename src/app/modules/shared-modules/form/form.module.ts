import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormComponent } from "./form.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "src/app/material/material.module";
import { DynamicFormModule } from "../dynamic-form/dynamic-form.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    DynamicFormModule,
    TranslateModule
  ]
})
export class FormModule {}
