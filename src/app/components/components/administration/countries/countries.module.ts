import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { CountriesRouting } from './countries.routing.module';


@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    CountriesRouting
  ]
})
export class CountriesModule { }
