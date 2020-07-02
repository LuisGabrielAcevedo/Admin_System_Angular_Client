import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from 'client/app/app/services/auth.service';
import { ITokenExpirationModal } from 'client/app/app/models/modal';

@Component({
	selector: 'mcy-expiration-token-modal',
	templateUrl: './expiration-token-modal.component.html',
	styleUrls: ['./expiration-token-modal.component.scss']
})
export class ExpirationTokenModalComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<ExpirationTokenModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ITokenExpirationModal,
		private authService: AuthService,
	) { }

	ngOnInit() {
		this.authService.logout();
	}

	onCloseClick() {
		this.dialogRef.close();
	}
}
