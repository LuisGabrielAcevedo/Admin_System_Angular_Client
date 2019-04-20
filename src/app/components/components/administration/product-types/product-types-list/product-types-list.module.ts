import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypesListComponent } from './product-types-list.component';
import { TableModule } from '../../../../sharedComponents/table/table.module';
import { ProductTypesListRoutingModule } from './product-types-list.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductTypesListComponent],
  imports: [
    CommonModule,
    ProductTypesListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class ProductTypesListModule { }
