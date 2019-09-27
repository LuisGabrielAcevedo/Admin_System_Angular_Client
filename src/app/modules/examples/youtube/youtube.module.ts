import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YoutubeComponent } from "./youtube.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TableModule } from "src/app/modules/shared-modules/table/table.module";
import { MaterialModule } from "src/app/material/material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: YoutubeComponent
      }
    ]),
    FlexLayoutModule
  ],
  declarations: [YoutubeComponent]
})
export class YoutubeModule {}
