import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  APP_INITIALIZER
} from '@angular/core';
import { TokenService } from './services/token.service';
import { StoreModule } from '@ngrx/store';
import { loginReducerMap } from './store/login.reducers';
import { initialLoginState } from './store/login.state';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login.effects';
import { UserSellingPointsService } from './services/user-selling-points.service';
import { LoginService } from './services/login.service';

export function loginFactory(tokenService: TokenService) {
  return () => tokenService.login();
}

@NgModule({
  imports: [
    StoreModule.forFeature('login', loginReducerMap, {
      initialState: initialLoginState
    }),
    EffectsModule.forFeature([LoginEffects])
  ],
  providers: [
    TokenService,
    UserSellingPointsService,
    LoginService,
    {
      provide: APP_INITIALIZER,
      useFactory: loginFactory,
      deps: [TokenService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class LoginModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LoginModule
  ) {
    if (parentModule) {
      throw new Error(
        'LoginModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: []
    };
  }
}
