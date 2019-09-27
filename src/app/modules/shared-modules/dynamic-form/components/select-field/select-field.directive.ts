import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-select-field-directive]'
})
export class FormFieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
