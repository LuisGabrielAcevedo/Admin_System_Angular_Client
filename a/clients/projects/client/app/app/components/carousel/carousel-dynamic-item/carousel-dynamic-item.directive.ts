import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[mcyCarouselDynamicItem]'
})
export class CarouselDynamicItemDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
