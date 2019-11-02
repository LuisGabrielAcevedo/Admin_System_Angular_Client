import { NgModule } from '@angular/core';
import { CuitPipe } from './cuit.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { DniPipe } from './dni.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DomainPipe } from './domain.pipe';

@NgModule({
  declarations: [CuitPipe, CustomDatePipe, DniPipe, DomainPipe],
  exports: [CuitPipe, CustomDatePipe, DniPipe, DomainPipe],
  imports: [CommonModule],
  providers: [DecimalPipe]
})
export class PipesModule {}
