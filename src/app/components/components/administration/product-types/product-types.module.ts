import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypesComponent } from './product-types.component';
import { ProductTypesRouting } from './product-types.routing.module';

@NgModule({
  declarations: [ProductTypesComponent],
  imports: [
    CommonModule,
    ProductTypesRouting
  ]
})
export class ProductTypesModule { }
