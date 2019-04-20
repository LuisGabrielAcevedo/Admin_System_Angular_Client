import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListComponent } from './applications-list.component';
import { ApplicationsListRoutingModule } from './applications-list.routing.module';

@NgModule({
  declarations: [ApplicationsListComponent],
  imports: [
    CommonModule,
    ApplicationsListRoutingModule,
    TableModule,
    FlexLayoutModule

  ]
})
export class ApplicationsListModule { }
