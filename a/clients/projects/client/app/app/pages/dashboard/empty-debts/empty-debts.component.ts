import { Component, Input } from '@angular/core';

@Component({
	selector: 'mcy-empty-debts',
	templateUrl: './empty-debts.component.html',
	styleUrls: ['./empty-debts.component.scss']
})
export class EmptyDebtsComponent {
	@Input() public message = '';
}
