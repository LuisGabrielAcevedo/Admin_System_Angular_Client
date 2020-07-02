import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'mcy-new-contact-box',
	templateUrl: './new-contact-box.component.html',
	styleUrls: ['./new-contact-box.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NewContactBoxComponent {
	@Input() name: string = '';
	@Output() handleClick = new EventEmitter();

	onClick() {
		this.handleClick.emit();
	}
}
