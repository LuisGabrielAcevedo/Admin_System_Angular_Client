import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsListComponent } from './cart-products-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlipModule } from 'ngx-flip';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CartProductsListComponent, CardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TitleBarModule,
    ScrollingModule,
    FlipModule
  ],
  exports: [CartProductsListComponent]
})
export class CartProductsListModule { }
