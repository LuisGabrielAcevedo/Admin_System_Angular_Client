import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableGalleryComponent } from './table-gallery.component';
import { MaterialModule } from '../../../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [TableGalleryComponent]
})
export class TableGalleryModule { }
