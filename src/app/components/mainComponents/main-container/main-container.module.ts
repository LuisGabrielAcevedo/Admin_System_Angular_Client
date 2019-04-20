import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container.component';

import { MaterialModule } from '../../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainContainerRouting } from './main-container.routing.module';
import { SnackbarModule } from '../../sharedComponents/snackbar/snackbar.module';

@NgModule({
  declarations: [MainContainerComponent],
  imports: [
    CommonModule,
    MainContainerRouting,
    MaterialModule,
    FlexLayoutModule,
    SnackbarModule
  ]
})
export class MainContainerModule { }
