import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { paymentsRoutes } from './payments.routes';
import { ServicePaymentHistoryComponent } from './pages/service-payment-history/service-payment-history.page';
import { SalaryPaymentContactComponent } from './pages/salary-payment/salary-payment-contact/salary-payment-contact.component';
import { CoreModule } from '@mcy/core/core.module';
import { SalaryPaymentAccountComponent } from './pages/salary-payment/salary-payment-account/salary-payment-account.component';
import { SalaryPaymentConfirmComponent } from './pages/salary-payment/salary-payment-confirm/salary-payment-confirm.component';
import { SalaryPaymentAmountComponent } from './pages/salary-payment/salary-payment-amount/salary-payment-amount.component';
import { SalaryPaymentSuccessComponent } from './pages/salary-payment/salary-payment-success/salary-payment-success.component';
import { ComponentsModule } from 'client/app/app/components/components.module';
import { PaymentsLandingComponent } from './pages/payments-landing/payments-landing.component';
import { ServiceComponent } from './pages/payments-landing/service/service.page';
import { SalaryComponent } from './pages/payments-landing/salary/salary.page';
import { ServiceDebtsFiltersComponent } from './pages/payments-landing/service/service-debts-filters/service-debts-filters.component';
import { ServiceDebtsListComponent } from './pages/payments-landing/service/service-debts-list/service-debts-list.component';
import { ServicePaymentsListComponent } from './pages/service-payment-history/service-payments-list/service-payments-list.component';
import { PaymentsFiltersComponent } from './components/payments-filters/payments-filters.component';
import { SalaryPaymentsListComponent } from './pages/payments-landing/salary/salary-payments-list/salary-payments-list.component';
import { ClearOnExitGuard } from 'client/app/app/modules/payments/clear-on-exit.guard';
import { SalaryRequestsListComponent } from './pages/payments-landing/salary/salary-requests-list/salary-requests-list.component'
import { ServiceRequestsListComponent } from './pages/payments-landing/service/service-requests-list/service-requests-list.component';
import { SalaryScheduledRequestsComponent } from './pages/payments-landing/salary/salary-scheduled-requests/salary-scheduled-requests.component';
import { ProviderPaymentAccountPage } from './pages/provider-payment/provider-payment-account/provider-payment-account.page';
import { ProviderPaymentAmountPage } from './pages/provider-payment/provider-payment-amount/provider-payment-amount.page';
import { ProviderPaymentContactPage } from './pages/provider-payment/provider-payment-contact/provider-payment-contact.page';
import { ProviderPaymentSuccessPage } from './pages/provider-payment/provider-payment-success/provider-payment-success.page';
import { ProviderPaymentSummaryPage } from './pages/provider-payment/provider-payment-summary/provider-payment-summary.page';
import { ProviderPageComponent } from './pages/payments-landing/provider/provider.page';
import { ProviderPaymenAccountsGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-account/provider-payment-account.guard';
import { ProviderPaymenAmountsGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-amount/provider-payment-amount.guard';
import { ProviderPaymenSummaryGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-summary/provider-payment-summary.guard';
import { ProviderPaymenSuccessGuard } from 'client/app/app/modules/payments/pages/provider-payment/provider-payment-success/provider-payment-success.guard';
import { ServicePaymentAccountPage } from './pages/service-payment/service-payment-account/service-payment-account.page';
import { ServicePaymentAmountPage } from './pages/service-payment/service-payment-amount/service-payment-amount.page';
import { ServicePaymentDebtPage } from './pages/service-payment/service-payment-debt/service-payment-debt.page';
import { ServicePaymentSuccessPage } from './pages/service-payment/service-payment-success/service-payment-success.page';
import { ServicePaymentSummaryPage } from './pages/service-payment/service-payment-summary/service-payment-summary.page';

@NgModule({
	declarations: [
		ServiceComponent,
		SalaryComponent,
		ServicePaymentHistoryComponent,
		SalaryPaymentContactComponent,
		SalaryPaymentAccountComponent,
		SalaryPaymentConfirmComponent,
		SalaryPaymentAmountComponent,
		SalaryPaymentSuccessComponent,
		PaymentsLandingComponent,
		ServiceDebtsFiltersComponent,
		ServiceDebtsListComponent,
		ServicePaymentsListComponent,
		SalaryPaymentsListComponent,
		PaymentsFiltersComponent,
		SalaryRequestsListComponent,
		ServiceRequestsListComponent,
		SalaryScheduledRequestsComponent,
		ProviderPaymentAccountPage,
		ProviderPaymentAmountPage,
		ProviderPaymentContactPage,
		ProviderPaymentSummaryPage,
		ProviderPaymentSuccessPage,
		ProviderPaymentSuccessPage,
		ProviderPageComponent,
		ServicePaymentAccountPage,
		ServicePaymentAmountPage,
		ServicePaymentDebtPage,
		ServicePaymentSuccessPage,
		ServicePaymentSummaryPage,
	],
	imports: [
		CommonModule,
		ComponentsModule,
		CoreModule.forRoot(),
		RouterModule.forChild(paymentsRoutes)
	],
	providers: [
		ClearOnExitGuard,
		ProviderPaymenAccountsGuard,
		ProviderPaymenAmountsGuard,
		ProviderPaymenSummaryGuard,
		ProviderPaymenSuccessGuard,
	]
})
export class PaymentsModule {}
