
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-primary-page-layout',
	templateUrl: './primary-page.layout.html',
	styleUrls: ['./primary-page.layout.scss']
})
export class PrimaryPageLayout {
	@Input() title: string = '';
	@Input() back: string | null = null;
	@Input() isLoading: boolean = false;
	@Output() handleBack = new EventEmitter();

	onBackClick() {
		this.handleBack.emit();
	}
}
