import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSecondTableComponent } from './table-second-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { TableButtonModule } from '../table-button/table-button.module';

@NgModule({
  declarations: [
    TableSecondTableComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    TableButtonModule
  ]
})
export class TableSecondTableModule { }
