import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mcy-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
	@Input() closed: boolean = false;
	@Output() menuButtonClick = new EventEmitter();
	closeMenu() {
		this.menuButtonClick.emit();
	}
}
