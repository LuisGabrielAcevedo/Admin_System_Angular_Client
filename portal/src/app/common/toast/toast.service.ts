import { Injectable } from '@angular/core';
import { Toast, ToastType } from './toast.models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private UID = 0;
  toastList: Toast[] = [];

  constructor() {}

  private generateUID(): string {
    return `UID-${this.UID++}`;
  }

  public add(msg: string, type?: ToastType) {
    const t: Toast = { msg, id: this.generateUID(), type };
    this.toastList.unshift(t);
  }

  public remove(id: string): void {
    const i = this.toastList.findIndex(t => t.id === id);
    if (i !== -1) this.toastList.splice(i, 1);
  }
}
