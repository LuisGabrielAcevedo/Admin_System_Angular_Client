import { Directive, HostListener, Input } from '@angular/core';
import { genericKeyFilter } from './generic-key-filter.function';
import { showHideInput } from './show-hide-input.function';
import { UppercaseMaskDirective } from './uppercase-mask.directive';

const invalidEngineCharsRegex: RegExp = /[^0-9A-Z]+/gi;

@Directive({
  selector: '[appEngineMask]'
})
export class EngineMaskDirective extends UppercaseMaskDirective {
  @Input() hideInput = true;

  @HostListener('keypress', ['$event']) onKeyPress(e: KeyboardEvent) {
    genericKeyFilter(e, invalidEngineCharsRegex);
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
