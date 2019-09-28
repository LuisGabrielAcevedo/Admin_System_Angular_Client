import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartFavoriteProductsListComponent } from './cart-favorite-products-list.component';
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';


@NgModule({
  declarations: [CartFavoriteProductsListComponent],
  imports: [
    CommonModule,
    TitleBarModule
  ],
   exports: [CartFavoriteProductsListComponent]
})
export class CartFavoriteProductsListModule { }
