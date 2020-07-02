import { Routes } from '@angular/router';

// PAGES
import { LandingPage } from 'client/app/app/modules/transfers/pages/landing/landing.page';
import { TransferTypeSelectionPage } from 'client/app/app/modules/transfers/pages/transfer-type-selection/transfer-type-selection.page';
import { TransfersProcessedComponent } from 'client/app/app/modules/transfers/pages/transfers-processed/transfers-processed.component';
import {
	NewOwnTransferAccountsPage
} from 'client/app/app/modules/transfers/pages/new-own-transfer-accounts/new-own-transfer-accounts.page';
import { NewOwnTransferAmountPage } from 'client/app/app/modules/transfers/pages/new-own-transfer-amount/new-own-transfer-amount.page';
import { NewOwnTransferSummaryPage } from 'client/app/app/modules/transfers/pages/new-own-transfer-summary/new-own-transfer-summary.page';
import { TransferSuccessPage } from 'client/app/app/modules/transfers/pages/transfer-success/transfer-success.page';
import { NewThirdPartyTransferAccountPage } from './pages/new-third-party-transfer-account/new-third-party-transfer-account.page';
import { NewThirdPartyTransferAmountPage } from './pages/new-third-party-transfer-amount/new-third-party-transfer-amount.page';
import { NewThirdPartyTransferContactPage } from './pages/new-third-party-transfer-contact/new-third-party-transfer-contact.page';
import { NewThirdPartyTransferSuccessPage } from './pages/new-third-party-transfer-success/new-third-party-transfer-success.page';
import { NewThirdPartyTransferSummaryPage } from './pages/new-third-party-transfer-summary/new-third-party-transfer-summary.page';

// GUARDS
import { ClearOnExitGuard } from './clear-on-exit.guard';
import { NewOwnTransferAccountGuard } from './pages/new-own-transfer-accounts/new-own-transfer-accounts.guard';
import { NewOwnTransferAmountsGuard } from './pages/new-own-transfer-amount/new-own-transfer-amounts.guard';
import { TransferSuccessGuard } from './pages/transfer-success/transfer-success.guard';
import { NewThirdPartyTransferAmountsGuard } from './pages/new-third-party-transfer-amount/new-third-party-transfer-amounts.guard';
import { NewThirdPartyTransferAccountsGuard } from './pages/new-third-party-transfer-account/new-third-party-transfer-accounts.guard';
import { NewThirdPartyTransferSummaryGuard } from './pages/new-third-party-transfer-summary/new-third-party-transfer-summary.guard';
import { NewThirdPartyTransferSuccessGuard } from './pages/new-third-party-transfer-success/new-third-party-transfer-success.guard';
import { NewThirdPartyTransferContactGuard } from './pages/new-third-party-transfer-contact/new-third-party-transfer-contact.guard';
import { TransferTypeSelectionGuard } from './pages/transfer-type-selection/transfer-type-selection.guard';

export const routes: Routes = [
	{
		path: '',
		component: LandingPage,
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'new',
		component: TransferTypeSelectionPage,
		canActivate: [ TransferTypeSelectionGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'transfersProcessed',
		component: TransfersProcessedComponent,
		canDeactivate: [ ClearOnExitGuard ]
	},

	// OWN ACCOUNT TRANSFER FLOW

	{
		path: 'ownTransferAccounts',
		component: NewOwnTransferAccountsPage,
		canActivate: [ NewOwnTransferAccountGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'ownTransferAmount',
		component: NewOwnTransferAmountPage,
		canActivate: [ NewOwnTransferAmountsGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'ownTransferSummary',
		component: NewOwnTransferSummaryPage,
		canActivate: [ NewOwnTransferAmountsGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'success',
		component: TransferSuccessPage,
		canActivate: [ TransferSuccessGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},

	// THIRD PARTY TRANSFER FLOW

	{
		path: 'thirdPartyTransferContact',
		component: NewThirdPartyTransferContactPage,
		canActivate: [ NewThirdPartyTransferContactGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'thirdPartyTransferAmount',
		component: NewThirdPartyTransferAmountPage,
		canActivate: [ NewThirdPartyTransferAmountsGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'thirdPartyTransferAccount',
		component: NewThirdPartyTransferAccountPage,
		canActivate: [ NewThirdPartyTransferAccountsGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'thirdPartyTransferSummary',
		component: NewThirdPartyTransferSummaryPage,
		canActivate: [ NewThirdPartyTransferSummaryGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	},
	{
		path: 'thirdPartyTransferSuccess',
		component: NewThirdPartyTransferSuccessPage,
		canActivate: [ NewThirdPartyTransferSuccessGuard ],
		canDeactivate: [ ClearOnExitGuard ]
	}
];
