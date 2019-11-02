/**
 * Possible checklist actions performed by the user
 */
export enum ChecklistUserActionTypes {
  VIEW_CHECKLIST = '[Checklist] View All Documents',
  VIEW_PAGE = '[Checklist] View Document Page',
  VIEW_FULL_DOCUMENT = '[Checklist] View Full Document',
  REMOVE_PAGE = '[Checklist] Remove Document Page',
  UPLOAD_FILE = '[Checklist] Upload New File',
  OPEN_DOCUMENT_MODAL = '[Checklist] Open Document Management Modal',
  CLOSE_DOCUMENT_MODAL = '[Checklist] Close Document Management Modal',
  CHANGE_DOCUMENT_MODAL_ZOOM = '[Checklist] Change Document Modal Zoom',
  OPEN_DOCUMENT_VIEWER = '[Checklist] Open Modal Read Only',
  CLOSE_DOCUMENT_VIEWER = '[Checklist] Close Modal Read Only'
}
