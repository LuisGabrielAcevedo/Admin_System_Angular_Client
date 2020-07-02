
import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-contextual-button',
	templateUrl: './contextual-button.component.html',
	styleUrls: ['./contextual-button.component.scss']
})
export class ContextualButtonComponent {
	@Input() prefixIconSize: string = '24px';
	@Input() sufixIconSize: string = '24px';
	@Input() prefixIcon: string | undefined;
	@Input() sufixIcon: string | undefined;
	@Input() id: string = '';
	@Input() textWeight: string = 'extrabold';
	@Input() disabled: boolean = false;
	@Output() handleClick: EventEmitter<any>;
	constructor() {
		this.handleClick = new EventEmitter();
	}

	handleOnClick(event: Event) {
		this.handleClick.emit(event);
	}
}
