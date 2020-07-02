import { Component, Input } from '@angular/core';
import { makeAccount, IAccount } from 'client/app/app/models';

@Component({
selector: 'mcy-account',
templateUrl: './account.component.html',
styleUrls: ['./account.component.scss']
})
export class AccountComponent {
	@Input() data: IAccount = makeAccount({});
}
