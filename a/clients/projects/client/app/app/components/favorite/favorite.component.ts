import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'mcy-favorite',
	templateUrl: './favorite.component.html',
	styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
	@Input() active: boolean = false;
	@Input() id: string = '';
	@Output() handleClick = new EventEmitter();
	@Input() readOnly: boolean = false;

	onClick(state: boolean) {
		if (!this.readOnly) {
			this.handleClick.emit(state);
		}
	}
}
