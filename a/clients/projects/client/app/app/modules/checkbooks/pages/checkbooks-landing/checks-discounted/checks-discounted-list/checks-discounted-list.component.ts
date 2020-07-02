import { Component, Input } from '@angular/core';
import { makeCheckDiscounted } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';
import { ICheckDiscounted } from 'client/app/app/models';
import { CheckDiscountedComponent } from 'client/app/app/sidenav/request-checkbooks/check-discounted/check-discounted.component';
@Component({
	selector: 'mcy-checks-discounted-list',
	templateUrl: './checks-discounted-list.component.html',
	styleUrls: ['./checks-discounted-list.component.scss']
})
export class ChecksDiscountedListComponent {
	@Input() public checksDiscounted: ICheckDiscounted[] = [makeCheckDiscounted({})];
	@Input() public emptyMessage = '';

	public displayedColumns: string[] = [
		'icon',
		'number',
		'amount',
		'acreditationDate',
		'detail'
	];
	constructor(
		private utilsService: UtilsService,
		private sidenavService: SidenavService,
		private translateService: TranslateService
	) { }

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux, true);
	}

	showDetails(check: ICheckDiscounted): void {
		this.sidenavService.open({
			title: this.translateService.instant('pages.checkbooks.checkDiscountedDetail.title'),
			component: CheckDiscountedComponent,
			data: check
		});
	}
}
