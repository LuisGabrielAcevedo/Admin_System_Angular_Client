import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoLibreRoutingModule } from './mercado-libre.routing';
import { MercadoLibreComponent } from './mercado-libre.component';
import { TableModule } from '../../../sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MercadoLibreRoutingModule,
    TableModule,
    FlexLayoutModule
  ],
  declarations: [MercadoLibreComponent]
})
export class MercadoLibreModule { }
