import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { BrandsRouting } from './brands.routing.module';

@NgModule({
  declarations: [BrandsComponent],
  imports: [
    CommonModule,
    BrandsRouting
  ]
})
export class BrandsModule { }
