import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions.component';
import { PermissionsRouting } from 'src/app/components/components/administration/permissions/permissions.routing.module';

@NgModule({
  declarations: [PermissionsComponent],
  imports: [
    CommonModule,
    PermissionsRouting
  ]
})
export class PermissionsModule { }
