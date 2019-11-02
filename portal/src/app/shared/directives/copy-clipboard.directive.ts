import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({ selector: '[copy-clipboard]' })
export class CopyClipboardDirective {
  @Input('copy-clipboard')
  public payload: string;

  @Output('isCopied')
  public isCopied: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.payload) return;

    let listener = (e: ClipboardEvent) => {
      let clipboard: DataTransfer = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.payload);
      e.preventDefault();
      this.isCopied.emit(true);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
  }
}
