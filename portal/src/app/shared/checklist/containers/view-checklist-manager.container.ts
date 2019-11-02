import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  ChecklistState,
  ChecklistDocument
} from '../models/state/checklist-state';
import {
  ViewCheckListAction,
  OpenDocumentViewerAction
} from '../store/actions/checklist.user.actions';
import { checklistStateSelector } from '../store/checklist.selectors';
import { FileService } from '../services/file.service';
import { ChecklistItemStatus } from '../models/checklist-item-status.enum';

@Component({
  selector: 'app-view-checklist-manager',
  template: `
    <div class="checklist-manager">
      <app-view-checklist-item
        *ngFor="let doc of documentList"
        [title]="doc.title"
        [status]="checkStatus(doc)"
        [isLoaded]="checkStatus(doc)"
        (onViewDocument)="openDoc(doc.id)"
      ></app-view-checklist-item>
    </div>
  `
})
export class ViewChecklistManagerContainer implements OnInit {
  private _proposalId: number;

  @Input()
  set proposalId(value: number) {
    this._proposalId = value;
    if (this._proposalId)
      this.store.dispatch(new ViewCheckListAction(this._proposalId));
  }
  get proposalId(): number {
    return this._proposalId;
  }

  @Input() filterFunction: (d: ChecklistDocument) => boolean = document =>
    !!document;

  constructor(
    private store: Store<ChecklistState>,
    private fileService: FileService
  ) {}

  public documentList: ChecklistDocument[] = [];

  public documentIdList: string[] = [];

  public currentDocument: ChecklistDocument = null;

  checkStatus(document: ChecklistDocument): boolean {
    return document.status !== ChecklistItemStatus.INITIAL;
  }

  openDoc(id: string) {
    this.store.dispatch(new OpenDocumentViewerAction(this.proposalId, id));
  }

  ngOnInit() {
    this.store
      .pipe(
        select(checklistStateSelector),
        select(state => state.documents)
      )
      .subscribe(documents => {
        this.documentList = Object.values(documents).filter(
          this.filterFunction
        );
        this.documentIdList = this.documentList.map(d => d.id);
      });
  }
}
