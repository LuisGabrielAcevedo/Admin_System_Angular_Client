import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'mcy-range-line',
	templateUrl: './range-line.component.html',
	styleUrls: ['./range-line.component.scss']
})
export class RangeLineComponent implements OnInit {
	@Input() value: number = 5;
	@Input() min: number = 0;
	@Input() max: number = 10;

	ngOnInit() {
	}

	formattedValue() {
		const step = 200 / (this.max - this.min);
		return `${((this.value - this.min) * step) - 10}px`;
	}
}
