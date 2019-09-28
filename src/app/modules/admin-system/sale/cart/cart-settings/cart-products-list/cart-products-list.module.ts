import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsListComponent } from './cart-products-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CartProductsListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TitleBarModule,
    ScrollingModule
  ],
  exports: [CartProductsListComponent]
})
export class CartProductsListModule { }
