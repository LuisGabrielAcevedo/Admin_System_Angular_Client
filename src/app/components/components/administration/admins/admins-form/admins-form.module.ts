import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsFormComponent } from './admins-form.component';
import { AdminsFormRoutingModule } from './admins-form.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadFilesModule } from 'src/app/components/sharedComponents/upload-files/upload-files.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [AdminsFormComponent],
  imports: [
    CommonModule,
    AdminsFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    UploadFilesModule
  ]
})
export class AdminsFormModule { }
