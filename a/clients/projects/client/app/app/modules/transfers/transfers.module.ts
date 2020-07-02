import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './transfers.routes';
import { CoreModule } from '@mcy/core/core.module';
import { ComponentsModule } from 'client/app/app/components/components.module';
import { LandingPage } from 'client/app/app/modules/transfers/pages/landing/landing.page';
import {
	NewOwnTransferAccountsPage
} from 'client/app/app/modules/transfers/pages/new-own-transfer-accounts/new-own-transfer-accounts.page';
import { TransferTypeSelectionPage } from 'client/app/app/modules/transfers/pages/transfer-type-selection/transfer-type-selection.page';
import { NewOwnTransferAmountPage } from 'client/app/app/modules/transfers/pages/new-own-transfer-amount/new-own-transfer-amount.page';
import { TransferSuccessPage } from 'client/app/app/modules/transfers/pages/transfer-success/transfer-success.page';
import { NewOwnTransferSummaryPage } from 'client/app/app/modules/transfers/pages/new-own-transfer-summary/new-own-transfer-summary.page';
import {
	SelectOwnAccountsTransferComponent
} from 'client/app/app/modules/transfers/pages/new-own-transfer-accounts/select-own-accounts/select-own-accounts-transfer.component';
import { TransferTypeComponent } from './pages/transfer-type-selection/transfer-type/transfer-type.component';

import { TransferSuccessGuard } from './pages/transfer-success/transfer-success.guard';
import { NewOwnTransferAccountGuard } from './pages/new-own-transfer-accounts/new-own-transfer-accounts.guard';
import { NewOwnTransferAmountsGuard } from './pages/new-own-transfer-amount/new-own-transfer-amounts.guard';
import { ClearOnExitGuard } from './clear-on-exit.guard';
import {
	SelectTransferamountComponent
} from 'client/app/app/modules/transfers/pages/new-own-transfer-amount/select-transfer-amount/select-transfer-amount.component';
import { NewThirdPartyTransferAccountPage } from './pages/new-third-party-transfer-account/new-third-party-transfer-account.page';
import { NewThirdPartyTransferAmountPage } from './pages/new-third-party-transfer-amount/new-third-party-transfer-amount.page';
import { NewThirdPartyTransferContactPage } from './pages/new-third-party-transfer-contact/new-third-party-transfer-contact.page';
import { NewThirdPartyTransferSuccessPage } from './pages/new-third-party-transfer-success/new-third-party-transfer-success.page';
import { NewThirdPartyTransferSummaryPage } from './pages/new-third-party-transfer-summary/new-third-party-transfer-summary.page';
import { NewThirdPartyTransferAmountsGuard } from 'client/app/app/modules/transfers/pages/new-third-party-transfer-amount/new-third-party-transfer-amounts.guard';
import { NewThirdPartyTransferAccountsGuard } from 'client/app/app/modules/transfers/pages/new-third-party-transfer-account/new-third-party-transfer-accounts.guard';
import { NewThirdPartyTransferSummaryGuard } from 'client/app/app/modules/transfers/pages/new-third-party-transfer-summary/new-third-party-transfer-summary.guard';
import { NewThirdPartyTransferSuccessGuard } from 'client/app/app/modules/transfers/pages/new-third-party-transfer-success/new-third-party-transfer-success.guard';
import { TransfersProcessedComponent } from './pages/transfers-processed/transfers-processed.component';
import { TotalBalanceComponent } from './pages/landing/total-balance/total-balance.component';
import { TransferFilterFormComponent } from './pages/transfers-processed/transfer-filter-form/transfer-filter-form.component';
import { TransfersRequestsListComponent } from './pages/landing/transfers-requests-list/transfers-requests-list.component';

@NgModule({
	declarations: [
		LandingPage,
		NewOwnTransferAccountsPage,
		TransferTypeSelectionPage,
		NewOwnTransferAmountPage,
		TransferSuccessPage,
		NewOwnTransferSummaryPage,
		SelectOwnAccountsTransferComponent,
		SelectTransferamountComponent,
		TransferTypeComponent,
		NewThirdPartyTransferAccountPage,
		NewThirdPartyTransferAmountPage,
		NewThirdPartyTransferContactPage,
		NewThirdPartyTransferSuccessPage,
		NewThirdPartyTransferSummaryPage,
		TransfersProcessedComponent,
		TotalBalanceComponent,
		TransferFilterFormComponent,
		TransfersRequestsListComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		CoreModule.forRoot(),
		RouterModule.forChild(routes),
	],
	providers: [
		TransferSuccessGuard,
		NewOwnTransferAccountGuard,
		NewOwnTransferAmountsGuard,
		NewThirdPartyTransferAmountsGuard,
		NewThirdPartyTransferAccountsGuard,
		NewThirdPartyTransferSummaryGuard,
		NewThirdPartyTransferSuccessGuard,
		ClearOnExitGuard
	]
})
export class TransfersModule {}
