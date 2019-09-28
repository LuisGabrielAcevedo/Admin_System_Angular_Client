import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from './title-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [TitleBarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [TitleBarComponent]
})
export class TitleBarModule { }
