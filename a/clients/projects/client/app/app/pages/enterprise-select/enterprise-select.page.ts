import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@mcy/main/services/storage.service';
import { UserService } from 'client/app/app/services/user.service';
import { IUserState, makeUserState } from 'client/app/app/models/user';
import { ITEMS_PER_PAGE } from 'client/app/app/constants';
import { AuthService } from 'client/app/app/services/auth.service';
import { Subscription } from 'rxjs';
import { IEnterpriseState, makeEnterpriseState, IEnterprise } from 'client/app/app/models';

@Component({
	selector: 'mcy-enterprise-select',
	templateUrl: './enterprise-select.page.html',
	styleUrls: ['./enterprise-select.page.scss']
})
export class EnterpriseSelectPage implements OnInit, OnDestroy {
	public userState: IUserState = makeUserState({});
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public itemsDisplayed: number = ITEMS_PER_PAGE;
	public subscription: Subscription = new Subscription();

	constructor(
		private router: Router,
		private storage: StorageService,
		private userService: UserService,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.subscription.add(this.userService.getUserState().subscribe(state => {
			this.userState = state;
			if (!state.searchedUser && !this.userState.isLoading) {
				this.userService.findUser();
			}
		}));

		this.subscription.add(this.userService.getEnterpriseState().subscribe(state => {
			this.enterpriseState = state;
			if (!state.selectedEnterprise && !this.enterpriseState.isLoading) {
				this.userService.findEnterprise();
			}
		}));
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	goToDashboard(enterprise: IEnterprise) {
		if (this.enterpriseState.selectedEnterprise.id !== enterprise.id) {
			this.userService.setEnterprise(enterprise);
		}
		this.updateUserState();
		this.router.navigateByUrl('app/dashboard');
	}

	updateUserState() {
		const lastEntry: Date = this.storage.getData('lastEntry');
		this.userService.updateUserState({ user: { ...this.userState.user, lastEntry } });
	}

	logout() {
		this.authService.logout();
	}

	get isLoadingEnterprisePermissions(): boolean {
		return this.userState.loadingPermissions;
	}
}
