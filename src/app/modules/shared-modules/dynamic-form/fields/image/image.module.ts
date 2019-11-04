import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageComponent } from "./image.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatIconModule } from "@angular/material";

@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ImageModule {}
