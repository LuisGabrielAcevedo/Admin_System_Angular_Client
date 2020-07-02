import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-badge-icon',
	templateUrl: './badge-icon.component.html',
	styleUrls: ['./badge-icon.component.scss']
})
export class BadgeIconComponent {
	@Input() badgeSize: string = 'default';
	@Input() iconSize: string = '32px';
	@Input() selectable: boolean = false;
	@Input() selected: boolean = false;


	@Input() type:
		'caution' |
		'common' |
		'warning' |
		'success' |
		'information' |
		'notification' |
		'service' |
		'logo' = 'common';
}
