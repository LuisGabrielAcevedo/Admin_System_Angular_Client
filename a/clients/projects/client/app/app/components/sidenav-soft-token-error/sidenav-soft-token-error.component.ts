import { Component, Input } from '@angular/core';
import { makeSidenavData, ISidenavData } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';

@Component({
	selector: 'mcy-sidenav-soft-token-error',
	templateUrl: './sidenav-soft-token-error.component.html',
	styleUrls: ['./sidenav-soft-token-error.component.scss']
})
export class SidenavSoftTokenErrorComponent {
	@Input() data: ISidenavData = makeSidenavData({
		message: ''
	});

	constructor(private sidenavService: SidenavService) {}

	onBackClick() {
		this.sidenavService.close();
	}
}
