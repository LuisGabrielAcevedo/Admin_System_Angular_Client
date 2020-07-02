import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISidenavData, makeSidenavData, makeAccount } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { makeAccountMovementDetail } from 'client/app/app/modules/accounts/models';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-debit-movement-detail',
	templateUrl: './debit-movement-detail.component.html',
	styleUrls: ['./debit-movement-detail.component.scss']
})
export class DebitMovementDetailComponent {
	@Input() data: ISidenavData = makeSidenavData({
		account: makeAccount({}),
		movement: makeAccountMovementDetail({})
	});
	constructor(
		private translateService: TranslateService,
		private sidenavService: SidenavService,
		private utilsService: UtilsService
	) {}

	getAccountTypeTranslate() {
		return this.translateService.instant(`pages.accounts.type.${this.data.account.type}`);
	}

	close() {
		this.sidenavService.close();
	}

	formatDate(date: Date) {
		const formattedDate = new Date(date);
		return this.utilsService.formatDate(formattedDate, true);
	}
}
