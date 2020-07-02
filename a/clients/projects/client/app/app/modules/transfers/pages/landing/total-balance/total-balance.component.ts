import { Component, Input } from '@angular/core';
import { IAccountBalanceByCurrency } from 'client/app/app/models';

@Component({
	selector: 'mcy-total-balance',
	templateUrl: './total-balance.component.html',
	styleUrls: ['./total-balance.component.scss']
})
export class TotalBalanceComponent {
	@Input() totalBalanceByCurrency: IAccountBalanceByCurrency[] = [];
}
