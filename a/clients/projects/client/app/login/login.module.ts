import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { loginRoutes } from './login.routes';
import { LoginPage } from './pages/login/login.page';
import { LoginErrorMessageComponent } from './pages/login/login-error-message/login-error-message.component';
import { CoreModule } from '@mcy/core/core.module';
import { DataService } from '@mcy/core/services/data.service';
import { ToastService } from '@mcy/core/services/toast.service';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'client/assets/i18n/login/', '.json');
}

@NgModule({
	imports: [
		CoreModule.forRoot(),
		RouterModule.forChild(loginRoutes),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	exports: [		
	],
	declarations: [
		LoginPage,
		LoginErrorMessageComponent
	],
	providers: [
		DataService,
		ToastService
	],
	entryComponents: [ 
	]
})
export class LoginModule {
	constructor(translate: TranslateService) {
		translate.setDefaultLang('es');
		translate.use('es');
	}
}
