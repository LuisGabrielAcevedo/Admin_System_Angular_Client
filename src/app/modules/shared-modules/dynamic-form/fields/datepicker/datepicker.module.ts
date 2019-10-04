import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatepickerComponent } from "./datepicker.component";
import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormDirectivesModule } from "../../directives/dynamic-form-directives.module";

@NgModule({
  declarations: [DatepickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    DynamicFormDirectivesModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DatepickerModule {}
