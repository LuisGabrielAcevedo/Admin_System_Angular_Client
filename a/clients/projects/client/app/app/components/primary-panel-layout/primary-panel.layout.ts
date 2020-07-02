import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-primary-panel-layout',
	templateUrl: './primary-panel.layout.html',
	styleUrls: ['./primary-panel.layout.scss']
})
export class PrimaryPanelLayout {
	@Input() isLoading: boolean = false;
	@Input() hasError: boolean = false;
	@Input() error: string = '';
	@Input() errorMessage: string = '';
	@Output() handleOnRetry = new EventEmitter();

	onRetry() {
		this.handleOnRetry.emit();
	}
}
