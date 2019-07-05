import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    DynamicFormDirectivesModule
  ]
})
export class SelectModule { }
