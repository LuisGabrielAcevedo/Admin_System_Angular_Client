import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextareaComponent } from "./textarea.component";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormDirectivesModule } from "../../directives/dynamic-form-directives.module";

@NgModule({
  declarations: [TextareaComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    DynamicFormDirectivesModule
  ]
})
export class TextareaModule {}
