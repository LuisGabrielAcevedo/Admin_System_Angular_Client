import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '@app/common/modal';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ChecklistItemStatus } from '../models/checklist-item-status.enum';
import {
  ChecklistDocument,
  ChecklistState
} from '../models/state/checklist-state';
import { FileService } from '../services/file.service';
import {
  OpenDocumentModalAction,
  UploadFileAction,
  ViewCheckListAction
} from '../store/actions/checklist.user.actions';
import { checklistStateSelector } from '../store/checklist.selectors';

@Component({
  selector: 'app-checklist-manager',
  template: `
    <div class="checklist-manager">
      <app-checklist-item
        *ngFor="let doc of documentList"
        [title]="doc.title"
        [instructions]="doc.instructions"
        [link]="doc.link"
        [isLoading]="false"
        [status]="checkStatus(doc)"
        [isLoaded]="checkStatus(doc)"
        [isRequired]="doc.isRequired"
        (onUpload)="uploadDoc($event, doc.id)"
        (onViewDocument)="openDoc(doc.id)"
      ></app-checklist-item>
    </div>
  `
})
export class ChecklistManagerContainer implements OnInit {
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

  @Output() counted = new EventEmitter();
  @Output() pendingDocumentsNumber = new EventEmitter();

  constructor(
    private store: Store<ChecklistState>,
    private fileService: FileService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  public documentList: ChecklistDocument[] = [];

  public documentIdList: string[] = [];

  public currentDocument: ChecklistDocument = null;

  uploadDoc(event: Event, documentId: string) {
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
            new UploadFileAction(this.proposalId, documentId, documentFile)
          );
        });
      }
    }
  }

  checkStatus(document: ChecklistDocument): boolean {
    return document.status !== ChecklistItemStatus.INITIAL;
  }
  checkPendingStatus(document: ChecklistDocument): boolean {
    return (
      document.status === ChecklistItemStatus.INITIAL &&
      document.isRequired === true
    );
  }
  openDoc(id: string) {
    this.store.dispatch(new OpenDocumentModalAction(this.proposalId, id));
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
        this.counted.emit(this.documentList.length);

        const pendingDocuments = this.documentList.filter(
          this.checkPendingStatus
        );
        this.pendingDocumentsNumber.emit(pendingDocuments.length);
      });
  }
}
