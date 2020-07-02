import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainNotFoundPage } from './pages/404-not-found.page';
import { MainForbiddenPage } from './pages/403-forbidden.page';
import { MaterialModule } from './material/material.module';
import { CONFIG_MODULE_MAIN } from './main.config';
import { MainService } from './main.service';
import { IMainConfig } from './main.interfaces';
import { XHRService } from './services/xhr.service';
import { StorageService } from './services/storage.service';
import { AnalyticsService } from './services/analytics.service';
import { Analytics } from './services/analytics';
import { MediaQueryComponent } from './components/media-query/media-query.component';
import { MainInfoComponent } from './components/main-info/main-info';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { IconComponent } from './components/icon/icon.component';
import { ScreenService } from '@mcy/main/services/screen.service';
import { ContextualButtonComponent } from './components/contextual-button/contextual-button.component';
import { LogoComponent } from './components/logo/logo.component';
import { WelcomePanelComponent } from './components/welcome-panel/welcome-panel.component';
import { LandingLayout } from './components/landing-layout/landing.layout';
import { VoxelLoadingCircleModule } from '@voxel/internet';

const modulesImportExport = [
	CommonModule,
	HttpClientModule,
	MaterialModule,
	FormsModule,
	ReactiveFormsModule,
	TranslateModule,
	VoxelLoadingCircleModule,
];

const componentsImportExport = [
	MediaQueryComponent,
	MainInfoComponent,
	InputComponent,
	ButtonComponent,
	IconComponent,
	ContextualButtonComponent,
	LogoComponent,
	LandingLayout,
	WelcomePanelComponent
];

/**
 * This module is the main for login and it will share with the app through the core,
 * the services on providers will be share and will be a singletons (no new instances)
 * for that you should import `MainModule` without `forRoot()`!
 */
@NgModule({
	declarations: [
		...componentsImportExport,
		MainNotFoundPage,
		MainForbiddenPage,
	],
	imports: [
		...modulesImportExport
	],
	exports: [
		...modulesImportExport,
		...componentsImportExport,
	]
})
export class MainModule {
	static forRoot(config?: IMainConfig): ModuleWithProviders {
		return {
			ngModule: MainModule,
			providers: [
				XHRService,
				StorageService,
				MainService,
				ScreenService,
				AnalyticsService,
				Analytics,
				{
					provide: CONFIG_MODULE_MAIN,
					useValue: config
				}
			]
		};
	}
}
