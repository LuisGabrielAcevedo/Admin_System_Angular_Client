import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesComponent } from './product-categories.component';
import { ProductCategoriesRouting } from './product-categories.routing.module';

@NgModule({
  declarations: [ProductCategoriesComponent],
  imports: [
    CommonModule,
    ProductCategoriesRouting
  ]
})
export class ProductCategoriesModule { }
