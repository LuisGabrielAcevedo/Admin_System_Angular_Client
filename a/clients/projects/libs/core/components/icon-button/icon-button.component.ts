import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: ['./icon-button.component.scss']
})

export class IconButtonComponent {
	@Input() id: string = '';
	@Input() readOnly: boolean = false;
	@Output() handleClick: EventEmitter<any> = new EventEmitter();
	
	constructor() { }

	handleOnClick(event: MouseEvent) {
		this.handleClick.emit(event);
	}

}
