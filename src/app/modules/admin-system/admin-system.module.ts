import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminSystemComponent } from "./admin-system.component";
import { AdminSystemRouting } from "./admin-system.routing.module";
import { ListModule } from "src/app/modules/shared-modules/list/list.module";
import { FormModule } from "src/app/modules/shared-modules/form/form.module";
import { ProductCharacteristicsModule } from "./product-characteristics/product-characteristics.module";
import { ProductPricesModule } from "./product-prices/product-prices.module";

@NgModule({
  declarations: [AdminSystemComponent],
  imports: [
    CommonModule,
    AdminSystemRouting,
    ListModule,
    FormModule,
    ProductCharacteristicsModule,
    ProductPricesModule
  ]
})
export class AdminSystemModule {}
