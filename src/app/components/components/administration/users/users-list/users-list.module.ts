import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UsersListRoutingModule } from './users-list.routing.module';
import { TableModule } from '../../../../sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class UsersListModule { }
