import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss']
})
export class IconComponent {
	@Input() id: string = '';
}
