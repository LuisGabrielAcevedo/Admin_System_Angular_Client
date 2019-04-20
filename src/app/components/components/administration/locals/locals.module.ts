import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalsComponent } from './locals.component';
import { LocalsRouting } from './locals.routing.module';

@NgModule({
  declarations: [LocalsComponent],
  imports: [
    CommonModule,
    LocalsRouting
  ]
})
export class LocalsModule { }
