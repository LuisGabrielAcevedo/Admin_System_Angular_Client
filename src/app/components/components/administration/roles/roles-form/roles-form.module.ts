import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesFormComponent } from './roles-form.component';
import { RolesFormRoutingModule } from './roles-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';

@NgModule({
  declarations: [RolesFormComponent],
  imports: [
    CommonModule,
    RolesFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AutocompleteModule
  ]
})
export class RolesFormModule { }

