/**
 * Result DTO of ECM upload service (/document/upload)
 */
export interface PostDocumentUploadResponseDTO {}

/**
 * Requested parameter DTO of ECM upload service (/document/upload)
 */
export interface PostDocumentUploadRequestDTO {
  contentType: string;
  content: string;
  processFile: string;
  documentId: string;
  proposalId: string;
  fileName?: string;
}
