import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageComponent } from "./image.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material";

@NgModule({
  declarations: [ImageComponent],
  imports: [CommonModule, FlexLayoutModule, FlexLayoutModule, MatButtonModule]
})
export class ImageModule {}
