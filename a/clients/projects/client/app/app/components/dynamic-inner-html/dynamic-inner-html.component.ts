import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
	selector: 'mcy-dynamic-inner-html',
	templateUrl: './dynamic-inner-html.component.html',
	styleUrls: ['./dynamic-inner-html.component.scss']
})
export class DynamicInnerHtmlComponent implements AfterViewInit {
	@Input() content: string = '';
	@Input() id: string = '';
	@Output() init = new EventEmitter();

	ngAfterViewInit(): void {		
		 setTimeout(() => this.init.emit() , 500);		 
	}
}
