import { Routes } from '@angular/router';
import { SignupPage } from './pages/signup/signup.page';
import { SignupErrorPage } from './pages/signup-error/signup-error.page';
import { AccessDataPage } from './pages/access-data/access-data.page';
import { SignupSuccessPage } from './pages/signup-success/signup-success.page';
import { ClearOnExitGuard } from './guards/clear-on-exit.guard';
import { AccessDataGuard } from './guards/access-data.guard';
import { SignupSuccessGuard } from './guards/signup-success.guard';
import { PositiveValidationGuard } from './guards/positive-validation.guard';
import { PositiveValidationPage } from './pages/positive-validation/positive-validation.page';
import { UpdatePasswordPage } from './pages/update-password/update-password.component';
import { UpdatePasswordSuccessComponent } from './pages/update-password-success/update-password-success.component';
import { UpdatePasswordGuard } from './guards/update-password.guard';
import { UpdatePasswordSuccessGuard } from './guards/update-password-success.guard';
import { ClearOnExitUpdatePasswordGuard } from './guards/clear-on-exit-update-password.guard';

export const signupRoutes: Routes = [
	{
		path: '',
		component: SignupPage,
	},
	{
		path: 'signupErrorPage',
		component: SignupErrorPage,
	},
	{
		path: 'positiveValidation',
		component: PositiveValidationPage,
		canDeactivate: [ ClearOnExitGuard ],
		canActivate: [ PositiveValidationGuard ]
	},
	{
		path: 'accessDataPage',
		component: AccessDataPage,
		canDeactivate: [ ClearOnExitGuard ],
		canActivate: [ AccessDataGuard ]
	},
	{
		path: 'signupSuccessPage',
		component: SignupSuccessPage,
		canDeactivate: [ ClearOnExitGuard ],
		canActivate: [ SignupSuccessGuard ]
	},
	{
		path: 'updatePasswordPage',
		component: UpdatePasswordPage,
		canDeactivate: [ ClearOnExitUpdatePasswordGuard ],
		canActivate: [ UpdatePasswordGuard ]		
	},
	{
		path: 'updatePasswordSuccessPage',
		component: UpdatePasswordSuccessComponent,
		canDeactivate: [ ClearOnExitUpdatePasswordGuard ],
		canActivate: [ UpdatePasswordSuccessGuard ]
	}
];
