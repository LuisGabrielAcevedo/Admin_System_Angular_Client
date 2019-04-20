import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalsListComponent } from './locals-list.component';
import { LocalsListRoutingModule } from './locals-list.routing.module';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';

@NgModule({
  declarations: [LocalsListComponent],
  imports: [
    CommonModule,
    LocalsListRoutingModule,
    TableModule,
    FlexLayoutModule
  ]
})
export class LocalsListModule { }
