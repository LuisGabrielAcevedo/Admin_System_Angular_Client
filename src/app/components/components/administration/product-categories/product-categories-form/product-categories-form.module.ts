import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesFormRoutingModule } from './product-categories-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductCategoriesFormComponent } from './product-categories-form.component';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [ProductCategoriesFormComponent],
  imports: [
    CommonModule,
    ProductCategoriesFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AutocompleteModule
  ]
})
export class ProductCategoriesFormModule { }
