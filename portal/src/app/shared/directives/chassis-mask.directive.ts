import { Directive, HostListener, Input } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { showHideInput } from './show-hide-input.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidChassisCharsRegex: RegExp = /[^A-HJ-NPR-Z0-9]+/gi;

@Directive({
  selector: '[appChassisMask]'
})
export class ChassisMaskDirective extends UppercaseMaskDirective {
  @Input() hideInput = true;

  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidChassisCharsRegex);
  }

  @HostListener('blur', ['$event'])
  @HostListener('focus', ['$event'])
  onFocusOrBlur(e: KeyboardEvent) {
    if (this.hideInput) showHideInput(e);
  }

  @HostListener('copy', ['$event'])
  @HostListener('paste', ['$event'])
  onCopyOrPaste(e: KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
}
