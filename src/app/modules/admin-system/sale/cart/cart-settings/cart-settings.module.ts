import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSettingsComponent } from './cart-settings.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartProductsListModule } from './cart-products-list/cart-products-list.module';
import { CartFavoriteProductsListModule } from './cart-favorite-products-list/cart-favorite-products-list.module';
import { CartCheckoutModule } from './cart-checkout/cart-checkout.module';
import { CartCustomersListModule } from './cart-customers-list/cart-customers-list.module';

@NgModule({
  declarations: [CartSettingsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CartProductsListModule,
    CartFavoriteProductsListModule,
    CartCheckoutModule,
    CartCustomersListModule
  ],
  exports: [CartSettingsComponent]
})
export class CartSettingsModule { }
