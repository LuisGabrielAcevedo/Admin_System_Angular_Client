import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IServiceDebt } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';
import { UserService } from 'client/app/app/services/user.service';
import { USER_PERMISSIONS } from 'client/app/app/constants';

@Component({
	selector: 'mcy-service-debts-list',
	templateUrl: './service-debts-list.component.html',
	styleUrls: ['./service-debts-list.component.scss']
})
export class ServiceDebtsListComponent {
	@Input() public serviceDebts: IServiceDebt[] = [];
	@Input() public emptyMessage = '';
	@Output() public handlePayClick : EventEmitter<IServiceDebt> = new EventEmitter()
	public displayedColumns: string[] = [
		'icon',
		'serviceName',
		'amount',
		'date',
		'payReference',
		'options',
		'pay'
	];

	constructor(
		private utilsService: UtilsService,
		private userService: UserService
		) {	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	pay(debt: IServiceDebt) {
		this.handlePayClick.emit(debt);
	}

	get hasWritePermission(): boolean {
		return this.userService.hasPermission(USER_PERMISSIONS.SERVICE_PAYMENT.WRITE);
	}
}
