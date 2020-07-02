import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISalaryPaymentCancelModal } from 'client/app/app/models/modal';

@Component({
	selector: 'mcy-salary-payment-cancel',
	templateUrl: './salary-payment-cancel.component.html',
	styleUrls: ['./salary-payment-cancel.component.scss']
})
export class SalaryPaymentCancelComponent {
	constructor(
		public dialogRef: MatDialogRef<SalaryPaymentCancelComponent>,
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

	onClose() {
		this.dialogRef.close();
	}
}
