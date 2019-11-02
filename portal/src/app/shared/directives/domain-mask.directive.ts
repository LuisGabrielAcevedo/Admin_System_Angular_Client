import { Directive, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidDomainCharsRegex: RegExp = /[^0-9A-Z]+/gi;

@Directive({
  selector: '[appDomainMask]'
})
export class DomainMaskDirective extends UppercaseMaskDirective {
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidDomainCharsRegex);
  }

  @HostListener('paste', ['$event']) onPaste(e: KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
}
