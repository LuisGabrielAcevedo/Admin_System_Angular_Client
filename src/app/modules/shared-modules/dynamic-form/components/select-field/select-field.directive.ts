import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[dynamic-form-select-component-directive]"
})
export class IDynamicFormSelectComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
