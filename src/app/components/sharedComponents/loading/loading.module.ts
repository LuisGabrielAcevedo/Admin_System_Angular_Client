import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "./loading.component";
import { MatProgressSpinnerModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule]
})
export class LoadingModule {}
