import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCheckoutComponent } from './cart-checkout.component';
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';

@NgModule({
  declarations: [CartCheckoutComponent],
  imports: [
    CommonModule,
    TitleBarModule
  ],
  exports: [CartCheckoutComponent]
})
export class CartCheckoutModule { }
