import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercaseMask]'
})
export class UppercaseMaskDirective {
  constructor(public ngControl: NgControl, public elementRef: ElementRef) {
    this.elementRef.nativeElement.style.textTransform = 'uppercase';
  }

  @HostBinding('attr.formControlName') get controlRef() {
    return this.ngControl.control;
  }

  @HostListener('change', ['$event']) onChange(e: Event) {
    if (!e || !e.target || !this.controlRef) return;
    const newString = this.controlRef.value.toUpperCase();
    this.controlRef.patchValue(newString);
  }
}
