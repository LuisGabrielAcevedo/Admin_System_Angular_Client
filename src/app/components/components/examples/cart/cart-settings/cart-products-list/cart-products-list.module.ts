import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsListComponent } from './cart-products-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CartProductsListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [CartProductsListComponent]
})
export class CartProductsListModule { }
