import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { ThumbnailList, Page } from '../document-manager/api/documentManager';
import { AllowedFormat } from '../../models/allowed-format.enum';
import { FileContent } from '../../models/file-content';

@Component({
  selector: 'app-view-document-manager',
  templateUrl: './view-document-manager.component.html',
  styleUrls: ['./view-document-manager.component.scss']
})
export class ViewDocumentManagerComponent {
  /* Inputs */
  @Input() title: string; // Document data, for document-header
  @Input() lastUpdate: string;
  @Input() thumbnailList: ThumbnailList; // List of thumbnails for a given document, for document-manager-pages
  @Input() fullContent: FileContent; // Data of selected Page, for document-manager-canvas
  @Input() zoomRate: number; // Zoom rate, for document-manager-canvas
  @Input() canUpload: boolean; // Flag, if user can upload a file
  @Input() canDownload: boolean; // Flag, if user can download a file
  @Input() canRemove: boolean; // Flag, if user can remove a file

  fileTypeAccepted: string[] = Object.values(AllowedFormat); // Type of files accepteds for upload, for document-manager-pages

  private _opened: boolean = false;

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    this._opened = value;
    this.elRef.nativeElement.ownerDocument.body.style.overflow = this.opened
      ? 'hidden'
      : null;
  }

  /* Outputs */
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  public closeModal() {
    this.onClose.emit();
  }
}
