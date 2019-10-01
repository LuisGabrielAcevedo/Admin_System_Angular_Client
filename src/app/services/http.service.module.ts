import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageService } from "./http/message.service";
import { TokenService } from "./http/token.service";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  imports: [CommonModule],
  providers: [MessageService, TokenService, CookieService],
  declarations: []
})
export class ServiceModule {}
