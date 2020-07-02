import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
	selector: 'mcy-link',
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss']
})

export class LinkComponent {
	@Output() handleClick = new EventEmitter();
	@Input() id: string = '';
	@Input() size: 'medium' | 'big' = 'medium';

	onClick() {
		this.handleClick.emit();
	}
}
