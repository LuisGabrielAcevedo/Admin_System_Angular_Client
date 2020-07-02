import { Routes } from '@angular/router';
import { SalaryPaymentContactComponent } from './pages/salary-payment/salary-payment-contact/salary-payment-contact.component';
import { SalaryPaymentAccountComponent } from './pages/salary-payment/salary-payment-account/salary-payment-account.component';
import { SalaryPaymentConfirmComponent } from './pages/salary-payment/salary-payment-confirm/salary-payment-confirm.component';
import { SalaryPaymentSuccessComponent } from './pages/salary-payment/salary-payment-success/salary-payment-success.component';
import { SalaryPaymentAmountComponent } from './pages/salary-payment/salary-payment-amount/salary-payment-amount.component';
import { PaymentsLandingComponent } from './pages/payments-landing/payments-landing.component';
import { ServicePaymentHistoryComponent } from './pages/service-payment-history/service-payment-history.page';
import { ClearOnExitGuard } from 'client/app/app/modules/payments/clear-on-exit.guard';
import { ProviderPaymentAccountPage } from './pages/provider-payment/provider-payment-account/provider-payment-account.page';
import { ProviderPaymentAmountPage } from './pages/provider-payment/provider-payment-amount/provider-payment-amount.page';
import { ProviderPaymentContactPage } from './pages/provider-payment/provider-payment-contact/provider-payment-contact.page';
import { ProviderPaymentSuccessPage } from './pages/provider-payment/provider-payment-success/provider-payment-success.page';
import { ProviderPaymentSummaryPage } from './pages/provider-payment/provider-payment-summary/provider-payment-summary.page';

// GUARDS
import { ProviderPaymenContactGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-contact/provider-payment-contact.guard';
import { ProviderPaymenAccountsGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-account/provider-payment-account.guard';
import { ProviderPaymenAmountsGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-amount/provider-payment-amount.guard';
import { ProviderPaymenSummaryGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-summary/provider-payment-summary.guard';
import { ProviderPaymenSuccessGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-success/provider-payment-success.guard';
import { ServicePaymentDebtPage } from './pages/service-payment/service-payment-debt/service-payment-debt.page';
import { ServicePaymentAmountPage } from './pages/service-payment/service-payment-amount/service-payment-amount.page';
import { ServicePaymentAccountPage } from './pages/service-payment/service-payment-account/service-payment-account.page';
import { ServicePaymentSummaryPage } from './pages/service-payment/service-payment-summary/service-payment-summary.page';
import { ServicePaymentSuccessPage } from './pages/service-payment/service-payment-success/service-payment-success.page';
import { SalaryPaymentContactGuard } from './pages/salary-payment/salary-payment-contact/salary-payment-contact.guard';
import { SalaryPaymentSuccessGuard } from './pages/salary-payment/salary-payment-success/salary-payment-success.guard';
import { SalaryPaymentConfirmGuard } from './pages/salary-payment/salary-payment-confirm/salary-payment-confirm.guard';
import { SalaryPaymentAmountGuard } from './pages/salary-payment/salary-payment-amount/salary-payment-amount.guard';
import { SalaryPaymentAccountGuard } from './pages/salary-payment/salary-payment-account/salary-payment-account.guard';
import { ServicePaymentHistoryGuard } from './pages/service-payment-history/service-payment-history.guard';
import { ServicePaymentAccountGuard } from './pages/service-payment/service-payment-account/service-payment-account.guard';
import { ServicePaymentAmountGuard } from './pages/service-payment/service-payment-amount/service-payment-amount.guard';
import { ServicePaymentSuccessGuard } from './pages/service-payment/service-payment-success/service-payment-success.guard';
import { ServicePaymentSummaryGuard } from './pages/service-payment/service-payment-summary/service-payment-summary.guard';
import { ServicePaymentDebtGuard } from './pages/service-payment/service-payment-debt/service-payment-debt.guard';

export const paymentsRoutes: Routes = [
	{
		path: '',
		component: PaymentsLandingComponent
	},
	{
		path: 'salary',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'contact'
			},
			{
				path: 'contact',
				component: SalaryPaymentContactComponent,
				canActivate: [ SalaryPaymentContactGuard ]
			},
			{
				path: 'account',
				component: SalaryPaymentAccountComponent,
				canActivate: [ SalaryPaymentAccountGuard ]

			},
			{
				path: 'amount',
				component: SalaryPaymentAmountComponent,
				canActivate: [ SalaryPaymentAmountGuard ]
			},
			{
				path: 'confirmation',
				component: SalaryPaymentConfirmComponent,
				canActivate: [ SalaryPaymentConfirmGuard ]
			},
			{
				path: 'success',
				component: SalaryPaymentSuccessComponent,
				canActivate: [ SalaryPaymentSuccessGuard ]
			}
		],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'service',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'history'
			},
			{
				path: 'history',
				component: ServicePaymentHistoryComponent,
				canActivate: [ ServicePaymentHistoryGuard ]
			},
			{
				path: 'debt',
				component: ServicePaymentDebtPage,
				canActivate: [ ServicePaymentDebtGuard ]
			},
			{
				path: 'account',
				component: ServicePaymentAccountPage,
				canActivate: [ ServicePaymentAccountGuard ]
			},
			{
				path: 'amount',
				component: ServicePaymentAmountPage,
				canActivate: [ ServicePaymentAmountGuard ]
			},
			{
				path: 'confirmation',
				component: ServicePaymentSummaryPage,
				canActivate: [ ServicePaymentSummaryGuard ]
			},
			{
				path: 'success',
				component: ServicePaymentSuccessPage,
				canActivate: [ ServicePaymentSuccessGuard ]
			},
		],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'provider',
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'contact'
			},
			{
				path: 'contact',
				component: ProviderPaymentContactPage,
				canActivate: [ ProviderPaymenContactGuard ]
			},
			{
				path: 'account',
				component: ProviderPaymentAccountPage,
				canActivate: [ ProviderPaymenAccountsGuard ]
			},
			{
				path: 'amount',
				component: ProviderPaymentAmountPage,
				canActivate: [ ProviderPaymenAmountsGuard ]
			},
			{
				path: 'confirmation',
				component: ProviderPaymentSummaryPage,
				canActivate: [ ProviderPaymenSummaryGuard ]
			},
			{
				path: 'success',
				component: ProviderPaymentSuccessPage,
				canActivate: [ ProviderPaymenSuccessGuard ]
			}
		],
		canDeactivate: [ ClearOnExitGuard ]
	}
];
