import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChecklistUserActionTypes } from '../actions/checklist-user-actions-types.enum';
import {
  ViewCheckListAction,
  OpenDocumentModalAction,
  ViewDocumentPageAction,
  UploadFileAction,
  RemoveDocumentPageAction,
  OpenDocumentViewerAction,
  CloseDocumentViewerAction
} from '../actions/checklist.user.actions';
import {
  ChecklistRemoteLoadAction,
  ChecklistRemoteLoadEndedAction,
  PageListRemoteLoadAction,
  PageListRemoteLoadEndedAction,
  ThumbnailRemoteLoadAction,
  PageRemoteLoadAction,
  ThumbnailRemoteLoadEndedAction,
  PageRemoteLoadEndedAction,
  FileRemoteUploadAction,
  FileRemoteUploadEndedAction,
  PageRemoteRemoveAction,
  PageRemoteRemoveEndedAction,
  DocumentFileRemoteLoadAction,
  DocumentFileRemoteLoadEndedAction
} from '../actions/checklist.app.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ChecklistAppActionTypes } from '../actions/checklist-app-actions-types.enum';
import { ChecklistService } from '../../services/checklist.service';
import { DocumentService } from '../../services/document.service';
import { Action } from '@ngrx/store';
import { NEVER } from 'rxjs';

@Injectable()
export class ChecklistEffects {
  constructor(
    private actions: Actions,
    private checklistService: ChecklistService,
    private documentService: DocumentService
  ) {}

  @Effect()
  userViewCheckList = this.actions.pipe(
    ofType<ViewCheckListAction>(ChecklistUserActionTypes.VIEW_CHECKLIST),
    map(action => new ChecklistRemoteLoadAction(action.proposalId))
  );

  @Effect()
  userOpenDocumentModal = this.actions.pipe(
    ofType<OpenDocumentModalAction>(
      ChecklistUserActionTypes.OPEN_DOCUMENT_MODAL
    ),
    map(action => new PageListRemoteLoadAction(action.documentId))
  );

  @Effect()
  appPageListRemoteLoad = this.actions.pipe(
    ofType<PageListRemoteLoadAction>(
      ChecklistAppActionTypes.PAGE_LIST_REMOTE_LOAD
    ),
    mergeMap(action =>
      this.documentService.getDocumentPages(action.documentId).pipe(
        map(
          res => new PageListRemoteLoadEndedAction(res.pageList, res.documentId)
        ),
        catchError(error => NEVER)
      )
    )
  );

  @Effect()
  appChecklistRemoteLoad = this.actions.pipe(
    ofType<ChecklistRemoteLoadAction>(
      ChecklistAppActionTypes.CHECKLIST_REMOTE_LOAD
    ),
    mergeMap(action =>
      this.checklistService.getChecklist(action.proposalId).pipe(
        map(res => new ChecklistRemoteLoadEndedAction(res.checklist)),
        catchError(error => NEVER)
      )
    )
  );

  @Effect()
  appPageListRemoteLoadEnded = this.actions.pipe(
    ofType<PageListRemoteLoadEndedAction>(
      ChecklistAppActionTypes.PAGE_LIST_REMOTE_LOADED
    ),
    mergeMap(action => {
      let nextActions: Action[] = action.pageList.map(
        pageId => new ThumbnailRemoteLoadAction(pageId, action.documentId)
      );
      if (action.pageList.length > 0)
        nextActions.push(
          new ViewDocumentPageAction(action.pageList[0], action.documentId)
        );
      return nextActions;
    })
  );

  @Effect()
  userViewPage = this.actions.pipe(
    ofType<ViewDocumentPageAction>(ChecklistUserActionTypes.VIEW_PAGE),
    map(action => new PageRemoteLoadAction(action.pageId, action.documentId))
  );

  @Effect()
  appThumbnailRemoteLoad = this.actions.pipe(
    ofType<ThumbnailRemoteLoadAction>(
      ChecklistAppActionTypes.THUMBNAIL_REMOTE_LOAD
    ),
    mergeMap(action =>
      this.documentService
        .getDocumentPageThumbnail(action.pageId, action.documentId)
        .pipe(
          map(
            res =>
              new ThumbnailRemoteLoadEndedAction(
                res.file,
                res.pageId,
                res.documentId
              )
          ),
          catchError(error => NEVER)
        )
    )
  );

  @Effect()
  appPageRemoteLoad = this.actions.pipe(
    ofType<PageRemoteLoadAction>(ChecklistAppActionTypes.PAGE_REMOTE_LOAD),
    mergeMap(action =>
      this.documentService
        .getDocumentPage(action.pageId, action.documentId)
        .pipe(
          map(
            res =>
              new PageRemoteLoadEndedAction(
                res.file,
                res.pageId,
                res.documentId
              )
          ),
          catchError(error => NEVER)
        )
    )
  );

  @Effect()
  userUploadFile = this.actions.pipe(
    ofType<UploadFileAction>(ChecklistUserActionTypes.UPLOAD_FILE),
    map(
      action =>
        new FileRemoteUploadAction(
          action.proposalId,
          action.documentId,
          action.documentFile
        )
    )
  );

  @Effect()
  appRemoteUploadFile = this.actions.pipe(
    ofType<FileRemoteUploadAction>(ChecklistAppActionTypes.FILE_REMOTE_UPLOAD),
    mergeMap(action =>
      this.documentService
        .postDocumentUpload(
          action.proposalId,
          action.documentId,
          action.documentFile
        )
        .pipe(
          map(
            res =>
              new FileRemoteUploadEndedAction(
                action.proposalId,
                action.documentId
              )
          ),
          catchError(error => NEVER)
        )
    )
  );

  @Effect()
  appRemoteFileUploadEnded = this.actions.pipe(
    ofType<FileRemoteUploadEndedAction>(
      ChecklistAppActionTypes.FILE_REMOTE_UPLOADED
    ),
    mergeMap(action => [
      new ChecklistRemoteLoadAction(action.proposalId),
      new PageListRemoteLoadAction(action.documentId)
    ])
  );

  @Effect()
  userRemovePage = this.actions.pipe(
    ofType<RemoveDocumentPageAction>(ChecklistUserActionTypes.REMOVE_PAGE),
    map(
      action =>
        new PageRemoteRemoveAction(
          action.pageId,
          action.documentId,
          action.proposalId
        )
    )
  );

  @Effect()
  appRemoteRemovePage = this.actions.pipe(
    ofType<PageRemoteRemoveAction>(ChecklistAppActionTypes.PAGE_REMOTE_REMOVE),
    mergeMap(action =>
      this.documentService
        .deleteDocumentPage(action.pageId, action.documentId)
        .pipe(
          map(
            res =>
              new PageRemoteRemoveEndedAction(
                action.pageId,
                action.documentId,
                action.proposalId
              )
          ),
          catchError(error => NEVER)
        )
    )
  );

  @Effect()
  appRemoteRemovePageEnded = this.actions.pipe(
    ofType<PageRemoteRemoveEndedAction>(
      ChecklistAppActionTypes.PAGE_REMOTE_REMOVED
    ),
    mergeMap(action => [
      new ChecklistRemoteLoadAction(action.proposalId),
      new PageListRemoteLoadAction(action.documentId)
    ])
  );

  @Effect()
  appFullDocumentRemoteLoad = this.actions.pipe(
    ofType<DocumentFileRemoteLoadAction>(
      ChecklistAppActionTypes.DOCUMENT_FILE_REMOTE_LOAD
    ),
    mergeMap(action =>
      this.documentService.getFullDocument(action.documentId).pipe(
        map(
          res => new DocumentFileRemoteLoadEndedAction(res.documentId, res.file)
        ),
        catchError(error => NEVER)
      )
    )
  );

  @Effect()
  userOpenDocumentViewer = this.actions.pipe(
    ofType<OpenDocumentViewerAction>(
      ChecklistUserActionTypes.OPEN_DOCUMENT_VIEWER
    ),
    map(
      action =>
        new DocumentFileRemoteLoadAction(action.documentId, action.proposalId)
    )
  );
}
