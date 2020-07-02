import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-page-layout',
	templateUrl: './page-layout.component.html',
	styleUrls: ['./page-layout.component.scss']
})
export class PageLayout {
	@Input() title: string = '';
	@Input() back: string | null = null;
	@Input() isLoading: boolean = false;
	@Output() handleBack = new EventEmitter();

	onBackClick() {
		this.handleBack.emit();
	}
}
