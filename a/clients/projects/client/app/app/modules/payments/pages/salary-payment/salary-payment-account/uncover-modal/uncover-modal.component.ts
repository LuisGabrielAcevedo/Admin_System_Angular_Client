import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISalaryPaymentCancelModal } from 'client/app/app/models/modal';

@Component({
	selector: 'mcy-uncover-modal',
	templateUrl: './uncover-modal.component.html',
	styleUrls: ['./uncover-modal.component.scss']
})
export class UncoverComponent {
	constructor(
		public dialogRef: MatDialogRef<ISalaryPaymentCancelModal>,
		@Inject(MAT_DIALOG_DATA) public data: ISalaryPaymentCancelModal
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
