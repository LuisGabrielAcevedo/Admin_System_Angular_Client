import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from './radio-group.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';

@NgModule({
  declarations: [RadioGroupComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DynamicFormDirectivesModule
  ]
})
export class RadioGroupModule { }
