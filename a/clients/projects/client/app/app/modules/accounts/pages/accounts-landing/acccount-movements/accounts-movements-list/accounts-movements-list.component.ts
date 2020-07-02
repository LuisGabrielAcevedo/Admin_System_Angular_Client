import { Component, Input } from '@angular/core';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { IAccountMovement } from 'client/app/app/modules/accounts/models';
import { IAccount, makeAccount } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { AccountMovementDetailComponent } from 'client/app/app/sidenav/account-movement-detail/account-movement-detail.component';
import { TRANSFER_CODES } from 'client/app/app/constants/movements-codes';
import { RequestDetailComponent } from 'client/app/app/sidenav/request-detail/request-detail.component';

@Component({
	selector: 'mcy-accounts-movements-list',
	templateUrl: './accounts-movements-list.component.html',
	styleUrls: ['./accounts-movements-list.component.scss']
})
export class AccountsMovementsListComponent {
	@Input() public accountMovements: IAccountMovement[] = [];
	@Input() account: IAccount = makeAccount({});
	@Input() public loading = false;
	public displayedColumns: string[] = [
		'accountingDate',
		'descripton',
		'amount',
		'balance',
		'details'
	];

	constructor(
		private utilsService: UtilsService,
		private sidenavService: SidenavService
	) {}

	formatDate(date: Date): string {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	showDetailIcon(movement: IAccountMovement) {
		const isTransfer = this.hasNoDetail(movement) &&
			TRANSFER_CODES.includes(movement.eventCode);
		return this.hasDetail(movement) || isTransfer;
	}

	onShowMovementDetail(movement: IAccountMovement) {
		if (this.hasDetail(movement) && movement.id !== '') {
			this.sidenavService.open({
				title: '',
				component: AccountMovementDetailComponent,
				data: {
					movement,
					account: this.account
				}
			});
		} else {
			const isTransfer = this.hasNoDetail(movement) &&
			TRANSFER_CODES.includes(movement.eventCode);
			if (isTransfer && movement.requestId !== '')  {
				this.sidenavService.open({
					title: '',
					component: RequestDetailComponent,
					data: {
						id: movement.requestId
					}
				});
			}
		}
	}

	hasDetail(movement: IAccountMovement) {
		return movement.moreDetail === 'S';
	}

	hasNoDetail(movement: IAccountMovement) {
		return movement.moreDetail === 'N';
	}
}
