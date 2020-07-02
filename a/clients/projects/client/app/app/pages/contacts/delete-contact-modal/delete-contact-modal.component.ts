import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDeleteContactModal } from 'client/app/app/models';

@Component({
	selector: 'mcy-delete-contact-modal',
	templateUrl: './delete-contact-modal.component.html',
	styleUrls: ['./delete-contact-modal.component.scss']
})
export class DeleteContactModalComponent {

	constructor(
		public dialogRef: MatDialogRef<DeleteContactModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IDeleteContactModal
	) {}

	onCancel() {
		this.data.onCancel(); 
		this.dialogRef.close();
	}

	onConfirm() {
		this.data.onConfirm();
		this.dialogRef.close();
	}
}
