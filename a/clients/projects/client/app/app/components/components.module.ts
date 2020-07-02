import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@mcy/core/core.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavFeedbackComponent } from './sidenav-feedback/sidenav-feedback.component';
import { SidenavFooterComponent } from './sidenav-footer/sidenav-footer.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { SidenavSelectComponentDirective } from './sidenav-content/sidenav-select-component/sidenav-select-component.directive';
import { SidenavSelectComponent } from './sidenav-content/sidenav-select-component/sidenav-select-component.component';
import { SoftTokenComponent } from './soft-token/soft-token.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavCancelComponent } from './sidenav-cancel/sidenav-cancel.component';
import { MenuComponent } from './menu/menu.component';
import { AccountSelectComponent } from './account-select/account-select.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotificationComponent } from './header/notification/notification.component';
import { StepperGuidelinesComponent } from './stepper-guidelines/stepper-guidelines.component';
import { PrimaryPageLayout } from './primary-page-layout/primary-page.layout';
import { SecondaryInputComponent } from './secondary-input/secondary-input.component';
import { PrimaryPanelLayout } from './primary-panel-layout/primary-panel.layout';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactSearchFormComponent } from './contact-search-form/contact-search-form.component';
import { NoDataMessageComponent } from './no-data-message/no-data-message.component';
import { FindContactFormComponent } from './find-contact-form/find-contact-form.component';
import 'hammerjs';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselDynamicItemComponent } from './carousel/carousel-dynamic-item/carousel-dynamic-item.component';
import { CarouselDynamicItemDirective } from './carousel/carousel-dynamic-item/carousel-dynamic-item.directive';
import { UserProfileImageComponent } from './user-profile-image/user-profile-image.component';
import { EnterpriseButtonComponent } from './header/enterprise-button/enterprise-button.component';
import { BadgeIconComponent } from './badge-icon/badge-icon.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { EnterpriseSelectorComponent } from './enterprise-selector/enterprise-selector.component';
import { StatusIconComponent } from './status-icon/status-icon.component';
import { RequestsSelectionComponent } from './requests-list/requests-selection/requests-selection.component';
import { SignatureComponent } from './requests-list/signature/signature.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NewContactBoxComponent } from './new-contact-box/new-contact-box.component';
import { SidenavErrorComponent } from './sidenav-error/sidenav-error.component';
import {
	VoxelLoadingCircleModule,
	VoxelCheckboxModule,
	SegmentTypes,
	VoxelConfigModule,
	VoxelSegmentService
} from '@voxel/internet';
import {
	VoxelRadioButtonModule
} from '@voxel/mobile';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component';
import { TermsAndConditionsModalComponent } from './terms-and-conditions-modal/terms-and-conditions-modal.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { ContactFilterListComponent } from './contact-filter-list/contact-filter-list.component'
import { AccountTotalBalanceComponent } from 'client/app/app/components/account-total-balance/account-total-balance.component';
import { AccountSelectorComponent } from 'client/app/app/components/account-selector/account-selector.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { SidenavSoftTokenErrorComponent } from './sidenav-soft-token-error/sidenav-soft-token-error.component';
import { DebtCardComponent } from './debt-card/debt-card.component';
import { OnboardingCarouselComponent } from './welcome-modal/onboarding-carousel/onboarding-carousel.component';
import { OnboardingImageComponent } from './welcome-modal/onboarding-image/onboarding-image.component';
import { NeedHelpModalComponent } from './need-help-modal/need-help-modal.component';
import { DynamicInnerHtmlComponent } from './dynamic-inner-html/dynamic-inner-html.component'
import { EmptyDataComponent } from 'client/app/app/components/empty-data/empty-data.component';

@NgModule({
	declarations: [
		SidenavFeedbackComponent,
		SidenavFooterComponent,
		SidenavContentComponent,
		SidenavSelectComponentDirective,
		SidenavSelectComponent,
		SoftTokenComponent,
		HeaderComponent,
		FooterComponent,
		SidenavCancelComponent,
		MenuComponent,
		AccountSelectComponent,
		ProfileImageComponent,
		AmountInputComponent,
		FavoriteComponent,
		NotificationComponent,
		StepperGuidelinesComponent,
		PrimaryPageLayout,
		SecondaryInputComponent,
		UserProfileImageComponent,
		PrimaryPanelLayout,
		ContactListComponent,
		ContactSearchFormComponent,
		NoDataMessageComponent,
		FindContactFormComponent,
		CarouselComponent,
		CarouselDynamicItemComponent,
		CarouselDynamicItemDirective,
		EnterpriseButtonComponent,
		BadgeIconComponent,
		SlideToggleComponent,
		StatusIconComponent,
		RequestsListComponent,
		SignatureComponent,
		RequestsSelectionComponent,
		EnterpriseSelectorComponent,
		StatusIconComponent,
		NewContactBoxComponent,
		SidenavErrorComponent,
		WelcomeModalComponent,
		NotificationItemComponent,
		TermsAndConditionsModalComponent,
		ContactFilterListComponent,
		AccountTotalBalanceComponent,
		AccountSelectorComponent,
		AccountDetailsComponent,
		SidenavSoftTokenErrorComponent,
		DebtCardComponent,
		OnboardingCarouselComponent,
		OnboardingImageComponent,
		NeedHelpModalComponent,
		DynamicInnerHtmlComponent,
		EmptyDataComponent,
	],
	exports: [
		SidenavFeedbackComponent,
		SidenavFooterComponent,
		SidenavContentComponent,
		SoftTokenComponent,
		HeaderComponent,
		MenuComponent,
		AccountSelectComponent,
		ProfileImageComponent,
		AmountInputComponent,
		FavoriteComponent,
		UserProfileImageComponent,
		NotificationComponent,
		StepperGuidelinesComponent,
		PrimaryPageLayout,
		SecondaryInputComponent,
		PrimaryPanelLayout,
		ContactListComponent,
		ContactSearchFormComponent,
		NoDataMessageComponent,
		FindContactFormComponent,
		CarouselComponent,
		EnterpriseButtonComponent,
		BadgeIconComponent,
		SlideToggleComponent,
		StatusIconComponent,
		RequestsListComponent,
		SignatureComponent,
		RequestsSelectionComponent,
		EnterpriseSelectorComponent,
		StatusIconComponent,
		NewContactBoxComponent,
		VoxelLoadingCircleModule,
		VoxelCheckboxModule,
		VoxelConfigModule,
		VoxelRadioButtonModule,
		SidenavErrorComponent,
		WelcomeModalComponent,
		NotificationItemComponent,
		TermsAndConditionsModalComponent,
		ContactFilterListComponent,
		AccountTotalBalanceComponent,
		AccountSelectorComponent,
		AccountDetailsComponent,
		DebtCardComponent,
		EmptyDataComponent,
	],
	providers: [
		VoxelSegmentService
	],
	imports: [
		CommonModule,
		CoreModule.forRoot(),
		RouterModule,
		ReactiveFormsModule,
		CurrencyMaskModule,
		NguCarouselModule,
		VoxelLoadingCircleModule,
		VoxelCheckboxModule,
		VoxelRadioButtonModule,
		VoxelConfigModule.forRoot({
			production: true,
			segment: SegmentTypes.Varejo,
		})
	],
	entryComponents: [
		OnboardingImageComponent
	]
})
export class ComponentsModule {}
