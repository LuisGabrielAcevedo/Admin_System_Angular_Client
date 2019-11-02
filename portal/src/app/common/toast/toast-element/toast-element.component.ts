import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AnimateGallery } from '@app/constants/animation.constants';
import { Toast } from '../toast.models';

@Component({
  selector: 'app-toast-element',
  templateUrl: './toast-element.component.html',
  styleUrls: ['./toast-element.component.scss'],
  animations: [AnimateGallery]
})
export class ToastElementComponent implements AfterViewInit {
  @Input() toast: Toast;
  @Output() remove: EventEmitter<string> = new EventEmitter();

  public state: string = 'toastOpen';
  private timeout: number;

  constructor() {}

  ngAfterViewInit(): void {
    switch (this.toast.type) {
      case 'success':
        this.timeout = 10000;
        break;
      case 'info':
        this.timeout = 10000;
        break;
      case 'error':
        this.timeout = 15000;
        break;
      case 'warning':
        this.timeout = 15000;
        break;
      default:
        this.timeout = 10000;
        break;
    }

    this.configTimeout();
  }

  private configTimeout(): void {
    setTimeout(() => {
      this.state = 'toastClose';
    }, this.timeout);
  }

  public animationDone(id: string) {
    if (this.state === 'toastClose') {
      this.remove.emit(id);
    }
  }
}
