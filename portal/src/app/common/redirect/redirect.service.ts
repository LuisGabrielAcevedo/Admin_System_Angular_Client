import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RedirectComponent } from './redirect/redirect.component';

@Injectable({ providedIn: 'root' })
export class RedirectService {
  constructor(private ngbModal: NgbModal) {}

  showExitMessage(url: string, message: string = '', countdown: number = 10) {
    if (window.document.activeElement)
      (window.document.activeElement as HTMLElement).blur();

    const screen = this.ngbModal.open(RedirectComponent, {
      backdrop: 'static'
    });

    const instance: RedirectComponent = screen.componentInstance as RedirectComponent;

    instance.message = message;
    instance.url = url;
    instance.countdown = countdown;
    instance.redirectFunc = this.go.bind(this);
  }

  go(url: string): void {
    window.location.href = url;
  }
}
