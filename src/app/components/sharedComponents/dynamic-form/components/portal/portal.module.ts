import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    PortalModule
  ],
  exports: [PortalComponent]
})
export class DynamicFormPortalModule { }
