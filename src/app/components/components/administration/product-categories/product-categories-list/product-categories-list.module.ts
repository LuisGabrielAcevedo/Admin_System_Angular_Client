import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoriesListComponent } from './product-categories-list.component';
import { ProductCategoriesListRoutingModule } from './product-categories-list.routing.module';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductCategoriesListComponent],
  imports: [
    CommonModule,
    ProductCategoriesListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class ProductCategoriesListModule { }
