import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { signupRoutes } from './signup.routes';
import { CoreModule } from '@mcy/core/core.module';
import { DataService } from '@mcy/core/services/data.service';
import { PasswordService } from '@mcy/core/services/password.service';
import { SignupPage } from './pages/signup/signup.page';
import { SignupErrorPage } from './pages/signup-error/signup-error.page';
import { AccessDataPage } from './pages/access-data/access-data.page';
import { SignupSuccessPage } from './pages/signup-success/signup-success.page';
import { SignupLayout } from './layouts/signup/signup.layout';
import { SidebarTitleComponent } from './components/sidebar-title/sidebar-title.component';
import { MainModule } from '@mcy/main/main.module';
import { SignupStepperComponent } from './components/signup-stepper/signup-stepper.component';
import { SignupService } from './services/signup.service';
import { ModalService } from '@mcy/core/services/modal.service';

import { PasswordSecurityComponent } from './components/password-security/password-security.component';
import { UserAvailabilityComponent } from './components/user-availability/user-availability.component';

import { ClearOnExitGuard } from './guards/clear-on-exit.guard';
import { ValidatorService } from '@mcy/core/services/validator.service';
import { AccessDataGuard } from './guards/access-data.guard';
import { PersonalDataGuard } from './guards/personal-data.guard';
import { SignupSuccessGuard } from './guards/signup-success.guard';
import { PositiveValidationPage } from './pages/positive-validation/positive-validation.page';
import { VoxelLoadingCircleModule, VoxelConfigModule, SegmentTypes, VoxelSegmentService } from '@voxel/internet';
import { PositiveValidationGuard } from './guards/positive-validation.guard';
import { UpdatePasswordPage } from './pages/update-password/update-password.component';
import { UpdatePasswordService } from './services/update-password.service';
import { UpdatePasswordSuccessComponent } from './pages/update-password-success/update-password-success.component';
import { UpdatePasswordGuard } from './guards/update-password.guard';
import { UpdatePasswordSuccessGuard } from './guards/update-password-success.guard';
import { ClearOnExitUpdatePasswordGuard } from './guards/clear-on-exit-update-password.guard';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'client/assets/i18n/signup/', '.json');
}

@NgModule({
	imports: [
		CoreModule,
		VoxelLoadingCircleModule,
		VoxelConfigModule.forRoot({
			production: true,
			segment: SegmentTypes.Varejo,
		}),
		MainModule,
		RouterModule.forChild(signupRoutes),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	declarations: [
		SignupPage,
		SignupErrorPage,
		AccessDataPage,
		SignupSuccessPage,
		PositiveValidationPage,
		PasswordSecurityComponent,
		UserAvailabilityComponent,
		SidebarTitleComponent,
		SignupStepperComponent,
		SignupLayout,
		UpdatePasswordPage,
		UpdatePasswordSuccessComponent
	],
	providers: [
		DataService,
		PasswordService,
		SignupService,
		UpdatePasswordService,
		PasswordService,
		ModalService,
		ClearOnExitGuard,
		ValidatorService,
		VoxelSegmentService,
		AccessDataGuard,
		PersonalDataGuard,
		SignupSuccessGuard,
		PositiveValidationGuard,
		UpdatePasswordGuard,
		UpdatePasswordSuccessGuard,
		ClearOnExitUpdatePasswordGuard
	]
})
export class SignupModule {
	constructor(translate: TranslateService) {
		translate.setDefaultLang('es');
		translate.use('es');
	}
}
