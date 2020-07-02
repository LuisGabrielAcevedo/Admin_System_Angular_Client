import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from 'backoffice/src/app/pages/login/login.page';
import { LandingPage } from 'backoffice/src/app/pages/landing/landing.page';
import { AuthGuardService } from 'backoffice/src/app/guards/auth.guard';
import { UserDetailsPage } from 'backoffice/src/app/pages/user-details/user-details.page';
import { EnterpriseDetailsPage } from './pages/enterprise-details/enterprise-details.page';
import { EnterpriseDetailsGuard } from './guards/enterprise-details.guard';
import { UserDetailsGuard } from 'backoffice/src/app/guards/user-details.guard';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: 'login',
		component: LoginPage,
	},
	{
		path: 'home',
		component: LandingPage,
		canActivate: [AuthGuardService]
	},
	{
		path: 'userDetails',
		component: UserDetailsPage,
		canActivate: [UserDetailsGuard, AuthGuardService],
	},
	{
		path: 'enterpriseDetails',
		component: EnterpriseDetailsPage,
		canActivate: [AuthGuardService, EnterpriseDetailsGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
