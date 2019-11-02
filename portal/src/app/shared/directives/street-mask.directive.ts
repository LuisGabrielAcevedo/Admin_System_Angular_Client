import { Directive, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidStreetCharsRegex: RegExp = /[^0-9A-ZÑ ]+/gi;
@Directive({
  selector: '[appStreetMask]'
})
export class StreetMaskDirective extends UppercaseMaskDirective {
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidStreetCharsRegex);
  }
}
