import {
  ChecklistState,
  ModalState,
  ViewerState
} from '../models/state/checklist-state';

export const initialModalState: ModalState = {
  opened: false,
  zoom: 1,
  selectedPageId: null,
  documentId: null,
  proposalId: null
};

export const initialViewerState: ViewerState = {
  opened: false,
  zoom: 1,
  documentId: null,
  proposalId: null
};

export const initialChecklistState: ChecklistState = {
  documents: {},
  pages: {},
  modal: initialModalState,
  viewer: initialViewerState
};
