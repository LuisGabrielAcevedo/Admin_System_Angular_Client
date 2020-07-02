import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'mcy-range',
	templateUrl: './range.component.html'
})
export class RangeComponent implements OnInit, OnDestroy {
	@Input() min: number = 0;
	@Input() max: number = 0;
	@Output() changeValue: EventEmitter<number> = new EventEmitter();
	messages: { [key: string]: any } = {};
	range: FormControl = new FormControl();
	public subscription = new Subscription();

	ngOnInit() {
		this.messages = {
			min: `El valor tiene que ser mayor o igual a ${this.min}`,
			max: `El valor tiene que ser menor o igual a ${this.max}`
		};

		this.range = new FormControl(this.min, [Validators.max(this.max), Validators.min(this.min)]);
		this.range.markAsTouched();

		this.subscription.add(
			this.range.valueChanges.pipe(filter(v => v)).subscribe(value => {
				let endValue: number = value;
				if (value % 1 !== 0) {
					endValue = parseInt(value, 10);
					this.range.patchValue(endValue);
				}
				if (this.range.valid) {
					this.changeValue.emit(endValue);
				}
			})
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	setError() {
		if (this.range.errors) {
			return this.messages[Object.keys(this.range.errors)[0]];
		}
	}
}
