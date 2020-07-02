import { Component } from '@angular/core';
import { AuthService } from 'client/app/app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { IModal } from 'client/app/app/models';

@Component({
	selector: 'mcy-multi-session-modal',
	templateUrl: './multi-session-modal.component.html',
	styleUrls: ['./multi-session-modal.component.scss']
})
export class MultiSessionModalComponent  {

	constructor( 
		public authService: AuthService,
		public dialogRef: MatDialogRef<IModal>
		) { }

	onBackAction() {
		this.dialogRef.close();
	}

	onCloseSession() {
		this.authService.logout();
		this.dialogRef.close();
	}

}
