import { Routes } from '@angular/router';
import { PlaygroundPage } from './pages/playground/playground.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ContactsPage } from './pages/contacts/contacts.page';
import { MainLayout } from './layouts/main/main.layout';
import { EnterpriseSelectPage } from 'client/app/app/pages/enterprise-select/enterprise-select.page';
import { EnterpriseResolver } from 'client/app/app/services/enterprise.resolver';
import { EnterpriseSelectGuard } from './pages/enterprise-select/enterprise-select.guard';

export const appRoutes: Routes = [
	{
		path: '',
		component: MainLayout,
		children: [
			{
				path: '',
				redirectTo: 'dashboard'
			},
			{
				path: 'dashboard',
				component: DashboardPage
			},
			{
				path: 'playground',
				component: PlaygroundPage
			},
			{
				path: 'contacts',
				component: ContactsPage
			},
			{
				path: 'transfers',
				loadChildren: './modules/transfers/transfers.module#TransfersModule'
			},
			{
				path: 'payments',
				loadChildren: './modules/payments/payments.module#PaymentsModule'
			},
			{
				path: 'accounts',
				loadChildren: './modules/accounts/accounts.module#AccountsModule'
			},
			{
				path: 'requests',
				loadChildren: './modules/requests/requests.module#RequestsModule'
			},
			{
				path: 'users',
				loadChildren: './modules/users/users.module#UsersModule'
			},
			{
				path: 'checkbooks',
				loadChildren: './modules/checkbooks/checkbooks.module#CheckbooksModule'
			}
		],
		resolve: [ EnterpriseResolver ]
	},
	{
		path: 'enterprise',
		component: EnterpriseSelectPage,
		canActivate: [ EnterpriseSelectGuard ],
	}
];
