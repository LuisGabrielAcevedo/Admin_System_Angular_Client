import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from '@mcy/main/main.module';
import { CoreModule } from '@mcy/core/core.module';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { version } from '../version';
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from 'backoffice/src/app/components/header/header.component';
import { ProfileImageComponent } from 'backoffice/src/app/components/profile-image/profile-image.component';
import { LandingEnterpriseTabComponent } from 'backoffice/src/app/pages/landing/enterprises-tab/enterprises-tab.component'
import { LandingUsersTabComponent } from 'backoffice/src/app/pages/landing/users-tab/users-tab.component';

import { UserService } from 'backoffice/src/app/services/user.service';
import { PageLayout } from 'backoffice/src/app/components/page-layout/page-layout.component';
import { LoginPage } from './pages/login/login.page';
import { LandingPage } from './pages/landing/landing.page';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VoxelLoadingCircleModule } from '@voxel/internet';
import { LoginService } from 'backoffice/src/app/services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgentDataService } from './services/data.service';
import { AuthGuardService } from 'backoffice/src/app/guards/auth.guard';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { EnterpriseDetailsPage } from './pages/enterprise-details/enterprise-details.page';
import { EnterpriseDetailsGuard } from './guards/enterprise-details.guard';
import { UserDetailsGuard } from 'backoffice/src/app/guards/user-details.guard';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'backoffice/src/assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ProfileImageComponent,
		LoginPage,
		LandingPage,
		PageLayout,
		LandingEnterpriseTabComponent,
		LandingUsersTabComponent,
		UserDetailsPage,
		EnterpriseDetailsPage,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatToolbarModule,
		BrowserAnimationsModule,
		CoreModule.forRoot(),
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
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		VoxelLoadingCircleModule,
		BrowserAnimationsModule
	],
	providers: [
		AuthGuardService,
		UserDetailsGuard,
		UserService,
		UtilsService,
		LoginService,
		{provide: APP_BASE_HREF, useValue: '/'},
		AgentDataService,
		EnterpriseDetailsGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(translate: TranslateService) {
		translate.setDefaultLang('es');
		translate.use('es');
	}
}
