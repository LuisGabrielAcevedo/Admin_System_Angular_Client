import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsListComponent } from './brands-list.component';
import { BrandsListRoutingModule } from './brands-list.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';

@NgModule({
  declarations: [BrandsListComponent],
  imports: [
    CommonModule,
    BrandsListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class BrandsListModule { }
