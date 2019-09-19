import { PermissionSandbox } from '../sandbox/permission.sandbox';
import { RoleSandbox } from '../sandbox/role.sandbox';
import { CustomerSandbox } from '../sandbox/customer.sandbox';
import { LocalSandbox } from '../sandbox/local.sandbox';
import { CustomerEffects } from './customer/customer.effects';
import { LicenseSandbox } from '../sandbox/license.sandbox';
import { LicenseEffects } from './license/license.effects';
import { CountrySandbox } from '../sandbox/country.sandbox';
import { ApplicationSandbox } from '../sandbox/application.sandbox';
import { ApplicationEffects } from './application/application.effects';
import { CountryEffects } from './country/country.effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './index.store';
import { UserSandbox } from '../sandbox/user.sandbox';
import { UserEffects } from './user/user.effetcs';
import { AdminEffects } from './admin/admin.effects';
import { AdminSandbox } from '../sandbox/admin.sandbox';
import { RouterEffects } from './router/router.effects';
import { LocalEffects } from './local/local.effects';
import { PermissionEffects } from './permission/permission.effects';
import { RoleEffects } from './role/role.effects';
import { SnackbarSandbox } from '../sandbox/snackbar.sandbox';
import { BrandSandbox } from '../sandbox/brand.sandBox';
import { BrandEffects } from './brand/brand.effects';
import { ProductCategoryEffects } from './productCategory/productCategory.effects';
import { ProductCategorySandbox } from '../sandbox/productCategory.sandBox';
import { ProductEffects } from './product/product.effects';
import { ProductSandbox } from 'src/app/sandbox/product.sanbox';
import { ProductTypeEffects } from 'src/app/store/productType/productType.effects';
import { ProductTypeSandbox } from 'src/app/sandbox/productType.sandbox';
import { AdminSystemEffects } from './adminSystem/adminSystem.effects';
import { AdminSystemSandbox } from 'src/app/sandbox/adminSystem.sandbox';
import { VendorSandbox } from 'src/app/sandbox/vendor.sandbox';
import { VendorEffects } from 'src/app/store/vendor/vendor.effects';
import { AuthEffects } from './auth/auth.effects';
import { AuthSandbox } from 'src/app/sandbox/authSanbox';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,
        EffectsModule.forRoot([
            UserEffects,
            AdminEffects,
            RouterEffects,
            CountryEffects,
            ApplicationEffects,
            LicenseEffects,
            LocalEffects,
            CustomerEffects,
            PermissionEffects,
            RoleEffects,
            BrandEffects,
            ProductCategoryEffects,
            ProductEffects,
            ProductTypeEffects,
            AdminSystemEffects,
            VendorEffects,
            AuthEffects
        ])
    ],
    exports: [],
    declarations: [],
    providers: [
        UserSandbox,
        AdminSandbox,
        ApplicationSandbox,
        CountrySandbox,
        LicenseSandbox,
        LocalSandbox,
        CustomerSandbox,
        RoleSandbox,
        PermissionSandbox,
        SnackbarSandbox,
        BrandSandbox,
        ProductCategorySandbox,
        ProductSandbox,
        AdminSystemSandbox,
        ProductTypeSandbox,
        VendorSandbox,
        AuthSandbox
    ]
})

export class AppStoreModule { }
