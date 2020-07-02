
import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-welcome-panel',
	templateUrl: './welcome-panel.component.html',
	styleUrls: ['./welcome-panel.component.scss']
})
export class WelcomePanelComponent {
	@Input() public title: string = '';
	@Input() public subtitle: string = '';
}
