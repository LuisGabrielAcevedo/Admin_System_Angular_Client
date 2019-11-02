import { Directive, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidEmailCharsRegex: RegExp = /[^A-ZÑ0-9@.!#$%&’*+/=?^_`{|}~-]+/gi;

@Directive({
  selector: '[appEmailMask]'
})
export class EmailMaskDirective extends UppercaseMaskDirective {
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidEmailCharsRegex);
  }
}
