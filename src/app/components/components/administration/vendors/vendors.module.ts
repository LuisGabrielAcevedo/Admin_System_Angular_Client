import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors.component';
import { VendorsRouting } from 'src/app/components/components/administration/vendors/vendors.routing.module';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [VendorsComponent],
  imports: [
    CommonModule,
    VendorsRouting,
    TableModule,
    FlexLayoutModule
  ]
})
export class VendorsModule { }
