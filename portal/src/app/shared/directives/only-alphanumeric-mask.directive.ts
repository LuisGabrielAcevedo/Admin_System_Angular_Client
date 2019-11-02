import { Directive, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidAlphanumericCharsRegex: RegExp = /[^0-9A-ZÑ]+/gi;

@Directive({
  selector: '[appOnlyAlphanumericMask]'
})
export class OnlyAlphanumericMaskDirective extends UppercaseMaskDirective {
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidAlphanumericCharsRegex);
  }
}
