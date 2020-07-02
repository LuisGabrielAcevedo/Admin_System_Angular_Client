import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { accountsRoutes } from './accounts.routes';
import { AccountsLandingPage } from './pages/accounts-landing/accounts-landing.page';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'client/app/app/components/components.module';
import { CoreModule } from '@mcy/core/core.module';
import { AccountMovementsComponent } from './pages/accounts-landing/acccount-movements/account-movements.component';
import { AccountsMovementsListComponent } from './pages/accounts-landing/acccount-movements/accounts-movements-list/accounts-movements-list.component';
import { AccountsFiltersComponent } from './components/accounts-filters/accounts-filters.component';
import { LastStatementComponent } from './pages/accounts-landing/last-statement/last-statement.component';
import { BalanceDetailComponent } from './pages/accounts-landing/balance-detail/balance-detail.component';
import { AccountDetailComponent } from './pages/accounts-landing/account-detail/account-detail.component';
import { ClearOnExitGuard } from 'client/app/app/modules/accounts/guards/clear-on-exit.guard';

@NgModule({
	declarations: [
		AccountsLandingPage,
		AccountMovementsComponent,
		AccountsMovementsListComponent,
		LastStatementComponent,
		BalanceDetailComponent,
		AccountDetailComponent,
		AccountsFiltersComponent
	],
	exports: [
		AccountMovementsComponent,
		AccountsMovementsListComponent,
		LastStatementComponent,
		BalanceDetailComponent,
		AccountDetailComponent,
		AccountsFiltersComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(accountsRoutes),
		ComponentsModule,
		CoreModule
	],
	providers: [
		ClearOnExitGuard
	]
})
export class AccountsModule {}
