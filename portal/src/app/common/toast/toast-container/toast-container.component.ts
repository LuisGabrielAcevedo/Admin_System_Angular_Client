import { Component, OnInit } from '@angular/core';
import { Toast, ToastType } from '../toast.models';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent implements OnInit {
  public toastList: Toast[];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastList = this.toastService.toastList;
  }

  public remove(id: string): void {
    this.toastService.remove(id);
  }
}
