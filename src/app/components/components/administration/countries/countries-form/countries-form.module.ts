import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesFormComponent } from './countries-form.component';
import { CountriesFormRoutingModule } from './countries-form.routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [CountriesFormComponent],
  imports: [
    CommonModule,
    CountriesFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule

  ]
})
export class CountriesFormModule { }

