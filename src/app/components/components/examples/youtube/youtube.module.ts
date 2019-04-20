import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeRoutingModule } from './youtube.routing.module';
import { YoutubeComponent } from './youtube.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    TableModule,
    FlexLayoutModule
  ],
  declarations: [YoutubeComponent]
})
export class YoutubeModule { }
