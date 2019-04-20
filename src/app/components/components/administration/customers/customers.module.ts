import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersRouting } from './customers.routing.module';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    CustomersRouting
  ]
})
export class CustomersModule { }
