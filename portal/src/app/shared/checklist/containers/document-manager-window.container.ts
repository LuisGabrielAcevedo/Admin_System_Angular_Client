import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ChecklistState } from '../models/state/checklist-state';
import {
  checklistStateSelector,
  selectedPageSelector
} from '../store/checklist.selectors';
import {
  CloseDocumentModalAction,
  ViewDocumentPageAction,
  UploadFileAction,
  RemoveDocumentPageAction,
  ChangeDocumentModalZoom
} from '../store/actions/checklist.user.actions';
import {
  ThumbnailList,
  Page,
  CurrentPage
} from '../components/document-manager/api/documentManager';
import { FileService } from '../services/file.service';
import { ModalService } from '@app/common/modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-manager-window',
  template: `
    <app-document-manager
      [title]="title"
      [opened]="modalOpened"
      [thumbnailList]="thumbnailList"
      [currentPage]="currentPage"
      [zoomRate]="zoom"
      (onClose)="closeDocumentViewer()"
      (onChangePage)="changeDocumentPage($event)"
      (onUpload)="uploadFile($event)"
      (onRemove)="removePage($event)"
      (onZoomIn)="zoomIn()"
      (onZoomOut)="zoomOut()"
    ></app-document-manager>
  `
})
export class DocumentManagerWindowContainer implements OnInit {
  public modalOpened: boolean = false;
  public proposalId: number = null;
  public documentId: string = null;
  public thumbnailList: ThumbnailList = null;
  public currentPage: CurrentPage = null;
  public zoom: number = 1;
  public title: string;
  public lastUpdate: string;

  constructor(
    private store: Store<ChecklistState>,
    private fileService: FileService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(checklistStateSelector),
        select(state => state.modal)
      )
      .subscribe(modal => {
        this.modalOpened = modal.opened;
        this.documentId = modal.documentId;
        this.proposalId = modal.proposalId;
        this.zoom = modal.zoom;
      });
    this.store
      .pipe(
        select(checklistStateSelector),
        select(state =>
          Object.values(state.pages).filter(
            p => p.documentId === this.documentId
          )
        )
      )
      .subscribe(pages => {
        this.thumbnailList = {
          documentId: this.documentId,
          documentPages: pages
            .sort((a, b) => a.order - b.order)
            .filter(p => p.thumbnail)
            .map(p => ({ ...p.thumbnail, pageId: p.id } as Page))
        };
      });

    this.store
      .pipe(
        select(checklistStateSelector),
        select(state => state.documents[state.modal.documentId])
      )
      .subscribe(document => {
        if (!document) return;
        this.title = document.title;
        this.lastUpdate = document.lastUpdate;
      });

    this.store.pipe(select(selectedPageSelector)).subscribe(page => {
      if (!page || !page.file) return (this.currentPage = null);
      this.currentPage = {
        documentId: page.documentId,
        documentPage: { pageId: page.id, ...page.file }
      };
    });
  }

  closeDocumentViewer() {
    this.store.dispatch(new CloseDocumentModalAction(this.documentId));
  }

  changeDocumentPage(pageId: string) {
    this.store.dispatch(new ViewDocumentPageAction(pageId, this.documentId));
  }

  uploadFile(event: Event) {
    const maxSize = 10;
    const size = this.fileService.getSize(event);
    const isValidType = this.fileService.isValidType(event);
    if (!isValidType) {
      this.modalService.warning(
        this.translate.instant('@Please select a valid format of file'),
        ''
      );
    } else {
      if (size > maxSize) {
        this.modalService.warning(
          this.translate.instant(
            '@The selected document could not be loaded. Please verify that the size is less than 10MB'
          ),
          ''
        );
      } else {
        this.fileService.readBase64FromEvent(event, documentFile => {
          this.store.dispatch(
            new UploadFileAction(this.proposalId, this.documentId, documentFile)
          );
        });
      }
    }
  }

  removePage(pageId: string) {
    this.store.dispatch(
      new RemoveDocumentPageAction(pageId, this.documentId, this.proposalId)
    );
  }

  ZOOM_STEP: number = 1.25;

  zoomIn() {
    this.store.dispatch(
      new ChangeDocumentModalZoom(this.zoom * this.ZOOM_STEP)
    );
  }

  zoomOut() {
    this.store.dispatch(
      new ChangeDocumentModalZoom(this.zoom * (1 / this.ZOOM_STEP))
    );
  }
}
