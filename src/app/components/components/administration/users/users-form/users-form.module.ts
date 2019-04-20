import { AutocompleteModule } from 'src/app/components/sharedComponents/autocomplete/autocomplete.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFormComponent } from './users-form.component';
import { UsersFormRoutingModule } from './users-form.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { UploadFilesModule } from 'src/app/components/sharedComponents/upload-files/upload-files.module';

@NgModule({
  declarations: [UsersFormComponent],
  imports: [
    CommonModule,
    UsersFormRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UploadFilesModule,
    AutocompleteModule
  ]
})
export class UsersFormModule { }




