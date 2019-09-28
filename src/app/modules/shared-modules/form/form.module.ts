import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormComponent } from "./form.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "src/app/material/material.module";
import { DynamicFormModule } from "src/app/modules/shared-modules/dynamic-form/dynamic-form.module";
import { TranslateModule } from "@ngx-translate/core";
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    DynamicFormModule,
    TranslateModule,
    TitleBarModule
  ]
})
export class FormModule {}
