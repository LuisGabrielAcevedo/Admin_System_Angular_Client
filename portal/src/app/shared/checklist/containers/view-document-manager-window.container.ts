import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ChecklistState } from '../models/state/checklist-state';
import {
  checklistStateSelector,
  selectedPageSelector
} from '../store/checklist.selectors';
import {
  ViewDocumentPageAction,
  ChangeDocumentModalZoom,
  CloseDocumentViewerAction
} from '../store/actions/checklist.user.actions';
import { ThumbnailList } from '../components/document-manager/api/documentManager';
import { FileService } from '../services/file.service';
import { FileContent } from '../models/file-content';

@Component({
  selector: 'app-view-document-manager-window',
  template: `
    <app-view-document-manager
      [title]="title"
      [opened]="modalOpened"
      [fullContent]="fullDocument"
      (onClose)="closeDocumentViewer()"
    ></app-view-document-manager>
  `
})
export class ViewDocumentManagerWindowContainer implements OnInit {
  public modalOpened: boolean = false;
  public proposalId: number = null;
  public documentId: string = null;
  public zoom: number = 1;
  public title: string;
  public lastUpdate: string;

  public fullDocument: FileContent;

  constructor(
    private store: Store<ChecklistState>,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(checklistStateSelector),
        select(state => state.viewer)
      )
      .subscribe(viewer => {
        this.modalOpened = viewer.opened;
        this.documentId = viewer.documentId;
        this.proposalId = viewer.proposalId;
        this.zoom = viewer.zoom;
      });

    this.store
      .pipe(
        select(checklistStateSelector),
        select(state => state.documents[state.viewer.documentId])
      )
      .subscribe(document => {
        if (!document) return;
        this.title = document.title;
        this.lastUpdate = document.lastUpdate;
        this.fullDocument = document.fullDocumentFile;
      });
  }

  closeDocumentViewer() {
    this.store.dispatch(new CloseDocumentViewerAction(this.documentId));
  }
}
