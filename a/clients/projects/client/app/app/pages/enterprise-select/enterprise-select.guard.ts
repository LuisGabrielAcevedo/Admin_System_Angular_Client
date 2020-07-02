import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DashboardUtilsService } from 'client/app/app/services/dashboard-utils.service';
import { EnterpriseService } from 'client/app/app/services/enterprise.service';
import { AuthService } from 'client/app/app/services/auth.service';
import { UserService } from 'client/app/app/services/user.service';

@Injectable()
export class EnterpriseSelectGuard implements CanActivate {

	constructor(
		private enterpriseService: EnterpriseService,
		private dashboardUtilsService: DashboardUtilsService,
		private authService: AuthService,
		private userService: UserService,
	) {}

	logout(): boolean {
		this.authService.logout();
		return false;
	}

	canActivate(): boolean {
		this.dashboardUtilsService.displayMissingSignatures();

		if (!this.enterpriseService.isEnterpriseInStorage()) {
			const isEnterpriseInState = this.userService.getEnterpriseState().value.searchedEnterprises;
			if (!isEnterpriseInState) {
				return this.logout();
			} else {
				return true;
			}
		} else {
			return this.logout();
		}
	}
}
