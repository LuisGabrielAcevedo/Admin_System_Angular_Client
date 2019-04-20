import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsComponent } from './admins.component';
import { AdminsRouting } from './admins.routing.module';

@NgModule({
  declarations: [AdminsComponent],
  imports: [
    CommonModule,
    AdminsRouting
  ]
})
export class AdminsModule { }
