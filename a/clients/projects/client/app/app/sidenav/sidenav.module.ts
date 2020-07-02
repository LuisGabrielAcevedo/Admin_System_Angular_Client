import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@mcy/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentConfirmationComponent } from './service-payment/payment-confirmation/payment-confirmation.component';
import { PaymentNewComponent } from './service-payment/payment-new/payment-new.component';
import { PaymentReceiptComponent } from './service-payment/payment-receipt/payment-receipt.component';
import { ComponentsModule } from '../components/components.module';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactDeleteComponent } from './contact/contact-delete/contact-delete.component';
import { CbuErrorComponent } from './cbu-error/cbu-error.component';
import { ValidateContactComponent } from './validate-contact/validate-contact.component';
import { SoftTokenConfirmComponent } from './soft-token/soft-token-confirm/soft-token-confirm.component';
import { SalaryPaymentErrorComponent } from './salary-payment/salary-payment-error/salary-payment-error.component';
import { ServicePaymentDetailComponent } from './service-payment/service-payment-detail/service-payment-detail.component';
import { SwornDeclarationComponent } from 'client/app/app/sidenav/sworn-declaration/sworn-declaration.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';
import { ContactSuccessComponent } from './contact/contact-success/contact-success.component';
import { SalaryPaymentDetailComponent } from './salary-payment/salary-payment-detail/salary-payment-detail.component';
import { StatementsComponent } from './account/statements/statements.component';
import { BalanceDetailFullComponent } from './account/balance-detail-full/balance-detail-full.component';
import { EditAliasComponent } from './account/edit-alias/edit-alias.component';
import { EditAliasConfirmComponent } from './account/edit-alias-confirm/edit-alias-confirm.component';
import { TransferDetailsComponent } from './transfer-details/transfer-details.component';
import { ContactAddFindComponent } from './contact/contact-add-find/contact-add-find.component';
import { ContactAddConfirmationComponent } from './contact/contact-add-confirmation/contact-add-confirmation.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AccountMovementDetailComponent } from './account-movement-detail/account-movement-detail.component';
import { DebitMovementDetailComponent } from './account/debit-movement-detail/debit-movement-detail.component';
import { CreditMovementDetailComponent } from './account/credit-movement-detail/credit-movement-detail.component';
import { EnterpriseDetailsComponent } from './enterprise-details/enterprise-details.component';
import { EnterprisesSelectorComponent } from './enterprises-selector/enterprises-selector.component';
import { SalaryRequestDetailComponent } from './request/salary-request-detail/salary-request-detail.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { SoftTokenCreateComponent } from './soft-token/soft-token-create/soft-token-create.component';
import { SoftTokenEmailConfirmationComponent } from './soft-token/soft-token-email-confirmation/soft-token-email-confirmation.component';
import { SoftTokenCreateSuccessComponent } from './soft-token/soft-token-create-success/soft-token-create-success.component';
import { BindUserFormComponent } from './bind-user/bind-user-form/bind-user-form.component';
import { BindUserSuccessComponent } from './bind-user/bind-user-success/bind-user-success.component';
import { ServiceRequestDetailComponent } from './request/service-request-detail/service-request-detail.component';
import { RequestCheckbooksNewComponent } from './request-checkbooks/request-checkbooks-new/request-checkbooks-new.component';
import { RequestCheckbooksSuccessComponent } from './request-checkbooks/request-checkbooks-success/request-checkbooks-success.component';
import { CheckbookRequestDetailComponent } from './request/checkbook-request-detail/checkbook-request-detail.component';
import { EnableCheckbookComponent } from './enable-checkbook/enable-checkbook.component';
import { EnableCheckbookConfirmComponent } from './enable-checkbook-confirm/enable-checkbook-confirm.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { CheckDiscountedComponent } from './request-checkbooks/check-discounted/check-discounted.component';
import { ChecksRejectedComponent } from './checkbooks/checks-rejected/checks-rejected.component';
import { PositiveValidationComponent } from './soft-token/soft-token-create/positive-validation/positive-validation.component';

@NgModule({
	declarations: [
		PaymentConfirmationComponent,
		PaymentNewComponent,
		PaymentReceiptComponent,
		ContactEditComponent,
		ContactDeleteComponent,
		CbuErrorComponent,
		ValidateContactComponent,
		SoftTokenConfirmComponent,
		TransferDetailsComponent,
		SalaryPaymentErrorComponent,
		ServicePaymentDetailComponent,
		SwornDeclarationComponent,
		PositiveValidationComponent,
		ContactAddComponent,
		UserDetailsComponent,
		ContactSuccessComponent,
		SalaryPaymentDetailComponent,
		BalanceDetailFullComponent,
		StatementsComponent,
		EditAliasComponent,
		EditAliasConfirmComponent,
		ContactAddFindComponent,
		ContactAddConfirmationComponent,
		BalanceDetailFullComponent,
		AccountMovementDetailComponent,
		DebitMovementDetailComponent,
		CreditMovementDetailComponent,
		EnterpriseDetailsComponent,
		EnterprisesSelectorComponent,
		RequestDetailComponent,
		SalaryRequestDetailComponent,
		SoftTokenCreateComponent,
		SoftTokenEmailConfirmationComponent,
		SoftTokenCreateSuccessComponent,
		BindUserFormComponent,
		BindUserSuccessComponent,
		ServiceRequestDetailComponent,
		RequestCheckbooksNewComponent,
		RequestCheckbooksSuccessComponent,
		CheckbookRequestDetailComponent,
		CheckbookRequestDetailComponent,
		EnableCheckbookComponent,
		EnableCheckbookConfirmComponent,
		NotificationDetailsComponent,
		CheckDiscountedComponent,
		ChecksRejectedComponent,
	],
	entryComponents: [
		PaymentConfirmationComponent,
		PositiveValidationComponent,
		PaymentNewComponent,
		PaymentReceiptComponent,
		ContactEditComponent,
		ContactDeleteComponent,
		CbuErrorComponent,
		ValidateContactComponent,
		TransferDetailsComponent,
		SoftTokenConfirmComponent,
		SalaryPaymentErrorComponent,
		ServicePaymentDetailComponent,
		SwornDeclarationComponent,
		UserDetailsComponent,
		ContactAddComponent,
		ContactSuccessComponent,
		SalaryPaymentDetailComponent,
		BalanceDetailFullComponent,
		StatementsComponent,
		EditAliasComponent,
		EditAliasConfirmComponent,
		ContactAddFindComponent,
		ContactAddConfirmationComponent,
		BalanceDetailFullComponent,
		AccountMovementDetailComponent,
		DebitMovementDetailComponent,
		CreditMovementDetailComponent,
		EnterpriseDetailsComponent,
		EnterprisesSelectorComponent,
		RequestDetailComponent,
		SalaryRequestDetailComponent,
		BindUserFormComponent,
		BindUserSuccessComponent,
		SoftTokenCreateComponent,
		SoftTokenEmailConfirmationComponent,
		SoftTokenCreateSuccessComponent,
		ServiceRequestDetailComponent,
		RequestCheckbooksNewComponent,
		RequestCheckbooksSuccessComponent,
		CheckbookRequestDetailComponent,
		CheckbookRequestDetailComponent,
		EnableCheckbookComponent,
		EnableCheckbookConfirmComponent,
		NotificationDetailsComponent,
		CheckDiscountedComponent,
		ChecksRejectedComponent,
	],
	imports: [
		CommonModule,
		CoreModule.forRoot(),
		ReactiveFormsModule,
		ComponentsModule
	]
})
export class SidenavModule {}
