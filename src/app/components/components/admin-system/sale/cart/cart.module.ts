import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart.routing.module';
import { CartComponent } from './cart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { CartEditModule } from './cart-edit/cart-edit.module';
import { CartSettingsModule } from './cart-settings/cart-settings.module';
import { CartListModule } from './cart-list/cart-list.module';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    CartEditModule,
    CartSettingsModule,
    CartListModule
  ],
  declarations: [CartComponent]
})
export class CartModule { }
