import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-empty-data',
	templateUrl: './empty-data.component.html',
	styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent {
	@Input() public message = '';
}
