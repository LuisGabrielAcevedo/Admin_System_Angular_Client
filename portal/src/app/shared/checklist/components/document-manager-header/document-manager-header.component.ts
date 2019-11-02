import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentInfo } from '../document-manager/api/documentManager';

@Component({
  selector: 'app-document-manager-header',
  templateUrl: './document-manager-header.component.html',
  styleUrls: ['./document-manager-header.component.scss']
})
export class DocumentManagerHeaderComponent implements OnInit {
  /* Inputs */
  @Input() title: string = '';
  @Input() lastUpdate: string = '';
  @Input() canDownload: boolean;

  /* Outputs */
  @Output() onDownload = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  public downloadFile(pageId) {
    this.onDownload.emit(pageId);
  }

  public closeModal() {
    this.onClose.emit();
  }
}
