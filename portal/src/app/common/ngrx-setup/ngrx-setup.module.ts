import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer
} from '@ngrx/router-store';

import { CustomRouterStateSerializer } from './custom-router-state-serializer.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: false, // Infinite
      logOnly: false
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    })
  ]
})
export class NgrxSetupModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgrxSetupModule
  ) {
    if (parentModule) {
      throw new Error(
        'NgrxSetupModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgrxSetupModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomRouterStateSerializer
        }
      ]
    };
  }
}
