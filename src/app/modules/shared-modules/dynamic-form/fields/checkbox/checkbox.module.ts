import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatFormFieldModule } from '@angular/material';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    DynamicFormDirectivesModule
  ]
})
export class CheckboxModule { }
