import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantitySelectComponent } from './quantity-select.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [QuantitySelectComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [QuantitySelectComponent]
})
export class QuantitySelectModule { }
