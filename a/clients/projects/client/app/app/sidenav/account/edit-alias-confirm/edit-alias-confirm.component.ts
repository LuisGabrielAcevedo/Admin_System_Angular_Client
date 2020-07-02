import { Component, Input } from '@angular/core';
import { makeAccount, makeAccountAlias } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-edit-alias-confirm',
	templateUrl: './edit-alias-confirm.component.html',
	styleUrls: ['./edit-alias-confirm.component.scss']
})
export class EditAliasConfirmComponent {
	@Input() data = {
		account : makeAccount({}),
		aliasResponse: makeAccountAlias({})
	};
	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService
	) {}

	close() {
		this.sidenavService.close();
	}

	getAccountTypeTranslate() {
		return this.translateService.instant(`pages.accounts.type.${this.data.account.type}`);
	}
}
