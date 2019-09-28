import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartCustomersListComponent } from './cart-customers-list.component';
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';
import { DynamicTableModule } from 'src/app/modules/shared-modules/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CartCustomersListComponent],
  imports: [
    CommonModule,
    TitleBarModule,
    DynamicTableModule,
    FlexLayoutModule,
    ScrollingModule
  ],
  exports: [CartCustomersListComponent]
})
export class CartCustomersListModule { }
