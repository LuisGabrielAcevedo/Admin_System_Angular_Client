import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainModule } from '@mcy/main/main.module';
import { CoreModule } from '@mcy/core/core.module';
import { appRoutes } from './app.routes';
import { PlaygroundPage } from './pages/playground/playground.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ContactsPage } from './pages/contacts/contacts.page';
import { SearchContactFormComponent } from './pages/contacts/search-contact-form/search-contact-form.component';
import { DeleteContactModalComponent } from './pages/contacts/delete-contact-modal/delete-contact-modal.component';
import { ExportCSVModalComponent } from './pages/contacts/export-csv-modal/export-csv-modal.component';
import { MainLayout } from './layouts/main/main.layout';
import { ContactService } from './services/contact.service';
import { ServicePaymentService } from './services/service-payment.service';
import { ComponentsModule } from './components/components.module';
import { SidebarModule } from 'ng-sidebar';
import { SidenavService } from './services/sidenav.service';
import { SidenavModule } from './sidenav/sidenav.module';
import { FormValidationsService } from './services/form-validations.service';
import { AuthService } from './services/auth.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { CSVService } from './services/csv.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SalaryPaymentCancelComponent } from './modules/payments/pages/salary-payment/cancel-modal/salary-payment-cancel.component';
import { UncoverComponent } from './modules/payments/pages/salary-payment/salary-payment-account/uncover-modal/uncover-modal.component';
import { AccountService } from './services/account.service';
import { SalaryPaymentService } from './services/salary-payment.service';
import { TransferService } from './services/transfer.service';
import { ServiceCategoryService } from './services/service-category.service';
import { ServiceDebtService } from './services/service-debt.service';
import { ServiceService } from './services/service.service';
import { AccountComponent } from './modules/accounts/pages/accounts-landing/account/account.component';
import { MovementsService } from './services/movements.service';
import { StatementsService } from './services/statements.service';
import { EnterpriseSelectPage } from './pages/enterprise-select/enterprise-select.page';
import { EnterpriseResolver } from 'client/app/app/services/enterprise.resolver';
import { PdfService } from './services/pdf.service';
import { ReceiptsService } from './services/receipts.service';
import { SignaturesService } from './services/signatures.service';
import { RequestsService } from './services/requests.service';
import { TransactionService } from './services/transaction.service';
import { EmployeeService } from './services/employee.service';
import { ScheduledRequestCardComponent } from './modules/requests/components/scheduled-request-card/scheduled-request-card.component';
import { CancelScheduledRequestComponent } from './modules/requests/components/cancel-scheduled-request/cancel-scheduled-request.component';
import { WelcomeModalComponent } from './components/welcome-modal/welcome-modal.component';
import { ConceptService } from './services/concept.service';
import { ProviderPaymentService } from './services/provider-payment.service';
import { TermsAndConditionsModalComponent } from './components/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { CheckbooksService } from './services/checkbooks.service';
import { CheckbooksTypesService } from './services/checkbooks-types.service';
import { TransactionUtilsService } from './services/transaction-utils.service';
import { NotificationService } from './services/notification.service';
import { ChecksService } from './services/checks.service';
import { SoftTokenService } from './services/soft-token.service';
import { AccountMovementsComponent } from './pages/dashboard/account-movements/account-movements.component';
import { SidenavSoftTokenErrorComponent } from './components/sidenav-soft-token-error/sidenav-soft-token-error.component';
import { DashboardUtilsService } from './services/dashboard-utils.service';
import { ChecksDetailsComponent } from './pages/dashboard/checks-details/checks-details.component';
import { ChecksListComponent } from './pages/dashboard/checks-list/checks-list.component';
import { EnterpriseSelectGuard } from './pages/enterprise-select/enterprise-select.guard';
import { EnterpriseService } from './services/enterprise.service';
import { NeedHelpModalComponent } from './components/need-help-modal/need-help-modal.component'
import { UpcomingMaturitiesComponent } from './pages/dashboard/upcoming-maturities/upcoming-maturities.component';
import { FavoriteContactsComponent } from './pages/dashboard/favorite-contacts/favorite-contacts.component';
import { EmptyDebtsComponent } from 'client/app/app/pages/dashboard/empty-debts/empty-debts.component';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'client/assets/i18n/app/', '.json');
}

@NgModule({
	imports: [
		MainModule,
		ComponentsModule,
		HttpClientModule,
		SidenavModule,
		SidebarModule.forRoot(),
		CoreModule.forRoot(),
		RouterModule.forChild(appRoutes),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})

	],
	exports: [ ],
	entryComponents: [
		DeleteContactModalComponent,
		ExportCSVModalComponent,
		SalaryPaymentCancelComponent,
		UncoverComponent,
		WelcomeModalComponent,
		TermsAndConditionsModalComponent,
		AccountComponent,
		ScheduledRequestCardComponent,
		CancelScheduledRequestComponent,
		SidenavSoftTokenErrorComponent,
		NeedHelpModalComponent

	],
	declarations: [
		MainLayout,
		DashboardPage,
		PlaygroundPage,
		SearchContactFormComponent,
		ContactsPage,
		DeleteContactModalComponent,
		ExportCSVModalComponent,
		SalaryPaymentCancelComponent,
		UncoverComponent,
		AccountComponent,
		EnterpriseSelectPage,
		ScheduledRequestCardComponent,
		CancelScheduledRequestComponent,
		AccountMovementsComponent,
		ChecksDetailsComponent,
		ChecksListComponent,
		UpcomingMaturitiesComponent,
		FavoriteContactsComponent,
		EmptyDebtsComponent,
	],
	providers: [
		ContactService,
		PlaygroundPage,
		ServicePaymentService,
		ServiceCategoryService,
		ServiceDebtService,
		ServiceService,
		SidenavService,
		FormValidationsService,
		AuthService,
		UtilsService,
		CSVService,
		AccountService,
		SalaryPaymentService,
		TransferService,
		MovementsService,
		StatementsService,
		PdfService,
		ReceiptsService,
		EnterpriseResolver,
		RequestsService,
		SignaturesService,
		TransactionService,
		EmployeeService,
		ConceptService,
		ProviderPaymentService,
		CheckbooksService,
		CheckbooksTypesService,
		NotificationService,
		TransactionUtilsService,
		ChecksService,
		SoftTokenService,
		DashboardUtilsService,
		EnterpriseSelectGuard,
		EnterpriseService,
	]
})
export class AppModule {
	constructor(translate: TranslateService) {
		translate.setDefaultLang('es');
		translate.use('es');
	}
}
