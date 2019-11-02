/**
 * Reactive actions performed by the application
 */
export enum ChecklistAppActionTypes {
  CHECKLIST_REMOTE_LOAD = '[Checklist] [Remote-Load-Start] Document List',
  CHECKLIST_REMOTE_LOADED = '[Checklist] [Remote-Load-End] Document List',
  PAGE_LIST_REMOTE_LOAD = '[Checklist] [Remote-Load-Start] Page List',
  PAGE_LIST_REMOTE_LOADED = '[Checklist] [Remote-Load-End] Page List',
  THUMBNAIL_REMOTE_LOAD = '[Checklist] [Remote-Load-Start] Thumbnail',
  THUMBNAIL_REMOTE_LOADED = '[Checklist] [Remote-Load-End] Thumbnail',
  PAGE_REMOTE_LOAD = '[Checklist] [Remote-Load-Start] Page PDF',
  PAGE_REMOTE_LOADED = '[Checklist] [Remote-Load-End] Page PDF',
  PAGE_REMOTE_REMOVE = '[Checklist] [Remote-Removal-Start] Remove Page',
  PAGE_REMOTE_REMOVED = '[Checklist] [Remote-Removal-End] Remove Page',
  FILE_REMOTE_UPLOAD = '[Checklist] [Remote-Upload-Start] Document File',
  FILE_REMOTE_UPLOADED = '[Checklist] [Remote-Upload-End] Document File',
  DOCUMENT_FILE_REMOTE_LOADED = '[Checklist] [Remote-Load-End] Document Full File',
  DOCUMENT_FILE_REMOTE_LOAD = '[Checklist] [Remote-Load-Start] Document Full File',
  DOCUMENT_FILE_REMOTE_OPEN = '[Checklist] [Remote-Load-Start] Opend Full Document File'
}
