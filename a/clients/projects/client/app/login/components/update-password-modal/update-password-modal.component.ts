import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { IModal } from 'client/app/app/models/modal';

@Component({
	selector: 'mcy-update-password-modal',
	templateUrl: './update-password-modal.component.html',
	styleUrls: ['./update-password-modal.component.scss']
})
export class UpdatePasswordModalComponent implements OnInit {

	constructor( 
		private router: Router,
		public dialogRef: MatDialogRef<IModal>
		) { }

	ngOnInit() {
	}

	goToUpdatePassword() {
		this.router.navigate(['/signup/updatePasswordPage']).then(() => {
			this.dialogRef.close();
		});		
	}

}
