import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IFlowExitModal } from 'client/app/signup/models/modal';

@Component({
	selector: 'mcy-flow-exit-modal',
	templateUrl: './flow-exit-modal.component.html',
	styleUrls: ['./flow-exit-modal.component.scss']
})
export class FlowExitModalComponent {
	constructor(
		public dialogRef: MatDialogRef<FlowExitModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IFlowExitModal
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
