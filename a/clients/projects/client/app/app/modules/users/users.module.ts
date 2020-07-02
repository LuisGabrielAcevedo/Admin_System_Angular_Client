import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './users.routes';
import { CoreModule } from '@mcy/core/core.module';
import { ComponentsModule } from 'client/app/app/components/components.module';
import { LandingPage } from 'client/app/app/modules/users/pages/landing/landing.page';
import { ToggleBindModalComponent } from './components/toggle-bind-modal/toggle-bind-modal.component';

@NgModule({
	declarations: [
		LandingPage,
		ToggleBindModalComponent,
	],
	entryComponents: [
		ToggleBindModalComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		CoreModule.forRoot(),
		RouterModule.forChild(routes),
	],
})
export class UsersModule {}
