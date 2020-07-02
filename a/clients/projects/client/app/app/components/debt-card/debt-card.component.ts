import { Component, Input, Output, EventEmitter } from '@angular/core';
import { makeServiceDebt, IServiceDebt } from 'client/app/app/models';

@Component({
	selector: 'mcy-debt-card',
	templateUrl: './debt-card.component.html',
	styleUrls: ['./debt-card.component.scss']
})
export class DebtCardComponent {
	@Input() debt: IServiceDebt = makeServiceDebt({});
	@Input() hasWritePermission: boolean = false;
	@Output() public handlePayClick : EventEmitter<IServiceDebt> = new EventEmitter()

	constructor() { }

	pay() {
		this.handlePayClick.emit(this.debt);
	}
}
