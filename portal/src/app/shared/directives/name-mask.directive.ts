import { Directive, HostListener } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidNameCharsRegex: RegExp = /[^a-zA-ZñÑ\s]+/g;
@Directive({
  selector: '[appNameMask]'
})
export class NameMaskDirective extends UppercaseMaskDirective {
  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidNameCharsRegex);
  }
}
