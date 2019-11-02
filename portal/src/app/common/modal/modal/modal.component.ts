import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalButton } from '../modal-button';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalType = 'error';
  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Input() buttons: Array<ModalButton>;
  @Input() closeBtnAction: () => void;

  @Output() modalOutput: EventEmitter<any> = new EventEmitter();
  @Output() modalCloseOutput: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  modalSubmit(action: () => void): void {
    this.modalOutput.emit(action);
  }

  modalClose() {
    this.modalCloseOutput.emit(this.closeBtnAction);
  }
}
