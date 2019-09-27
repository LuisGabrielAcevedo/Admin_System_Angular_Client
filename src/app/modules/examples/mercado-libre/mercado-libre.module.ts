import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MercadoLibreComponent } from "./mercado-libre.component";
import { TableModule } from "../../shared-modules/table/table.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: MercadoLibreComponent
      }
    ]),
    TableModule,
    FlexLayoutModule
  ],
  declarations: [MercadoLibreComponent]
})
export class MercadoLibreModule {}
