import { Component, Input } from '@angular/core';
import { ICheckDiscounted, makeCheckDiscounted } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-check-discounted',
	templateUrl: './check-discounted.component.html',
	styleUrls: ['./check-discounted.component.scss'],
})
export class CheckDiscountedComponent {
	@Input() data: ICheckDiscounted = makeCheckDiscounted({});
	constructor(
		private sidenavService: SidenavService,
		private utilsService: UtilsService
	) {}

	end() {
		this.sidenavService.close();
	}

	formatDate(date: Date) {
		const formattedDate = new Date(date);
		return this.utilsService.formatDate(formattedDate);
	}
}
