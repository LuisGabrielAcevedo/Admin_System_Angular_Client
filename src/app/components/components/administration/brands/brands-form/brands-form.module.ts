import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsFormComponent } from './brands-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandsFormRoutingModule } from './brands-form.routing.module';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [BrandsFormComponent],
  imports: [
    CommonModule,
    BrandsFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AutocompleteModule
  ]
})
export class BrandsFormModule { }
