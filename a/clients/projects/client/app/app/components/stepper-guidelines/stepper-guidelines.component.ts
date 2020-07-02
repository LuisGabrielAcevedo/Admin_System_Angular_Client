import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'mcy-stepper-guidelines',
	templateUrl: './stepper-guidelines.component.html',
	styleUrls: ['./stepper-guidelines.component.scss']
})
export class StepperGuidelinesComponent implements OnInit {
	@Input() nextGuideline: boolean = false;
	@Input() previousGuideline: boolean = false;
	@Input() selected: boolean = false;
	@Input() icon: string = '';

	constructor() { }

	ngOnInit() {
	}

}
