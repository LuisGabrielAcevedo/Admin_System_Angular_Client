import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() text: string = '';
	@Input() color: 'primary' | 'secondary' | 'tertiary' | 'primary2' = 'primary';
	@Input() disabled: boolean = false;
	@Input() id: string = '';
	@Input() size: 'medium' | 'big' = 'medium'
	@Input() submit: boolean = false;
	@Output() handleClick: EventEmitter<any>;

	constructor() {
		this.handleClick = new EventEmitter();
	}

	handleOnClick(clickEvent: any) {
		if (!this.disabled) {
			this.handleClick.emit(clickEvent);
		}
	}
}
