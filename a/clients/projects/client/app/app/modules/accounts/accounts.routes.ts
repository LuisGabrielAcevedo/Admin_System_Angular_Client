import { Routes } from '@angular/router';
import { AccountsLandingPage } from './pages/accounts-landing/accounts-landing.page';
import { ClearOnExitGuard } from 'client/app/app/modules/accounts/guards/clear-on-exit.guard';

export const accountsRoutes: Routes = [
	{
		path: '',
		component: AccountsLandingPage,
		canDeactivate: [ ClearOnExitGuard ]
	}
];
