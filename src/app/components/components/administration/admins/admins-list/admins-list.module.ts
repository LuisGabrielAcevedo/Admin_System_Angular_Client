import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsListComponent } from './admins-list.component';
import { AdminsListRoutingModule } from './admins-list.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';

@NgModule({
  declarations: [AdminsListComponent],
  imports: [
    CommonModule,
    AdminsListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class AdminsListModule { }
