import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, NgbModule],
  exports: [ModalComponent],
  providers: [NgbActiveModal],
  entryComponents: [ModalComponent]
})
export class ModalModule {}
