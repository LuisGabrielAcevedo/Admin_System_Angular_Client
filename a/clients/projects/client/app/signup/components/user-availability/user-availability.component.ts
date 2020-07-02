import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-user-availability',
	templateUrl: './user-availability.component.html',
	styleUrls: ['./user-availability.component.scss']
})
export class UserAvailabilityComponent {
	@Input() isAvailable: boolean = false;
}
