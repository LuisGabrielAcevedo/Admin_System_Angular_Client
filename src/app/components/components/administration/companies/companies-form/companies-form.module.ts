import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesFormComponent } from './companies-form.component';
import { CompaniesFormRoutingModule } from './companies-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material/material.module';
import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';
import { UploadFilesModule } from 'src/app/components/sharedComponents/upload-files/upload-files.module';

@NgModule({
  declarations: [CompaniesFormComponent],
  imports: [
    CommonModule,
    CompaniesFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AutocompleteModule,
    UploadFilesModule
  ]
})
export class CompaniesFormModule { }
