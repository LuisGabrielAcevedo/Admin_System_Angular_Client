import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartEditComponent } from './cart-edit.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuantitySelectModule } from 'src/app/components/components/examples/cart/quantity-select/quantity-select.module';

@NgModule({
  declarations: [CartEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    QuantitySelectModule
  ],
  exports: [CartEditComponent]
})
export class CartEditModule { }
