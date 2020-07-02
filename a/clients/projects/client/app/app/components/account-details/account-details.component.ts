import { Component, Input } from '@angular/core';
import { IAccount, makeAccount } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-account-details',
	templateUrl: './account-details.component.html',
	styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
	@Input() account: IAccount = makeAccount({});
	@Input() businessName: string = '';

	constructor(
		private translateService: TranslateService,
		private utilService: UtilsService,
	) {}

	copyDetails() {
		const accountDetails = `
			${ this.translateService.instant('components.accountDetails.cbvu') } ${ this.account.cbvu }\n
			${ this.translateService.instant('components.accountDetails.alias') } ${ this.account.alias }\n
			${ this.translateService.instant('components.accountDetails.businessName') } ${ this.businessName }\n
			${ this.translateService.instant('components.accountDetails.cuilt') } ${ this.account.cuilt }
		`;
		this.utilService.copyToClipboard(accountDetails);
	}
}
