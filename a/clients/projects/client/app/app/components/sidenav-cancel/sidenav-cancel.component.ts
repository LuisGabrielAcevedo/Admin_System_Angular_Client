import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ISidenavClose, makeSidenavClose } from 'client/app/app/models';

@Component({
	selector: 'mcy-sidenav-cancel',
	templateUrl: './sidenav-cancel.component.html',
	styleUrls: ['./sidenav-cancel.component.scss']
})
export class SidenavCancelComponent {
	@Input() public sidenavClose: ISidenavClose = makeSidenavClose({})
	@Output() public cancelEvent: EventEmitter<any> = new EventEmitter();
	@Output() public closeEvent: EventEmitter<any> = new EventEmitter();

	cancel() {
		this.cancelEvent.emit();
	}

	close() {
		this.closeEvent.emit();
	}
}
