import { Component, Input } from '@angular/core';
import { IAccountBalanceByCurrency } from 'client/app/app/models';

@Component({
	selector: 'mcy-account-total-balance',
	templateUrl: './account-total-balance.component.html',
	styleUrls: ['./account-total-balance.component.scss']
})
export class AccountTotalBalanceComponent {
	@Input() totalBalanceByCurrency: IAccountBalanceByCurrency[] = [];
}
