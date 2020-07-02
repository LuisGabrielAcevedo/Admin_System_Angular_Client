import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'client/app/app/services/auth.service';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IUserState, makeUserState, makeEnterpriseState, IEnterpriseState, IEnterprise  } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { UserDetailsComponent } from 'client/app/app/sidenav/user-details/user-details.component';
import { TranslateService } from '@ngx-translate/core';
import { EnterpriseDetailsComponent } from 'client/app/app/sidenav/enterprise-details/enterprise-details.component';
import { EnterprisesSelectorComponent } from 'client/app/app/sidenav/enterprises-selector/enterprises-selector.component';
import { Router } from '@angular/router';
import { SoftTokenCreateComponent } from 'client/app/app/sidenav/soft-token/soft-token-create/soft-token-create.component';
import { Subscription } from 'rxjs';
import { ModalService } from '@mcy/core/services/modal.service';
import { WelcomeModalComponent } from 'client/app/app/components/welcome-modal/welcome-modal.component';
import { makeWelcomeModal } from 'client/app/app/models/modal';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input() closed: boolean = false;
	public isUserProfileSelected: boolean = false;
	public userState: IUserState = makeUserState({});
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public MAX_OTHER_ENTERPRISE_SHOWED = 3;
	public subscription: Subscription = new Subscription();

	constructor(
		private userService: UserService,
		private translateService: TranslateService,
		private utilsService: UtilsService,
		private sidenavService: SidenavService,
		private authService: AuthService,
		private router: Router,
		private modalService: ModalService
	) { }

	get lastEntry() {
		return this.utilsService.formatDate(this.userState.user.lastEntry, true);
	}

	ngOnInit() {
		this.subscription.add(this.userService.getUserState().subscribe(state => {
			this.userState = state;
			if (!state.searchedUser && !this.userState.isLoading) {
				this.userService.findUser();
			}
		}));

		this.subscription.add(this.userService.getEnterpriseState().subscribe(state => {
			this.enterpriseState = state;
			if (!state.searchedEnterprises && !this.enterpriseState.isLoading) {
				this.userService.findEnterprise();
			}
		}));
	}

	onUsersClick() {
		this.router.navigate([ '/app/users' ]);
	}

	openUserDetails() {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.userDetails.details'),
			component: UserDetailsComponent,
			data: {
				user: this.userState.user,
				enterpriseState: this.enterpriseState
			}
		})
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	onOpenUserMenu() {
		this.isUserProfileSelected = true;
	}

	onCloseUserMenu() {
		this.isUserProfileSelected = false;
	}

	logout() {
		this.authService.logout();
	}

	onViewEnterpriseDetails() {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.enterpriseDetails.title'),
			component: EnterpriseDetailsComponent,
			data: {
				enterprise: this.enterpriseState.selectedEnterprise
			}
		});
	}

	onViewAllEnterprises() {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.allEnterprises.title'),
			component: EnterprisesSelectorComponent
		});
	}

	onOtherEnterpriseClick(enterprise: IEnterprise) {
		this.userService.changeEnterprise(enterprise);
	}

	onManageTokenClick() {
		this.sidenavService.open({
			title: this.translateService.instant('sidenav.tokenCreate.title'),
			component: SoftTokenCreateComponent,
		});
	}

	get otherEnterprises(): IEnterprise[] {
		return this.enterpriseState.enterprises.filter(
			enterprise => enterprise.id !== this.enterpriseState.selectedEnterprise.id
		).splice(0, this.MAX_OTHER_ENTERPRISE_SHOWED);
	}

	onGoToOnboardingFlow(){
		this.modalService.openDialog(
			makeWelcomeModal({
				component: WelcomeModalComponent,
				showOnboarding: true
			}),
			{
				disableClose: true,
				id: 'welcome-message-modal'
			}
		);
	}

	get hasSoftTokenWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SOFT_TOKEN.WRITE);
	}

	get hasUserManagementPermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.READ) ||
		this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.WRITE) ||
		this.userService.hasPermission(USER_PERMISSIONS.USER_MANAGEMENT.ADMIN)
	}
}
