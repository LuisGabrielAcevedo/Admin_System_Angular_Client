import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableGalleryComponent } from './table-gallery.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { TableButtonModule } from '../table-button/table-button.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TableButtonModule
  ],
  declarations: [TableGalleryComponent]
})
export class TableGalleryModule { }
