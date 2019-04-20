import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list.component';
import { CustomersListRoutingModule } from './customers-list.routing.module';


@NgModule({
  declarations: [CustomersListComponent],
  imports: [
    CommonModule,
    CustomersListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class CustomersListModule { }
