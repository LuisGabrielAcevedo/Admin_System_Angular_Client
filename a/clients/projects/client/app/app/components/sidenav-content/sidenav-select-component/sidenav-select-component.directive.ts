import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[mcySidenavSelectComponent]'
})
export class SidenavSelectComponentDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
