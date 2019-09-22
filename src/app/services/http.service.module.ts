import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoLibreService } from './exampleEndPoints/http.mercadolibre';
import { TableService } from '../components/sharedComponents/table/table.service';
import { YoutubeService } from './exampleEndPoints/http.youtube';
import { OrderService } from 'src/app/services/http/order.service';
import { MessageService } from './http/message.service';
import { FollowService } from './http/follow.service';
import { NetflixService } from './exampleEndPoints/netflix.service';
import { TokenService } from './http/token.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MercadoLibreService,
    TableService,
    YoutubeService,
    OrderService,
    MessageService,
    FollowService,
    NetflixService,
    TokenService,
    CookieService
  ],
  declarations: []
})
export class ServiceModule { }
