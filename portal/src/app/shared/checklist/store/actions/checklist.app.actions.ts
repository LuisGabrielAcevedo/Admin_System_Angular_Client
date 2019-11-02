import { Action } from '@ngrx/store';
import { ChecklistAppActionTypes } from './checklist-app-actions-types.enum';
import { ChecklistItem } from '../../models/checklist-item';
import { FileContent } from '../../models/file-content';

export class ChecklistRemoteLoadAction implements Action {
  readonly type = ChecklistAppActionTypes.CHECKLIST_REMOTE_LOAD;
  constructor(public proposalId: number) {}
}

export class ChecklistRemoteLoadEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.CHECKLIST_REMOTE_LOADED;
  constructor(public checklistItems: ChecklistItem[]) {}
}

export class PageListRemoteLoadAction implements Action {
  readonly type = ChecklistAppActionTypes.PAGE_LIST_REMOTE_LOAD;
  constructor(public documentId: string) {}
}

export class PageListRemoteLoadEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.PAGE_LIST_REMOTE_LOADED;
  constructor(public pageList: string[], public documentId: string) {}
}

export class ThumbnailRemoteLoadAction implements Action {
  readonly type = ChecklistAppActionTypes.THUMBNAIL_REMOTE_LOAD;
  constructor(public pageId: string, public documentId: string) {}
}

export class ThumbnailRemoteLoadEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.THUMBNAIL_REMOTE_LOADED;
  constructor(
    public thumbnail: FileContent,
    public pageId: string,
    public documentId: string
  ) {}
}

export class PageRemoteLoadAction implements Action {
  readonly type = ChecklistAppActionTypes.PAGE_REMOTE_LOAD;
  constructor(public pageId: string, public documentId: string) {}
}

export class PageRemoteLoadEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.PAGE_REMOTE_LOADED;
  constructor(
    public file: FileContent,
    public pageId: string,
    public documentId: string
  ) {}
}

export class PageRemoteRemoveAction implements Action {
  readonly type = ChecklistAppActionTypes.PAGE_REMOTE_REMOVE;
  constructor(
    public pageId: string,
    public documentId: string,
    public proposalId: number
  ) {}
}

export class PageRemoteRemoveEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.PAGE_REMOTE_REMOVED;
  constructor(
    public pageId: string,
    public documentId: string,
    public proposalId: number
  ) {}
}

export class FileRemoteUploadAction implements Action {
  readonly type = ChecklistAppActionTypes.FILE_REMOTE_UPLOAD;
  constructor(
    public proposalId: number,
    public documentId: string,
    public documentFile: FileContent
  ) {}
}

export class FileRemoteUploadEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.FILE_REMOTE_UPLOADED;
  constructor(public proposalId: number, public documentId: string) {}
}

export class DocumentFileRemoteLoadEndedAction implements Action {
  readonly type = ChecklistAppActionTypes.DOCUMENT_FILE_REMOTE_LOADED;
  constructor(public documentId: string, public documentFile: FileContent) {}
}

export class DocumentFileRemoteLoadAction implements Action {
  readonly type = ChecklistAppActionTypes.DOCUMENT_FILE_REMOTE_LOAD;
  constructor(public documentId: string, public proposalId: number) {}
}

export type ChecklistAppAction =
  | ChecklistRemoteLoadAction
  | ChecklistRemoteLoadEndedAction
  | PageListRemoteLoadAction
  | PageListRemoteLoadEndedAction
  | ThumbnailRemoteLoadAction
  | ThumbnailRemoteLoadEndedAction
  | PageRemoteLoadAction
  | PageRemoteLoadEndedAction
  | PageRemoteRemoveAction
  | PageRemoteRemoveEndedAction
  | FileRemoteUploadAction
  | FileRemoteUploadEndedAction
  | DocumentFileRemoteLoadAction
  | DocumentFileRemoteLoadEndedAction;
