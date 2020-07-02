import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IErrorConfiguration } from 'client/app/app/services/sidenav.service';

@Component({
	selector: 'mcy-sidenav-error',
	templateUrl: './sidenav-error.component.html',
	styleUrls: ['./sidenav-error.component.scss']
})
export class SidenavErrorComponent {
	@Input() isLoading = false;
	@Input() errorConfiguration: IErrorConfiguration = {};
	@Output() handleConfirm = new EventEmitter();

	onConfirm() {
		this.handleConfirm.emit();
	}

}
