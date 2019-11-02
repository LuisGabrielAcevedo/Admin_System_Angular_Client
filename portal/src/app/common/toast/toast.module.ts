import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastElementComponent } from './toast-element/toast-element.component';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@NgModule({
  declarations: [ToastElementComponent, ToastContainerComponent],
  imports: [CommonModule, NgbModule],
  exports: [ToastElementComponent, ToastContainerComponent]
})
export class ToastModule {}
