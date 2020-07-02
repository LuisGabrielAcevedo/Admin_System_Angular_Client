import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'mcy-need-help-modal',
	templateUrl: './need-help-modal.component.html',
	styleUrls: ['./need-help-modal.component.scss']
})
export class NeedHelpModalComponent {

	constructor(
		public dialogRef: MatDialogRef<NeedHelpModalComponent>,
	) { }

	onBack() {
		this.dialogRef.close();
	}

}
