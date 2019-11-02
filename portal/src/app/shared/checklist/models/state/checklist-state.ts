import { ChecklistItem } from '../checklist-item';
import { FileContent } from '../file-content';

export interface GenericIdMap<T> {
  [id: string]: T;
}

export interface DocumentPage {
  id: string;
  documentId: string;
  file: FileContent;
  thumbnail: FileContent;
  order: number;
}

/**
 * Checklist document
 */
export interface ChecklistDocument extends ChecklistItem {
  fullDocumentFile: FileContent;
  orderedPageList: string[];
}

export interface ModalState {
  opened: boolean;
  zoom: number;
  selectedPageId: string;
  documentId: string;
  proposalId: number;
}

export interface ReadOnlyModalState {
  opened: boolean;
  zoom: number;
  selectedPageId: string;
  documentId: string;
  proposalId: number;
}

export interface ViewerState {
  opened: boolean;
  zoom: number;
  documentId: string;
  proposalId: number;
}

/**
 * Checklist global state object
 */
export interface ChecklistState {
  documents: GenericIdMap<ChecklistDocument>;
  pages: GenericIdMap<DocumentPage>;
  modal: ModalState;
  viewer: ViewerState;
}
