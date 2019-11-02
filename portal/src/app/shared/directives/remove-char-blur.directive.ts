import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRemoveCharBlur]'
})
export class RemoveCharBlurDirective {
  @Input() invalidCharsRegex: RegExp = null;

  constructor() {}

  @HostListener('keydown', ['$event']) removeChars(e: KeyboardEvent) {
    if (!e || !this.invalidCharsRegex) return;
    if (e.code === 'Backspace' || e.code === 'Delete') return;
    if (e.ctrlKey) return;
    const newString = e.key.replace(this.invalidCharsRegex, '');

    if (newString === '') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
