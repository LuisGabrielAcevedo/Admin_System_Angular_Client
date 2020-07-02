import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICancelRequestModal } from 'client/app/app/models';
import { UtilsService } from '@mcy/core/utils/utils.service';

@Component({
	selector: 'mcy-cancel-scheduled-request',
	templateUrl: './cancel-scheduled-request.component.html',
	styleUrls: ['./cancel-scheduled-request.component.scss'],
})
export class CancelScheduledRequestComponent {
	constructor(
		public dialogRef: MatDialogRef<ICancelRequestModal>,
		@Inject(MAT_DIALOG_DATA) public data: ICancelRequestModal,
		private utilsService: UtilsService,
	) {}

	onCancel() {
		this.data.onCancel();
		this.dialogRef.close();
	}

	formatDate(date: Date) {
		const dateAux = new Date(date);
		return this.utilsService.formatDate(dateAux);
	}

	onConfirm() {
		this.data.onConfirm();
		this.dialogRef.close();
	}

	onClose() {
		this.dialogRef.close();
	}
}
