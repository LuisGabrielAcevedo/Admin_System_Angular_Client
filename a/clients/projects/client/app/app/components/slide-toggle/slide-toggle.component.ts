import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-slide-toggle',
	templateUrl: './slide-toggle.component.html',
	styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent {
	@Input() checked: boolean = false;
	@Input() disabled: boolean = false;
	@Input() title: string = '';
	@Input() id: string = '';
	@Output() handleChange = new EventEmitter();

	onClick() {
		this.handleChange.emit(!this.checked);
	}
}
