import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { MaterialModule } from "src/app/material/material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomeComponent
      }
    ])
  ]
})
export class HomeModule {}
