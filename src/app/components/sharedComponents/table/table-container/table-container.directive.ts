import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTableHost]',
})
export class TableDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
