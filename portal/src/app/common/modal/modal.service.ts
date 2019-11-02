import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  /**
   * Types:
   * ERROR (default)
   * SUCCESS
   * WARNING
   * WAIT
   */
  TYPE_ERROR = 'error';
  TYPE_SUCCESS = 'success';
  TYPE_WARNING = 'warning';
  TYPE_WAIT = 'wait';

  open(
    message = '',
    title = '',
    buttons = [],
    type = this.TYPE_WARNING,
    close = () => {},
    closeOnEsc: boolean = true
  ): NgbModalRef {
    if (this.hasOpenModals()) return null;

    // Fix focus changed error
    if (window.document.activeElement)
      (window.document.activeElement as HTMLElement).blur();

    const modal = this.ngbModal.open(ModalComponent, {
      backdrop: 'static',
      keyboard: closeOnEsc
    });
    modal.componentInstance.modalType = type;
    modal.componentInstance.modalMessage = message;
    modal.componentInstance.modalTitle = title;
    modal.componentInstance.buttons = buttons;
    modal.componentInstance.closeBtnAction = close;
    return modal;
  }

  error(
    message = '',
    title = '',
    buttons = [],
    close?,
    closeOnEsc?
  ): NgbModalRef {
    return this.open(
      message,
      title,
      buttons,
      this.TYPE_ERROR,
      close,
      closeOnEsc
    );
  }

  success(
    message = '',
    title = '',
    buttons = [],
    close?,
    closeOnEsc?
  ): NgbModalRef {
    return this.open(
      message,
      title,
      buttons,
      this.TYPE_SUCCESS,
      close,
      closeOnEsc
    );
  }

  warning(
    message = '',
    title = '',
    buttons = [],
    close?,
    closeOnEsc?
  ): NgbModalRef {
    return this.open(
      message,
      title,
      buttons,
      this.TYPE_WARNING,
      close,
      closeOnEsc
    );
  }

  wait(message = '', title = '', buttons = [], closeOnEsc?): NgbModalRef {
    return this.open(
      message,
      title,
      undefined,
      this.TYPE_WAIT,
      undefined,
      false
    );
  }

  openWithComponent(
    component: any,
    data: any,
    title = '',
    buttons = [],
    close = () => {},
    closeOnEsc: boolean = true
  ): NgbModalRef {
    if (this.hasOpenModals()) return null;

    // Fix focus changed error
    if (window.document.activeElement)
      (window.document.activeElement as HTMLElement).blur();

    const modal = this.ngbModal.open(component, {
      backdrop: 'static',
      keyboard: closeOnEsc
    });
    modal.componentInstance.title = title;
    modal.componentInstance.buttons = buttons;
    modal.componentInstance.closeBtnAction = close;
    modal.componentInstance.inputData = data;
    return modal;
  }

  hasOpenModals(): boolean {
    return this.ngbModal.hasOpenModals();
  }

  close(): void {
    this.ngbModal.dismissAll();
  }
}
