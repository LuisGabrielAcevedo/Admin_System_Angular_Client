import { Directive, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';

const invalidDocumentNumberCharsRegex: RegExp = /[^0-9]+/g;

@Directive({
  selector: '[appOnlyNumbersMask]'
})
export class OnlyNumbersMaskDirective {
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidDocumentNumberCharsRegex);
  }
}
