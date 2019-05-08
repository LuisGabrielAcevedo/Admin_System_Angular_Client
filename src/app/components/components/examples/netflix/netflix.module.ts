import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetflixComponent } from './netflix.component';
import { NetflixRouting } from './netflix.routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NetflixComponent],
  imports: [
    CommonModule,
    NetflixRouting,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class NetflixModule { }
