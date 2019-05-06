import { PermissionService } from './http/permission.service';
import { CustomerService } from './http/customer.service';
import { LicenseService } from './http/license.service';
import { CompanyService } from './http/company.service';
import { ApplicationService } from './http/application.service';
import { CountryService } from './http/country.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './http/user.service';
import { MercadoLibreService } from './exampleEndPoints/http.mercadolibre';
import { TableService } from '../components/sharedComponents/table/table.service';
import { YoutubeService } from './exampleEndPoints/http.youtube';
import { AdminService } from './http/admin.service';
import { StoreService } from './http/local.service';
import { RoleService } from './http/role.service';
import { BrandService } from './http/brand.service';
import { ProductCategoryService } from './http/productCategory.service';
import { ProductService } from './http/product.service';
import { ProductTypeService } from 'src/app/services/http/productType.service';
import { AdminSystemService } from 'src/app/services/http/adminSystem.service';
import { VendorService } from 'src/app/services/http/vendor.service';
import { OrderService } from 'src/app/services/http/order.service';
import { SocketService } from './http/socket.service';
import { MessageService } from './http/message.service';
import { FollowService } from './http/follow.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    MercadoLibreService,
    TableService,
    YoutubeService,
    AdminService,
    CountryService,
    ApplicationService,
    CompanyService,
    LicenseService,
    StoreService,
    CustomerService,
    RoleService,
    PermissionService,
    BrandService,
    ProductCategoryService,
    ProductService,
    ProductTypeService,
    AdminSystemService,
    VendorService,
    OrderService,
    SocketService,
    MessageService,
    FollowService
  ],
  declarations: []
})
export class ServiceModule { }
