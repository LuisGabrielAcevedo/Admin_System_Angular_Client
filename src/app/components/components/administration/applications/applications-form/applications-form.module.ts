import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsFormRoutingModule } from './applications-form.routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ApplicationsFormComponent } from './applications-form.component';

@NgModule({
  declarations: [ApplicationsFormComponent],
  imports: [
    CommonModule,
    ApplicationsFormRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ApplicationsFormModule { }


