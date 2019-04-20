import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsFormComponent } from './permissions-form.component';
import { PermissionsFormRoutingModule } from './permissions-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [PermissionsFormComponent],
  imports: [
    CommonModule,
    PermissionsFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class PermissionsFormModule { }
