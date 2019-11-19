import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-dynamic-component-table]'
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
