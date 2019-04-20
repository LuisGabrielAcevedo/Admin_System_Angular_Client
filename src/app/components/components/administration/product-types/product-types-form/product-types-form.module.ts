import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypesFormComponent } from './product-types-form.component';
import { ProductTypesFormRoutingModule } from './product-types-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';

@NgModule({
  declarations: [ProductTypesFormComponent],
  imports: [
    CommonModule,
    ProductTypesFormRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteModule
  ]
})
export class ProductTypesFormModule { }
