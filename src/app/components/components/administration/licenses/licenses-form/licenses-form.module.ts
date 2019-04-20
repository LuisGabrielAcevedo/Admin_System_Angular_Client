import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensesFormComponent } from './licenses-form.component';
import { LicensesFormRoutingModule } from './licenses-form.routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';

@NgModule({
  declarations: [LicensesFormComponent],
  imports: [
    CommonModule,
    LicensesFormRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    AutocompleteModule
  ]
})
export class LicensesFormModule { }

