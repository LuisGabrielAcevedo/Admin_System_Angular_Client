/**
 * Result DTO of ECM delete page service (DELETE /document/:id/page/:id)
 */
export interface DeleteDocumentPageAPI {}

export interface DeleteDocumentPageDTO {
  pageId: string;
  documentId: string;
}
