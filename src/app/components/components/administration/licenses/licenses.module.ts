import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensesComponent } from './licenses.component';
import { LicensesRouting } from 'src/app/components/components/administration/licenses/licenses.routing.module';

@NgModule({
  declarations: [LicensesComponent],
  imports: [
    CommonModule,
    LicensesRouting
  ]
})
export class LicensesModule { }
