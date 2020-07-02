import { UtilsService } from '@mcy/core/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { EditAliasComponent } from 'client/app/app/sidenav/account/edit-alias/edit-alias.component';
import { makeAccount, IAccount, IEnterpriseState, makeEnterpriseState } from 'client/app/app/models';
import { UserService } from 'client/app/app/services/user.service';
import { Subscription } from 'rxjs';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-account-detail',
	templateUrl: './account-detail.component.html',
	styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
	@Input() account: IAccount = makeAccount({});
	public enterpriseState: IEnterpriseState = makeEnterpriseState({});
	public subscription: Subscription = new Subscription();

	constructor(
		private utilService: UtilsService,
		private translateService: TranslateService,
		private sidenavService: SidenavService,
		private userService: UserService,
	) {}

	ngOnInit() {
		this.subscription.add(this.userService.getEnterpriseState().subscribe(state => {
			this.enterpriseState = state;
			if (!state.searchedEnterprises && !this.enterpriseState.isLoading) {
				this.userService.findUser();
			}
		}));
	}

	copyToClipboard(account: IAccount) {
		const accountFromCopy = `
		${this.translateService.instant(
			'pages.accounts.accountDetail.businessName'
		)} : ${this.enterpriseState.selectedEnterprise.name} \n
		${this.translateService.instant('pages.accounts.accountDetail.cbu')}: ${
			account.cbvu
		} \n
		${this.translateService.instant('pages.accounts.accountDetail.alias')}: ${
			account.alias
		} \n
		${this.translateService.instant('pages.accounts.accountDetail.cuit')}: ${
			account.cuilt
		} \n
		${this.translateService.instant(
			'pages.accounts.accountDetail.accountNumber'
		)}: ${this.formatAccountNumber(account.number)} \n
		${this.translateService.instant('pages.accounts.accountDetail.accountType')}: ${
			account.type
		}`;
		this.utilService.copyToClipboard(accountFromCopy);
	}

	openEditAlias() {
		this.sidenavService.open({
			title: this.translateService.instant('pages.accounts.editAlias.title'),
			component: EditAliasComponent,
			data: this.account
		});
	}

	formatAccountNumber(accountNumber: string): string {
		return this.utilService.formatAccountNumber(accountNumber);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.ACCOUNTS.EDIT_ALIAS);
	}
}
