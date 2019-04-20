import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { ProductsListRoutingModule } from './products-list.routing.module';
import { TableModule } from '../../../../sharedComponents/table/table.module';
import { FlexLayoutModule } from '../../../../../../../node_modules/@angular/flex-layout';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    ProductsListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class ProductsListModule { }
