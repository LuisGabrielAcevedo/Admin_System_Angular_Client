import { PermissionSandbox } from '../sandbox/permission.sandbox';
import { RoleSandbox } from '../sandbox/role.sandbox';
import { CustomerSandbox } from '../sandbox/customer.sandbox';
import { CustomerEffects } from './customer/customer.effects';
import { LicenseSandbox } from '../sandbox/license.sandbox';
import { LicenseEffects } from './license/license.effects';
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
import { PermissionEffects } from './permission/permission.effects';
import { RoleEffects } from './role/role.effects';
import { SnackbarSandbox } from '../sandbox/snackbar.sandbox';
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
            LicenseEffects,
            CustomerEffects,
            PermissionEffects,
            RoleEffects,
            AuthEffects
        ])
    ],
    exports: [],
    declarations: [],
    providers: [
        UserSandbox,
        AdminSandbox,
        LicenseSandbox,
        CustomerSandbox,
        RoleSandbox,
        PermissionSandbox,
        SnackbarSandbox,
        AuthSandbox
    ]
})

export class AppStoreModule { }
