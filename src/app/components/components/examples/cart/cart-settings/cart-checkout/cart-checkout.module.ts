import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCheckoutComponent } from './cart-checkout.component';

@NgModule({
  declarations: [CartCheckoutComponent],
  imports: [
    CommonModule
  ], 
  exports: [CartCheckoutComponent]
})
export class CartCheckoutModule { }
