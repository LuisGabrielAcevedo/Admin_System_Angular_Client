import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsListComponent } from './vendors-list.component';
import { VendorsListRoutingModule } from 'src/app/components/components/administration/vendors/vendors-list/vendors-list.routing.module';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [VendorsListComponent],
  imports: [
    CommonModule,
    VendorsListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class VendorsListModule { }
