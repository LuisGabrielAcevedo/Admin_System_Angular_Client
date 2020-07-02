import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { rootRoutes } from './root.routes';
import { environment } from '../environments/environment';
import { version } from './version';
import { MainModule } from '@mcy/main/main.module';
import { AuthGuardService } from './app/services/auth-guard.service';
import { RootComponent } from './root.component';
import { EventService } from './app/services/event.service';
import { UserService } from './app/services/user.service';
import { DataService } from '@mcy/core/services/data.service';
import { TokenInterceptor } from './app/interceptors/token-interceptor';
import { ModalService } from '@mcy/core/services/modal.service';
import { MatDialogModule } from '@angular/material';
import { ExpirationTokenModalComponent } from './app/components/expiration-token-modal/expiration-token-modal.component';
import { AuthService } from './app/services/auth.service';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginService } from './login/services/login.service';
import { UpdatePasswordModalComponent } from 'client/app/login/components/update-password-modal/update-password-modal.component';
import { MultiSessionModalComponent } from 'client/app/login/components/multi-session-modal/multi-session-modal.component';
import { ActionInformationModalComponent } from 'client/app/login/components/action-information-modal/action-information-modal.component';


export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'client/assets/i18n/app/', '.json');
}

@NgModule({
	declarations: [
		RootComponent,
		ExpirationTokenModalComponent,
		UpdatePasswordModalComponent,
		MultiSessionModalComponent,
		ActionInformationModalComponent		
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		MatDialogModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		BrowserAnimationsModule,
		RouterModule.forRoot(rootRoutes),
		MainModule.forRoot({
			server: environment.production,
			production: environment.production,
			logLevel: environment.logLevel,
			appName: environment.appName,
			envName: environment.env,
			appVersion: version,
			apiUrl: environment.api,
			httpTimeout: environment.httpTimeout,
			showVersion: environment.showVersion,
		}),
	],
	entryComponents: [
		ExpirationTokenModalComponent,
		UpdatePasswordModalComponent,
		MultiSessionModalComponent		
	],
	providers: [
		AuthGuardService,
		{provide: APP_BASE_HREF, useValue: '/'},
		UserService,
		AuthService,
		EventService,
		DataService,
		ModalService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		LoginService
	],
	bootstrap: [RootComponent]
})

export class RootModule {
	constructor(translate: TranslateService) {
		translate.setDefaultLang('es');
		translate.use('es');
	}
}
