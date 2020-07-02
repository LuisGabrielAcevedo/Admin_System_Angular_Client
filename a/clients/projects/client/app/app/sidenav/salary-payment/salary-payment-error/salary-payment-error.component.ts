import { Component, Input } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { ISidenavData, makeContact } from 'client/app/app/models';

@Component({
	selector: 'mcy-salary-payment-error',
	templateUrl: './salary-payment-error.component.html',
	styleUrls: ['./salary-payment-error.component.scss']
})
export class SalaryPaymentErrorComponent {
	@Input() public data: ISidenavData =  makeContact({});
	constructor(
		private sidenavService: SidenavService
	) {}

	close() {
		this.sidenavService.close();
	}
}
