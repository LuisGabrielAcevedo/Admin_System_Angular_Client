import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';

import { reducerMap } from './store/loading.reducers';
import { LoadingInterceptor } from './loading.interceptor';
import { Spinner } from './ui/spinner/spinner.component';
import { initialLoadingState } from './store/loading.state';
import { LoadingIndicatorContainer } from './loading-indicator/loading-indicator.container';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('loading', reducerMap, {
      initialState: initialLoadingState
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  declarations: [Spinner, LoadingIndicatorContainer],
  exports: [Spinner, LoadingIndicatorContainer]
})
export class LoadingModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LoadingModule
  ) {
    if (parentModule) {
      throw new Error(
        'LoadingModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoadingModule,
      providers: []
    };
  }
}
