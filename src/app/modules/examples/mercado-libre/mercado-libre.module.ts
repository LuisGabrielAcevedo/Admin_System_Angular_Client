import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MercadoLibreComponent } from "./mercado-libre.component";
import { DynamicTableModule } from "src/app/modules/shared-modules/table/table.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: MercadoLibreComponent
      }
    ]),
    DynamicTableModule,
    FlexLayoutModule,
    TitleBarModule
  ],
  declarations: [MercadoLibreComponent]
})
export class MercadoLibreModule {}
