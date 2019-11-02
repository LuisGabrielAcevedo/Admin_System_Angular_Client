import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

import {
  ThumbnailList,
  PageComponent
} from '../document-manager/api/documentManager';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64Service } from '../document-manager/base64.service';

@Component({
  selector: 'app-document-manager-pages',
  templateUrl: './document-manager-pages.component.html',
  styleUrls: ['./document-manager-pages.component.scss']
})
export class DocumentManagerPagesComponent implements OnInit, OnChanges {
  @ViewChild('listContent', { read: ElementRef })
  public listContent: ElementRef<any>;

  public viewHeight: number;
  public fullTop: boolean = true;
  public fullBottom: boolean = false;

  /* Inputs */
  @Input() thumbnailList: ThumbnailList; // List of thumbnails for a given document
  @Input() selectedPageId: string; // Id of selected image
  @Input() fileTypeAccepted: []; // Type files that user can do a download
  @Input() canRemove: boolean; // Flag, if user can remove a file
  /* Outputs */
  @Output() onSelectThumbnail: EventEmitter<any> = new EventEmitter(); // When click a thumb on list
  @Output() onAddFile: EventEmitter<any> = new EventEmitter(); // When click add file button on thumbnails list
  @Output() onRemove: EventEmitter<any> = new EventEmitter(); //When click remove file button on thumbnails list

  public thumbs: PageComponent[]; // variable to save the list of thumbs
  constructor(private base64Service: Base64Service) {}

  ngOnInit() {
    this.viewHeight = this.listContent.nativeElement.offsetHeight;
  }

  ngOnChanges() {
    if (this.thumbnailList) {
      this.thumbs = this.thumbnailList.documentPages.map(thumb => {
        const URL = this.base64Service.sanitizeUrl(
          this.base64Service.buildUrl(thumb.format, thumb.content)
        );
        return {
          pageId: thumb.pageId,
          content: this.base64Service.sanitizeUrlStyle(URL)
        };
      });
    }
  }

  public selectMiniature(selectedPage: string) {
    this.onSelectThumbnail.emit(selectedPage);
  }

  public addFile(event) {
    this.onAddFile.emit(event);
  }

  public removeFile(pageId: string, $event: Event) {
    $event.stopPropagation();
    this.onRemove.emit(pageId);
  }

  /**
   * SCROLLING ARROWS
   */

  @HostListener('window:scroll', ['$event']) // for window scroll events
  public scrolling(event) {
    if (
      this.listContent.nativeElement.scrollHeight -
        this.listContent.nativeElement.offsetHeight ===
      this.listContent.nativeElement.scrollTop
    ) {
      this.fullBottom = true;
    } else {
      this.fullBottom = false;
    }
    if (this.listContent.nativeElement.scrollTop === 0) {
      this.fullTop = true;
    } else {
      this.fullTop = false;
    }
  }

  public scrollTop(): void {
    this.listContent.nativeElement.scrollTop =
      this.listContent.nativeElement.scrollTop - 150;
  }

  public scrollBottom(): void {
    this.listContent.nativeElement.scrollTop =
      this.listContent.nativeElement.scrollTop + 150;
  }
}
