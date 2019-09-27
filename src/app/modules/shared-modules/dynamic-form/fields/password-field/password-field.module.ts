import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldComponent } from './password-field.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PasswordFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    DynamicFormDirectivesModule
  ]
})
export class PasswordFieldModule { }
