import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableService } from "../components/sharedComponents/table/table.service";
import { OrderService } from "src/app/services/http/order.service";
import { MessageService } from "./http/message.service";
import { TokenService } from "./http/token.service";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  imports: [CommonModule],
  providers: [
    TableService,
    OrderService,
    MessageService,
    TokenService,
    CookieService
  ],
  declarations: []
})
export class ServiceModule {}
