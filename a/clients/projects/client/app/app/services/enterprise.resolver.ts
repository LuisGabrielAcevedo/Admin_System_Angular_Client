import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { StorageService } from '@mcy/main/services/storage.service';
import { Observable, of, Subscription } from 'rxjs';
import { UserService } from 'client/app/app/services/user.service';
import { IEnterprise } from 'client/app/app/models';
import { IEnterpriseState, makeEnterpriseState } from 'client/app/app/models/enterprise';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'client/app/app/services/auth.service';
import { DashboardUtilsService } from './dashboard-utils.service';
import { EnterpriseService } from './enterprise.service';

@Injectable()
export class EnterpriseResolver implements Resolve<IEnterprise> {
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public subscription: Subscription = new Subscription();

	constructor(
		private router: Router,
		private userService: UserService,
		private dashboardUtilsService: DashboardUtilsService,
		private authService: AuthService,
		private enterpriseService: EnterpriseService,
		private storage: StorageService,
	) {}

	logout(): boolean {
		this.authService.logout();
		return false;
	}

	resolve(): Observable<boolean | undefined> | any {
		return this.userService.getEnterprises().pipe(
			map(() => this.userService.getEnterpriseState().value),
			map((state) => this.checkEnterpriseDefaultStatus(state.enterprises, state.enterpriseDefault)),
			tap(() => { this.dashboardUtilsService.displayMissingSignatures() }),
			switchMap(() => this.userService.getPermissions()),
			tap(isSuccess => { if (!isSuccess) { this.authService.logout() } }),
			catchError(() => { 
				this.authService.logout();
				return of(false);
			}),
		)
	};


	checkEnterpriseDefaultStatus(enterprises: IEnterprise[], enterpriseDefault: string): boolean {
		if (enterprises.length) {
			const enterpriseFavorite = this.enterpriseService.favoriteEnterprise(enterprises, enterpriseDefault);
			const hasFavorite = !!enterpriseFavorite.length;

			if (enterprises.length === 1) {
				this.enterpriseService.setEnterpriseState(enterprises[0]);
				return true;
			} else if (hasFavorite) {
				this.enterpriseService.setEnterpriseState(enterpriseFavorite[0]);
				return true;
			} else {
				if (this.isStorageIdInEnterprises(enterprises)) {
					return true;
				} else {
					this.router.navigate(['app/enterprise']);
					return false;
				}
			}
		} else {
			this.router.navigate(['login']);
			return false;
		}
	}

	isStorageIdInEnterprises(enterprises: IEnterprise[]): boolean {
		const enterpriseId: string = this.storage.getData('enterpriseId');
		const enterpriseFiltered = enterprises.filter(enterprise => enterprise.id === enterpriseId);
		if (!enterpriseFiltered.length) {
			this.storage.removeData('enterpriseId');
		}
		return !!enterpriseFiltered.length;
	}
}
