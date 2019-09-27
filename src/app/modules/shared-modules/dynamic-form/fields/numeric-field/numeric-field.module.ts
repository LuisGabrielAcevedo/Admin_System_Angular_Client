import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericFieldComponent } from './numeric-field.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';

@NgModule({
  declarations: [NumericFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    DynamicFormDirectivesModule
  ]
})
export class NumericFieldModule { }
