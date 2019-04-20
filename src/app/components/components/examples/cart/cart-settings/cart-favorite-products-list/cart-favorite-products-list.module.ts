import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartFavoriteProductsListComponent } from './cart-favorite-products-list.component';

@NgModule({
  declarations: [CartFavoriteProductsListComponent],
  imports: [
    CommonModule
  ],
   exports: [CartFavoriteProductsListComponent]
})
export class CartFavoriteProductsListModule { }
