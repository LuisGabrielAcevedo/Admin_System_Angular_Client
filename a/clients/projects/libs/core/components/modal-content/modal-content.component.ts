import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-modal-content',
	templateUrl: './modal-content.component.html',
	styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {
	@Input() title: string = '';
	@Input() cancel: string = '';
	@Input() confirmation: string = '';
	@Output() handleCancel = new EventEmitter();
	@Output() handleConfirmation = new EventEmitter();
	@Output() handleClose = new EventEmitter();

	constructor() { }

	onCancel() {
		this.handleCancel.emit();
	}

	onConfirm() {
		this.handleConfirmation.emit();
	}

	onClose() {
		this.handleClose.emit();
	}
}
