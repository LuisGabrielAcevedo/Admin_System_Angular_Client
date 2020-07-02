import { Component, Input } from '@angular/core';


@Component({
	selector: 'mcy-sidebar-title',
	templateUrl: './sidebar-title.component.html',
	styleUrls: ['./sidebar-title.component.scss'],
})
export class SidebarTitleComponent {
	@Input() title = '';
}
