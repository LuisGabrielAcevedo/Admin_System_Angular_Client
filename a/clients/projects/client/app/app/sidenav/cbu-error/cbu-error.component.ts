import { Component } from '@angular/core';
import { SidenavService } from 'client/app/app/services/sidenav.service';
import { FeedbackStatus } from 'client/app/app/models/sidenav';

@Component({
	selector: 'mcy-cbu-error',
	templateUrl: './cbu-error.component.html',
	styleUrls: ['./cbu-error.component.scss']
})
export class CbuErrorComponent {
	public message = '';
	public status = FeedbackStatus.error;
	
	constructor(
		private sidenavService: SidenavService
	) {}

	close() {
		this.sidenavService.close();
	}
}
