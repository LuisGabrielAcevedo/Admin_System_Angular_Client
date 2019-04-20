import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './countries-list.component';
import { CountriesListRoutingModule } from './countries-list.routing.module';
import { TableModule } from '../../../../sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CountriesListComponent],
  imports: [
    CommonModule,
    CountriesListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class CountriesListModule { }
