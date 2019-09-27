import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from './switch.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';

@NgModule({
  declarations: [SwitchComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    DynamicFormDirectivesModule
  ]
})
export class SwitchModule { }
