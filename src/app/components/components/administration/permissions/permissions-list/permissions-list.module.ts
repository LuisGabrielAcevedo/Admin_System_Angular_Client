import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsListComponent } from './permissions-list.component';
import { PermissionsListRoutingModule } from './permissions-list.routing.module';
import { TableModule } from '../../../../sharedComponents/table/table.module';

@NgModule({
  declarations: [PermissionsListComponent],
  imports: [
    CommonModule,
    PermissionsListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class PermissionsListModule { }
