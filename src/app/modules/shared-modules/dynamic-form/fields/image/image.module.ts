import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageComponent } from "./image.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [ImageComponent],
  imports: [CommonModule, FlexLayoutModule]
})
export class ImageModule {}
