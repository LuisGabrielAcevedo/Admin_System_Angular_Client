import { Component, Input } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { IEnablementCheckbookResponse, makeEnablementCheckbookResponse } from 'client/app/app/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'mcy-enable-checkbook-confirm',
	templateUrl: './enable-checkbook-confirm.component.html',
	styleUrls: ['./enable-checkbook-confirm.component.scss'],
})
export class EnableCheckbookConfirmComponent {
	@Input() public data: IEnablementCheckbookResponse = makeEnablementCheckbookResponse({});
	constructor(
		private sidenavService: SidenavService,
		private translateService: TranslateService
	) {}

	get status() {
		return this.data.success && this.data.data.enabled ? 'SUCCESS': 'CANCELLED';
	}

	get description() {
		return this.data.success && this.data.data.enabled
			? this.translateService.instant('pages.checkbooks.enableCheckbook.successDescription')
			: this.translateService.instant('pages.checkbooks.enableCheckbook.ErrorDescription');
	}

	get message() {
		return this.data.success && this.data.data.enabled
			? this.translateService.instant('pages.checkbooks.enableCheckbook.successMessage')
			: this.data.status[0]!.message
	}

	end() {
		this.sidenavService.close();
	}
}
