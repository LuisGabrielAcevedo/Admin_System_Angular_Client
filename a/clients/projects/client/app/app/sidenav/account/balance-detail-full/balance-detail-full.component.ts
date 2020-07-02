import { Component } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';

@Component({
	selector: 'mcy-balance-detail-full',
	templateUrl: './balance-detail-full.component.html',
	styleUrls: ['./balance-detail-full.component.scss']
})
export class BalanceDetailFullComponent {
	constructor(private sidenavService: SidenavService) {}

	end() {
		this.sidenavService.close();
	}
}
