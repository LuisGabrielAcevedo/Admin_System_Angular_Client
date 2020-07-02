import { Routes } from '@angular/router';

// PAGES
import { LandingPage } from 'client/app/app/modules/users/pages/landing/landing.page';
import { LandingGuard } from 'client/app/app/modules/users/pages/landing/landing.guard';

export const routes: Routes = [
	{
		path: '',
		component: LandingPage,
		canActivate: [ LandingGuard ]
	}
];
