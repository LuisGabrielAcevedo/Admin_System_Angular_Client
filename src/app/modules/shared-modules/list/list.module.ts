import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListComponent } from "./list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "src/app/material/material.module";
import { DynamicTableModule } from "src/app/modules/shared-modules/table/table.module";
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MaterialModule,
    DynamicTableModule,
    TitleBarModule
  ]
})
export class ListModule {}
