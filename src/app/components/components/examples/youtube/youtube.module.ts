import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeRoutingModule } from './youtube.routing.module';
import { YoutubeComponent } from './youtube.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    TableModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [YoutubeComponent]
})
export class YoutubeModule { }
