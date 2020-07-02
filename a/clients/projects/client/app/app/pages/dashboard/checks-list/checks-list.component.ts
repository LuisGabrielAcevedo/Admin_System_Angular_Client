import { Component, Input } from '@angular/core';
import { ICheck } from 'client/app/app/models';
import { CURRENCIES, ITEMS_PER_SMALL_PAGE } from 'client/app/app/constants';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { Router } from '@angular/router';
import { ChecksService } from 'client/app/app/services/checks.service';

@Component({
	selector: 'mcy-checks-list',
	templateUrl: './checks-list.component.html',
	styleUrls: ['./checks-list.component.scss']
})
export class ChecksListComponent {
	@Input() title: string = '';
	@Input() dateType: string = '';
	@Input() checks: ICheck[] = [];
	@Input() emptyMessage: string = '';
	@Input() checksType: 'issued' | 'received' | 'discounted' = 'issued'

	constructor(
		private utilsService: UtilsService,
		private router: Router,
		private checksService: ChecksService,
	) { }

	get totalChecksAmount() {
		return this.checks.reduce((partialAmount, value) => ( partialAmount + value.amount ), 0);
	}

	get amountSymbol() {
		return CURRENCIES[0].symbol
	}

	get checksList() {
		return this.checks.slice(0, ITEMS_PER_SMALL_PAGE);
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	showMore() {
		let tabSelected = 0;
		switch (this.checksType) {
			case 'issued':
				tabSelected = 0;
				break;
			case 'received':
				tabSelected = 1;
				break;
			case 'discounted':
				tabSelected = 2;
				break;
		}
		this.checksService.updateCheckState({tabSelected});
		this.router.navigate(['/app/checkbooks']);
	}
}
