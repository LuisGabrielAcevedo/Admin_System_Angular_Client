import { NgModule } from '@angular/core';
import { CheckbooksLandingComponent } from './pages/checkbooks-landing/checkbooks-landing.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { checkbookRoutes } from './checkbooks.routes';
import { CoreModule } from '@mcy/core/core.module';
import { ChecksIssuedComponent } from './pages/checkbooks-landing/checks-issued/checks-issued.component';
import { ChecksReceivedComponent } from './pages/checkbooks-landing/checks-received/checks-received.component';
import { CheckbooksComponent } from './pages/checkbooks-landing/checkbooks/checkbooks.component';
import { ComponentsModule } from 'client/app/app/components/components.module';
import { CheckbookListComponent } from './pages/checkbooks-landing/checkbooks/checkbook-list/checkbook-list.component';
import { ChecksDiscountedComponent } from './pages/checkbooks-landing/checks-discounted/checks-discounted.component';
import { ChecksIssuedListComponent } from './pages/checkbooks-landing/checks-issued/checks-issued-list/checks-issued-list.component';
import { ChecksIssuedFiltersComponent } from './pages/checkbooks-landing/checks-issued/checks-issued-filters/checks-issued-filters.component';
import { ChecksDiscountedListComponent } from './pages/checkbooks-landing/checks-discounted/checks-discounted-list/checks-discounted-list.component';
import {
	ChecksDiscountedFiltersComponent
} from './pages/checkbooks-landing/checks-discounted/checks-discounted-filters/checks-discounted-filters.component';
import {
	ChecksReceivedListComponent
} from './pages/checkbooks-landing/checks-received/checks-received-list/checks-received-list.component';
import {
	ChecksReceivedFiltersComponent
} from './pages/checkbooks-landing/checks-received/checks-received-filters/checks-received-filters.component';
import { CheckServiceErrorsComponent } from './components/check-service-errors/check-service-errors.component';

@NgModule({
	declarations: [
		CheckbooksLandingComponent,
		ChecksIssuedComponent,
		ChecksReceivedComponent,
		CheckbooksComponent,
		CheckbookListComponent,
		ChecksDiscountedComponent,
		ChecksIssuedListComponent,
		ChecksIssuedFiltersComponent,
		ChecksDiscountedListComponent,
		ChecksDiscountedFiltersComponent,
		ChecksReceivedListComponent,
		ChecksReceivedFiltersComponent,
		CheckServiceErrorsComponent,
	],
	exports: [
		CheckServiceErrorsComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(checkbookRoutes),
		ComponentsModule,
		CoreModule,
	],
})
export class CheckbooksModule {}
