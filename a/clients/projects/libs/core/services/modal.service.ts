import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { IModal } from 'client/app/app/models';

@Injectable()
export class ModalService {

	constructor(
		public dialog: MatDialog,
	) {}

	openDialog(data: IModal, config?: MatDialogConfig) {
		if(config) {
			this.dialog.open(data.component,  {data, ...config} );
		} else {
			this.dialog.open(data.component, { data });
		}
	}

}
