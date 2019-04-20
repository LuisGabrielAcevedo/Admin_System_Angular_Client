import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesRouting } from './roles.routing.module';

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRouting
  ]
})
export class RolesModule { }
