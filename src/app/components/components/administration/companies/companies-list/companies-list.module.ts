import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from './../../../../sharedComponents/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesListComponent } from './companies-list.component';
import { CompaniesListRoutingModule } from './companies-list.routing.module';

@NgModule({
  declarations: [CompaniesListComponent],
  imports: [
    CommonModule,
    CompaniesListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class CompaniesListModule { }
