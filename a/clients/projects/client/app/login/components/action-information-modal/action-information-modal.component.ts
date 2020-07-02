import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'mcy-action-information-modal',
	templateUrl: './action-information-modal.component.html',
	styleUrls: ['./action-information-modal.component.scss']
})
export class ActionInformationModalComponent {

	@Input() public icon: string = '';
	@Input() public title: string = '';
	@Input() public message: string = '';
	@Input() public mainActionLabel: string = '';
	@Input() public goBackLabel: string = '';
	@Output() public mainAction = new EventEmitter();
	@Output() public goBackAction = new EventEmitter();

	onActionButton() {
		this.mainAction.emit();
	}

	onGoBackButton() {
		this.goBackAction.emit();
	}
}
