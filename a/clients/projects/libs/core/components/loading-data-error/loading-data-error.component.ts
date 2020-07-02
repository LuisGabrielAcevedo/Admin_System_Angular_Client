import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-loading-data-error',
	templateUrl: './loading-data-error.component.html',
	styleUrls: ['./loading-data-error.component.scss']
})
export class LoadingDataErrorComponent {
	@Input() errorDescription: string = '';
	@Input() displayRetry: boolean = false;
	@Output() handleOnRetry = new EventEmitter();

	onRetry() {
		this.handleOnRetry.emit();
	}
}
