import { Component, Input, Output, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ICarouselConfiguration,
	makeDefaultCarouselConfiguration,
	ICarouselItem
	} from 'client/app/app/models/carousel';
import { NguCarousel } from '@ngu/carousel';
import { IRequestCarouselAction } from 'client/app/app/models';
import isEqual from 'lodash/isEqual';

@Component({
	selector: 'mcy-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnChanges {
	@Input() public list: ICarouselItem[] = [];
	@Input() public component!: any;
	@Input() public configuration: ICarouselConfiguration = makeDefaultCarouselConfiguration();
	@Input() private initialSelection: any;
	@Output() public onselect = new EventEmitter();
	@Input() public selection = true;
	@ViewChild('mcyCarousel', {static: true}) public carousel!: NguCarousel<any>;
	@Output() actionEvent: EventEmitter<IRequestCarouselAction> = new EventEmitter();
	@Output() pointChange = new EventEmitter();
	public points: number[] = [];
	public activePoint: number = 0;
	public selected: any;
	public renderList: ICarouselItem[] = [];

	ngOnChanges(changes: SimpleChanges) {
		if (changes.list && changes.list.currentValue) {
			// This is the way to eliminate abrupt changes in angular components when we have the error
			// ExpressionChangedAfterItHasBeenCheckedError,
			// Expression has changed after it was checked. Previous value: 'ngIf: false'. Current value: 'ngIf: true'.
			setTimeout(() => {
				this.renderList = changes.list.currentValue;
				this.selected = this.initialSelection;
			}, 0);
		}
	}

	isShowPoints(): boolean {
		return this.carousel.pointNumbers.length > 1;
	}

	isFirst(): boolean {
		return !this.carousel.activePoint;
	}

	isActivePoint(point: number): boolean {
		return point === this.carousel.activePoint
	}

	isLast(): boolean {
		return this.carousel.activePoint === this.carousel.pointNumbers.length - 1
	}

	carouselevent(item: any) {
		if (this.selection) {
			this.selected = item;
		}
		this.onselect.emit(item);
	}

	sendEvent(item: IRequestCarouselAction) {
		this.actionEvent.emit(item);
	}

	isItemSelected(item: any) {
		return isEqual(item, this.selected)
	}

	onMoveToPoint(point: number) {
		this.pointChange.emit(point);
		this.carousel.moveTo(point);
	}

	onMoveNextPoint() {
		if (this.carousel.activePoint === this.carousel.pointNumbers.length - 1) {
			this.pointChange.emit(this.carousel.activePoint);
		}else {
			this.pointChange.emit(this.carousel.activePoint + 1);
		}
	}

	onMoveToPrevPoint() {
		if (this.carousel.activePoint === 0) {
			this.pointChange.emit(this.carousel.activePoint);
		}else {
			this.pointChange.emit(this.carousel.activePoint - 1);
		}
	}
}
