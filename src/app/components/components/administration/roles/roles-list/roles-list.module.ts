import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesListComponent } from './roles-list.component';
import { RolesListRoutingModule } from './roles-list.routing.module';
import { TableModule } from '../../../../sharedComponents/table/table.module';

@NgModule({
  declarations: [RolesListComponent],
  imports: [
    CommonModule,
    RolesListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class RolesListModule { }
