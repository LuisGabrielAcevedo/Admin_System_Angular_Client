import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';
import { AsyncAutocompleteComponent } from './async-autocomplete.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AsyncAutocompleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    DynamicFormDirectivesModule
  ]
})
export class AsyncAutocompleteModule { }
