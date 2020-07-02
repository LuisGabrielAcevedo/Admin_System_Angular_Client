import { Component, Input } from '@angular/core';
import { ISidenavData } from 'client/app/app/models';
import { SidenavService } from 'client/app/app/services/sidenav.service';

@Component({
	selector: 'mcy-soft-token-create-success',
	templateUrl: './soft-token-create-success.component.html',
	styleUrls: ['./soft-token-create-success.component.scss']
})
export class SoftTokenCreateSuccessComponent {
	@Input() data: ISidenavData = {
		onClose: () => {}
	};

	constructor(
		private sidenavService: SidenavService
	) { }

	finish() {
		this.sidenavService.prevStep();
		this.data.onClose();
	}

}
