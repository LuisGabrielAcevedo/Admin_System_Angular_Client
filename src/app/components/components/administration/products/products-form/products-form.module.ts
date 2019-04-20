import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFormComponent } from './products-form.component';
import { ProductsFormRoutingModule } from './products-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ProductsFormComponent],
  imports: [
    CommonModule,
    ProductsFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AutocompleteModule
  ]
})
export class ProductsFormModule { }
