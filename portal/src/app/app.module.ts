import { APP_BASE_HREF } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule } from 'ngx-mask';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './common/error.interceptor';
import { LoadingModule } from './common/loading/loading.module';
import { ModalModule } from './common/modal/modal.module';
import { NavigationModule } from './common/navigation/navigation.module';
import { NgrxSetupModule } from './common/ngrx-setup/ngrx-setup.module';
import { ProposalStateModule } from './proposal/state/proposal.state.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { PipesModule } from './shared/pipes';
import { UiComponentsModule } from './shared/ui-components/ui-components.module';
import { LoginModule } from './common/login/login.module';
import { PhaseModule } from './common/phase/phase.module';
import { BlockingModule } from './common/blocking/blocking.module';
import { RedirectModule } from './common/redirect/redirect.module';
import { RoleGuardService } from './common/guards/role-guard.service';
import { ToastModule } from './common/toast/toast.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule,
    ToastModule,
    RedirectModule,
    NavigationModule,
    PipesModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 59
      }
    }),
    NgxMaskModule.forRoot(),
    NgrxSetupModule.forRoot(),
    LoadingModule.forRoot(),
    ProposalStateModule,
    DirectivesModule,
    UiComponentsModule,
    LoginModule,
    PhaseModule,
    BlockingModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: (window as any).appSettings.baseHref || '/'
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
