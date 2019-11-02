import { Action, ActionReducerMap } from '@ngrx/store';
import { ChecklistAppActionTypes } from '../actions/checklist-app-actions-types.enum';
import {
  GenericIdMap,
  ChecklistDocument,
  ChecklistState,
  DocumentPage,
  ModalState,
  ViewerState,
  ReadOnlyModalState
} from '../../models/state/checklist-state';
import { ChecklistItem } from '../../models/checklist-item';
import { FileContent } from '../../models/file-content';
import {
  ChecklistRemoteLoadEndedAction,
  PageListRemoteLoadEndedAction,
  ThumbnailRemoteLoadEndedAction,
  PageRemoteLoadEndedAction,
  DocumentFileRemoteLoadEndedAction
} from '../actions/checklist.app.actions';
import { initialModalState, initialViewerState } from '../checklist.state';
import { ChecklistUserActionTypes } from '../actions/checklist-user-actions-types.enum';
import {
  OpenDocumentModalAction,
  CloseDocumentModalAction,
  ViewDocumentPageAction,
  ChangeDocumentModalZoom,
  OpenDocumentViewerAction,
  CloseDocumentViewerAction
} from '../actions/checklist.user.actions';

const mapArrayById = (map, item) => ((map[item.id] = item), map);

const item2document = (
  item: ChecklistItem,
  document: ChecklistDocument
): ChecklistDocument => {
  const fullDocumentFile = document ? document.fullDocumentFile : null;
  const orderedPageList = document ? document.orderedPageList : [];
  return { ...item, fullDocumentFile, orderedPageList };
};

export function checklistReducer(
  state: GenericIdMap<ChecklistDocument> = {},
  action: ChecklistRemoteLoadEndedAction
): GenericIdMap<ChecklistDocument> {
  return action.checklistItems
    .map(item => item2document(item, state[item.id]))
    .reduce(mapArrayById, {});
}

function pageListReducer(
  state: GenericIdMap<ChecklistDocument>,
  action: PageListRemoteLoadEndedAction
): GenericIdMap<ChecklistDocument> {
  const document = state[action.documentId];
  if (!document) return state;

  const updatedDoc: ChecklistDocument = {
    ...document,
    orderedPageList: [...action.pageList]
  };
  return { ...state, [action.documentId]: updatedDoc };
}

function documentFileReducer(
  state: GenericIdMap<ChecklistDocument>,
  action: DocumentFileRemoteLoadEndedAction
): GenericIdMap<ChecklistDocument> {
  const document = state[action.documentId];
  if (!document) return state;

  const updatedDoc: ChecklistDocument = {
    ...document,
    fullDocumentFile: { ...action.documentFile }
  };
  return { ...state, [action.documentId]: updatedDoc };
}

export function documentsReducer(
  state: GenericIdMap<ChecklistDocument> = {},
  action: Action
): GenericIdMap<ChecklistDocument> {
  switch (action.type) {
    case ChecklistAppActionTypes.CHECKLIST_REMOTE_LOADED:
      return checklistReducer(state, action as ChecklistRemoteLoadEndedAction);
    case ChecklistAppActionTypes.PAGE_LIST_REMOTE_LOADED:
      return pageListReducer(state, action as PageListRemoteLoadEndedAction);
    case ChecklistAppActionTypes.DOCUMENT_FILE_REMOTE_LOADED:
      return documentFileReducer(
        state,
        action as DocumentFileRemoteLoadEndedAction
      );
    default:
      return state;
  }
}

// [TODO] Refactor and use same state when nothing changes
function emptyPageListReducer(
  state: GenericIdMap<DocumentPage>,
  action: PageListRemoteLoadEndedAction
): GenericIdMap<DocumentPage> {
  const newPages: GenericIdMap<DocumentPage> = action.pageList
    .map((id, order) => ({
      ...{ file: null, thumbnail: null },
      ...state[id],
      ...{ id, order, documentId: action.documentId }
    }))
    .reduce(mapArrayById, {});

  const newState = { ...newPages, ...state };

  const orphanPagesId: string[] = Object.values(newState)
    .filter(p => p.documentId === action.documentId)
    .filter(p => action.pageList.indexOf(p.id) < 0)
    .map(p => p.id);

  orphanPagesId.forEach(id => {
    if (newState[id]) delete newState[id];
  });

  return newState;
}

function thumbnailReducer(
  state: GenericIdMap<DocumentPage>,
  action: ThumbnailRemoteLoadEndedAction
): GenericIdMap<DocumentPage> {
  const page = state[action.pageId];
  if (!page) return state;
  const newState = {
    ...state,
    [action.pageId]: { ...page, thumbnail: action.thumbnail }
  };
  return newState;
}

export function pageFileReducer(
  state: GenericIdMap<DocumentPage>,
  action: PageRemoteLoadEndedAction
): GenericIdMap<DocumentPage> {
  const page = state[action.pageId];
  if (!page) return state;
  const newState = {
    ...state,
    [action.pageId]: { ...page, file: action.file }
  };
  return newState;
}

export function pagesReducer(
  state: GenericIdMap<DocumentPage> = {},
  action: Action
): GenericIdMap<DocumentPage> {
  switch (action.type) {
    case ChecklistAppActionTypes.PAGE_LIST_REMOTE_LOADED:
      return emptyPageListReducer(
        state,
        action as PageListRemoteLoadEndedAction
      );
    case ChecklistAppActionTypes.THUMBNAIL_REMOTE_LOADED:
      return thumbnailReducer(state, action as ThumbnailRemoteLoadEndedAction);
    case ChecklistAppActionTypes.PAGE_REMOTE_LOADED:
      return pageFileReducer(state, action as PageRemoteLoadEndedAction);
    default:
      return state;
  }
}

export function openModalReducer(
  state: ModalState,
  action: OpenDocumentModalAction
): ModalState {
  return {
    opened: true,
    zoom: 1,
    documentId: action.documentId,
    proposalId: action.proposalId,
    selectedPageId: null
  };
}

export function modalReducer(
  state: ModalState = initialModalState,
  action: Action
): ModalState {
  switch (action.type) {
    case ChecklistUserActionTypes.OPEN_DOCUMENT_MODAL:
      return openModalReducer(state, action as OpenDocumentModalAction);
    case ChecklistUserActionTypes.CLOSE_DOCUMENT_MODAL:
      return { ...initialModalState };
    case ChecklistUserActionTypes.VIEW_PAGE:
      return {
        ...state,
        selectedPageId: (action as ViewDocumentPageAction).pageId
      };
    case ChecklistUserActionTypes.CHANGE_DOCUMENT_MODAL_ZOOM:
      return { ...state, zoom: (action as ChangeDocumentModalZoom).zoom };
    default:
      return state;
  }
}

export function viewerReducer(
  state: ViewerState = initialViewerState,
  action: Action
): ViewerState {
  switch (action.type) {
    case ChecklistUserActionTypes.OPEN_DOCUMENT_VIEWER:
      return openDocumentViewerReducer(
        state,
        action as OpenDocumentViewerAction
      );

    case ChecklistUserActionTypes.CLOSE_DOCUMENT_VIEWER:
      return closeDocumentViewerReducer(
        state,
        action as CloseDocumentViewerAction
      );
    default:
      return state;
  }
}

export function openDocumentViewerReducer(
  state: ViewerState,
  action: OpenDocumentViewerAction
): ViewerState {
  return {
    opened: true,
    zoom: 1,
    documentId: action.documentId,
    proposalId: action.proposalId
  };
}

export function closeDocumentViewerReducer(
  state: ViewerState,
  action: CloseDocumentViewerAction
): ViewerState {
  return { ...initialViewerState };
}
/**
 * Reducer Map
 */

export const checklistReducerMap: ActionReducerMap<ChecklistState> = {
  documents: documentsReducer,
  pages: pagesReducer,
  modal: modalReducer,
  viewer: viewerReducer
};
