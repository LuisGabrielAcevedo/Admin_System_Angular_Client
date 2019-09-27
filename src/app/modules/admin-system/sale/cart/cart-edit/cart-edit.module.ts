import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartEditComponent } from "./cart-edit.component";
import { MaterialModule } from "src/app/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [CartEditComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [CartEditComponent]
})
export class CartEditModule {}
