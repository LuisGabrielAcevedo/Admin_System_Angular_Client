import { Action } from '@ngrx/store';
import { ChecklistUserActionTypes } from './checklist-user-actions-types.enum';
import { FileContent } from '../../models/file-content';

export class ViewCheckListAction implements Action {
  readonly type = ChecklistUserActionTypes.VIEW_CHECKLIST;
  constructor(public proposalId: number) {}
}

export class ViewDocumentPageAction implements Action {
  readonly type = ChecklistUserActionTypes.VIEW_PAGE;
  constructor(public pageId: string, public documentId: string) {}
}

export class ViewFullDocumentAction implements Action {
  readonly type = ChecklistUserActionTypes.VIEW_FULL_DOCUMENT;
  constructor(public documentId: string) {}
}

export class RemoveDocumentPageAction implements Action {
  readonly type = ChecklistUserActionTypes.REMOVE_PAGE;
  constructor(
    public pageId: string,
    public documentId: string,
    public proposalId: number
  ) {}
}

export class UploadFileAction implements Action {
  readonly type = ChecklistUserActionTypes.UPLOAD_FILE;
  constructor(
    public proposalId: number,
    public documentId: string,
    public documentFile: FileContent
  ) {}
}

export class OpenDocumentModalAction implements Action {
  readonly type = ChecklistUserActionTypes.OPEN_DOCUMENT_MODAL;
  constructor(public proposalId: number, public documentId: string) {}
}

export class CloseDocumentModalAction implements Action {
  readonly type = ChecklistUserActionTypes.CLOSE_DOCUMENT_MODAL;
  constructor(public documentId: string) {}
}

export class ChangeDocumentModalZoom implements Action {
  readonly type = ChecklistUserActionTypes.CHANGE_DOCUMENT_MODAL_ZOOM;
  constructor(public zoom: number) {}
}

export class OpenDocumentViewerAction implements Action {
  readonly type = ChecklistUserActionTypes.OPEN_DOCUMENT_VIEWER;
  constructor(public proposalId: number, public documentId: string) {}
}

export class CloseDocumentViewerAction implements Action {
  readonly type = ChecklistUserActionTypes.CLOSE_DOCUMENT_VIEWER;
  constructor(public documentId: string) {}
}

export type ChecklistUserAction =
  | ViewCheckListAction
  | ViewDocumentPageAction
  | ViewFullDocumentAction
  | RemoveDocumentPageAction
  | UploadFileAction
  | OpenDocumentModalAction
  | CloseDocumentModalAction
  | ChangeDocumentModalZoom
  | OpenDocumentViewerAction
  | CloseDocumentViewerAction;
