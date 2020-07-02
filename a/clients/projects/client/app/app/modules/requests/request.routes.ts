import { Routes } from '@angular/router';
import { RequestsLandingComponent } from './pages/requests-landing/requests-landing.component';
import { SignRequestsComponent } from './pages/sign-requests/sign-requests.component';
import { RejectRequestsComponent } from './pages/reject-requests/reject-requests.component';
import { CancelRequestsComponent } from './pages/cancel-requests/cancel-requests.component';
import { SelectedRequestsGuard } from './guards/selected-requests.guard';
import { SignRequestsStatusComponent } from './pages/sign-requests-status/sign-requests-status.component';
import { RejectRequestsStatusComponent } from './pages/reject-requests-status/reject-requests-status.component';
import { LastTransactionsGuard } from './guards/last-transactions.guard';
import { ClearOnExitRequestsGuard } from './guards/clear-or-exit-requests.guard';
import { ClearOnExitRequestsStatusGuard } from './guards/clear-or-exit-request-status.guard';
import { CancelRequestsStatusComponent } from './pages/cancel-requests-status/cancel-requests-status.component';

export const requestRoutes: Routes = [
	{
		path: '',
		component: RequestsLandingComponent,
		canDeactivate: [ClearOnExitRequestsGuard]
	},
	{
		path: 'sign',
		children: [
			{
				path: '',
				component: SignRequestsComponent,
				canActivate: [SelectedRequestsGuard],
				canDeactivate: [ClearOnExitRequestsStatusGuard]
			},
			{
				path: 'status',
				component: SignRequestsStatusComponent,
				canActivate: [LastTransactionsGuard]
			}
		]
	},
	{
		path: 'reject',
		children: [
			{
				path: '',
				component: RejectRequestsComponent,
				canActivate: [SelectedRequestsGuard],
				canDeactivate: [ClearOnExitRequestsStatusGuard]
			},
			{
				path: 'status',
				component: RejectRequestsStatusComponent,
				canActivate: [LastTransactionsGuard]
			}
		]
	},
	{
		path: 'cancel',
		children: [
			{
				path: '',
				component: CancelRequestsComponent,
				canActivate: [SelectedRequestsGuard],
				canDeactivate: [ClearOnExitRequestsStatusGuard]
			},
			{
				path: 'status',
				component: CancelRequestsStatusComponent,
				canActivate: [LastTransactionsGuard]
			}
		]
	}
];
