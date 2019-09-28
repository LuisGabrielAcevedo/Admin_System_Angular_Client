import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YoutubeComponent } from "./youtube.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DynamicTableModule } from "src/app/modules/shared-modules/table/table.module";
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';
import { MaterialModule } from "src/app/material/material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    DynamicTableModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: YoutubeComponent
      }
    ]),
    FlexLayoutModule,
    TitleBarModule
  ],
  declarations: [YoutubeComponent]
})
export class YoutubeModule {}
