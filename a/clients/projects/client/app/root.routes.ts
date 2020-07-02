import { Routes } from '@angular/router';
import { MainNotFoundPage } from '@mcy/main/pages/404-not-found.page';
import { MainForbiddenPage } from '@mcy/main/pages/403-forbidden.page';
import { AuthGuardService } from './app/services/auth-guard.service';

export const rootRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: 'login',
		loadChildren: './login/login.module#LoginModule',
	},
	{
		path: 'signup',
		loadChildren: './signup/signup.module#SignupModule',
	},
	{
		path: 'app',
		loadChildren: './app/app.module#AppModule',
		canLoad: [AuthGuardService]
	},
	{path: 'forbidden', component: MainForbiddenPage},
	{path: '**', component: MainNotFoundPage}
];
