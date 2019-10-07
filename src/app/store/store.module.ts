import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { reducers } from "./index.store";
import { UserSandbox } from "../sandbox/user.sandbox";
import { UserEffects } from "./user/user.effetcs";
import { RouterEffects } from "./router/router.effects";
import { SnackbarSandbox } from "../sandbox/snackbar.sandbox";
import { AuthEffects } from "./auth/auth.effects";
import { AuthSandbox } from "src/app/sandbox/authSanbox";
import { CartEffects } from "./cart/cart.effects";

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([CartEffects])
  ],
  exports: [],
  declarations: [],
  providers: [UserSandbox, SnackbarSandbox, AuthSandbox]
})
export class AppStoreModule {}
