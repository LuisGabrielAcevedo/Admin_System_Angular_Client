import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-document-manager-header',
  templateUrl: './view-document-manager-header.component.html',
  styleUrls: ['./view-document-manager-header.component.scss']
})
export class ViewDocumentManagerHeaderComponent {
  /* Inputs */
  @Input() title: string = '';
  @Input() lastUpdate: string = '';
  @Input() canDownload: boolean;

  /* Outputs */
  @Output() onClose = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  public closeModal() {
    this.onClose.emit();
  }
}
