import { Component, Input } from '@angular/core';
import { IAccountMovement } from 'client/app/app/modules/accounts/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { Router } from '@angular/router';

@Component({
	selector: 'mcy-account-movements',
	templateUrl: './account-movements.component.html',
	styleUrls: ['./account-movements.component.scss']
})
export class AccountMovementsComponent {
	@Input() movements: IAccountMovement[] = [];
	public displayedColumns: string[] = [
		'date',
		'description',
		'amount'
	];

	constructor(
		private utilsService: UtilsService,
		private router: Router,
	) { }

	showMoreMovements() {
		this.router.navigate(['/app/accounts']);
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}
}
