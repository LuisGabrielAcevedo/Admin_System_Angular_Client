import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalsFormComponent } from './locals-form.component';
import { LocalsFormRoutingModule } from './locals-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';

@NgModule({
  declarations: [LocalsFormComponent],
  imports: [
    CommonModule,
    LocalsFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AutocompleteModule
  ]
})
export class LocalsFormModule { }
