import { Component, Input } from '@angular/core';
import { ISidenavData, makeCheckReceived } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';

@Component({
	templateUrl: './checks-rejected.component.html',
	styleUrls: ['./checks-rejected.component.scss']
})
export class ChecksRejectedComponent {
	@Input() public data: ISidenavData = {
		check: makeCheckReceived({}),
	};

	constructor(
		private utilsService: UtilsService,
		private sidenavService: SidenavService,
	) {}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux, true);
	}

	close() {
		this.sidenavService.close();
	}
}
