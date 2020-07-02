import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'mcy-no-data-message',
	templateUrl: './no-data-message.component.html',
	styleUrls: ['./no-data-message.component.scss']
})
export class NoDataMessageComponent implements OnInit {
	@Input() public message = '';
	constructor() {}
	ngOnInit() {}
}
