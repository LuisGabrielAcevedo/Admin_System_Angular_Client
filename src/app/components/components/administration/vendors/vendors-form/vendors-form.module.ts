import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsFormComponent } from './vendors-form.component';
import { VendorsFormRoutingModule } from 'src/app/components/components/administration/vendors/vendors-form/vendors-form.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';

@NgModule({
  declarations: [VendorsFormComponent],
  imports: [
    CommonModule,
    VendorsFormRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteModule
  ]
})
export class VendorsFormModule { }
