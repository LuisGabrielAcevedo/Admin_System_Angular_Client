import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { requestRoutes } from './request.routes';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@mcy/core/core.module';
import { RequestsLandingComponent } from './pages/requests-landing/requests-landing.component';
import { ComponentsModule } from 'client/app/app/components/components.module';
import { RequestsFiltersComponent } from './pages/requests-landing/requests-filters/requests-filters.component';
import { RequestsActionsListComponent } from './components/requests-actions-list/requests-actions-list.component';
import { SignRequestsComponent } from './pages/sign-requests/sign-requests.component';
import { CancelRequestsComponent } from './pages/cancel-requests/cancel-requests.component';
import { RejectRequestsComponent } from './pages/reject-requests/reject-requests.component';
import { RequestsActionsFooterComponent } from './components/requests-actions-footer/requests-actions-footer.component';
import { SelectedRequestsGuard } from './guards/selected-requests.guard';
import { SignRequestsStatusComponent } from './pages/sign-requests-status/sign-requests-status.component';
import { RejectRequestsStatusComponent } from './pages/reject-requests-status/reject-requests-status.component';
import { ClearOnExitRequestsGuard } from './guards/clear-or-exit-requests.guard';
import { LastTransactionsGuard } from './guards/last-transactions.guard';
import { ClearOnExitRequestsStatusGuard } from './guards/clear-or-exit-request-status.guard';
import { CancelRequestsStatusComponent } from './pages/cancel-requests-status/cancel-requests-status.component';

@NgModule({
	declarations: [
		RequestsLandingComponent,
		RequestsFiltersComponent,
		RequestsActionsListComponent,
		SignRequestsComponent,
		CancelRequestsComponent,
		RejectRequestsComponent,
		RequestsActionsFooterComponent,
		SignRequestsStatusComponent,
		RejectRequestsStatusComponent,
		CancelRequestsStatusComponent
	],
	exports: [],
	imports: [
		CommonModule,
		RouterModule.forChild(requestRoutes),
		ComponentsModule,
		CoreModule
	],
	providers: [
		SelectedRequestsGuard,
		ClearOnExitRequestsGuard,
		LastTransactionsGuard,
		ClearOnExitRequestsStatusGuard
	],
})
export class RequestsModule {}
