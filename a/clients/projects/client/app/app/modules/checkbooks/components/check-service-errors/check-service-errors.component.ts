import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-check-service-errors',
	templateUrl: './check-service-errors.component.html',
	styleUrls: ['./check-service-errors.component.scss'],
})
export class CheckServiceErrorsComponent {
	@Input() public errorMessages = [];
}