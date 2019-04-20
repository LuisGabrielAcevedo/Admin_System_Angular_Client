import { UploadFilesModule } from 'src/app/components/sharedComponents/upload-files/upload-files.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersFormComponent } from './customers-form.component';
import { CustomersFormRoutingModule } from './customers-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';

@NgModule({
  declarations: [CustomersFormComponent],
  imports: [
    CommonModule,
    CustomersFormRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    UploadFilesModule,
    AutocompleteModule
  ]
})
export class CustomersFormModule { }
