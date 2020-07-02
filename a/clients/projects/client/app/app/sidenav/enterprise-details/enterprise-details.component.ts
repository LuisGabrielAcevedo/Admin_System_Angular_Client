import { Component, Input } from '@angular/core';
import { ISidenavData, makeEnterprise } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';


@Component({
	selector: 'mcy-enterprise-details-sidenav',
	templateUrl: './enterprise-details.component.html',
	styleUrls: ['./enterprise-details.component.scss']
})

export class EnterpriseDetailsComponent {
	@Input() public data: ISidenavData = {
		enterprise: makeEnterprise({ })
	};

	constructor(
		private sidenavService: SidenavService
	) { }

	back() {
		this.sidenavService.close();
	}
}
