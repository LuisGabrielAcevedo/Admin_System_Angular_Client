import { PermissionService } from './http/permission.service';
import { CustomerService } from './http/customer.service';
import { LicenseService } from './http/license.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoLibreService } from './exampleEndPoints/http.mercadolibre';
import { TableService } from '../components/sharedComponents/table/table.service';
import { YoutubeService } from './exampleEndPoints/http.youtube';
import { AdminService } from './http/admin.service';
import { RoleService } from './http/role.service';
import { OrderService } from 'src/app/services/http/order.service';
// import { SocketService } from './http/socket.service';
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
    AdminService,
    LicenseService,
    CustomerService,
    RoleService,
    PermissionService,
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
