import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from './../../../../sharedComponents/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensesListComponent } from './licenses-list.component';
import { LicensesListRoutingModule } from './licenses-list.routing.module';

@NgModule({
  declarations: [LicensesListComponent],
  imports: [
    CommonModule,
    LicensesListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class LicensesListModule { }
