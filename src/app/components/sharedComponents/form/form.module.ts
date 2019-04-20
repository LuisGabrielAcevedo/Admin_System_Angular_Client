import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/sharedComponents/form/form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material/material.module';
import { FormDirective } from './form-container/form-container.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';
import { FormInputModule } from './form-input/form-input.module';
import { FormContainerComponent } from 'src/app/components/sharedComponents/form/form-container/form-container.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    FormInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent,
    FormDirective,
    FormContainerComponent
  ],
  entryComponents: [
    FormInputComponent
  ],
  exports: [FormComponent],
})
export class FormModule { }
