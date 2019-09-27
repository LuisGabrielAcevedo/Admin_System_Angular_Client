import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableApplicationTypeComponent } from './table-application-type.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [TableApplicationTypeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class TableApplicationTypeModule { }
