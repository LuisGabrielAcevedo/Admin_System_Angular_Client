import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { ThumbnailList, CurrentPage, Page } from './api/documentManager';
import { AllowedFormat } from '../../models/allowed-format.enum';
@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  /* Inputs */
  @Input() title: string; // Document data, for document-header
  @Input() lastUpdate: string;
  @Input() thumbnailList: ThumbnailList; // List of thumbnails for a given document, for document-manager-pages
  @Input() currentPage: CurrentPage; // Data of selected Page, for document-manager-canvas
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
      : 'auto';
  }

  /* Outputs */
  @Output() onChangePage: EventEmitter<string> = new EventEmitter();
  @Output() onUpload: EventEmitter<Event> = new EventEmitter();
  @Output() onDownload: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  @Output() onZoomIn: EventEmitter<any> = new EventEmitter();
  @Output() onZoomOut: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  //currentPageNumber: number; // Number of page selected, for document-canvas-menu
  //totalOfPages: number; // Number total of pages, for document-canvas-menu
  //selectedPageId: string; // Id of page selected, for document-canvas-menu

  public currentPageNumber(pages: Page[], pageId: string) {
    if (!pages || !pageId) return 0;
    return pages.findIndex(p => p.pageId === pageId) + 1;
  }

  ngOnInit() {}

  public changePage(event: string) {
    this.onChangePage.emit(event);
  }

  public uploadFile(event) {
    this.onUpload.emit(event);
  }

  public downloadFile(event) {
    this.onDownload.emit(event);
  }

  public removeFile(event) {
    this.onRemove.emit(event);
  }

  public closeModal() {
    this.onClose.emit();
  }

  public zoomIn() {
    this.onZoomIn.emit();
  }
  public zoomOut() {
    this.onZoomOut.emit();
  }
}
