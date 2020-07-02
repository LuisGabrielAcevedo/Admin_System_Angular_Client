import { Component, Input, OnChanges } from '@angular/core';
import { FeedbackStatus } from 'client/app/app/models/sidenav';

@Component({
	selector: 'mcy-sidenav-feedback',
	templateUrl: './sidenav-feedback.component.html',
	styleUrls: ['./sidenav-feedback.component.scss']
})
export class SidenavFeedbackComponent implements OnChanges {
	@Input() public message: string = '';
	@Input() public status: string = FeedbackStatus.info;
	public icon: string = '';

	ngOnChanges() {
		this.icon = this.status === FeedbackStatus.error ? 'fechar' : 'check';
	}
}
