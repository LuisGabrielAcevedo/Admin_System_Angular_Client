import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCustomersListComponent } from './cart-customers-list.component';

@NgModule({
  declarations: [CartCustomersListComponent],
  imports: [
    CommonModule
  ],
  exports: [CartCustomersListComponent]
})
export class CartCustomersListModule { }
