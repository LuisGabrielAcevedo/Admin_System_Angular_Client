import { Directive, Input, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';

@Directive({
  selector: '[appRemoveChars]'
})
export class RemoveCharsDirective {
  @Input() invalidCharsRegex: RegExp = /[^A-ZÑ ]+/gi;

  constructor() {}

  @HostListener('keypress', ['$event']) _(e: KeyboardEvent) {
    genericKeyFilter(e, this.invalidCharsRegex);
  }
}
