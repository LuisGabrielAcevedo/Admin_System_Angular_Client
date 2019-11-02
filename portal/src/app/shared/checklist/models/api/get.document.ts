import { FileContent } from '../file-content';
import { AllowedFormat } from '../allowed-format.enum';

/**
 * Result DTO of EMC page thumbnail service (/document/page/:id/thumbnail)
 */
export interface GetDocumentPageThumbnailDTO {
  file: FileContent;
  pageId: string;
  documentId: string;
}

export interface GetDocumentPageThumbnailAPI {
  documentId: string;
  pageId: string;
  contentType: string;
  content: string;
  fileName?: string;
}

export function GetDocumentPageThumbnailAPI2DTO(
  api: GetDocumentPageThumbnailAPI
): GetDocumentPageThumbnailDTO {
  const { documentId, pageId, contentType = 'image/jpeg', content } = api;
  const format = contentType as AllowedFormat;
  return { documentId, pageId, file: { format, content } };
}

/**
 * Result DTO of ECM page list service (/document/:id/pages)
 */
export interface GetDocumentPagesAPI {
  documentId: string;
  pages?: { pageId: string }[];
}

export interface GetDocumentPagesDTO {
  documentId: string;
  pageList: string[];
}

export function GetDocumentPagesAPI2DTO(
  api: GetDocumentPagesAPI
): GetDocumentPagesDTO {
  const { documentId, pages = [] } = api;
  const pageList = pages.map(p => p.pageId);
  return { documentId, pageList };
}

/**
 * Result DTO of ECM get page service (/document/page/:id)
 */
export interface GetDocumentPageDTO {
  file: FileContent;
  pageId: string;
  documentId: string;
}

export interface GetDocumentPageAPI {
  documentId: string;
  pageId: string;
  contentType: string;
  fileName?: string;
  content: string;
}

export function GetDocumentPageAPI2DTO(
  api: GetDocumentPageAPI
): GetDocumentPageDTO {
  const { documentId, pageId, contentType, content } = api;
  const format = contentType as AllowedFormat;
  return { documentId, pageId, file: { format, content } };
}

/**
 * Result DTO of EMC page thumbnail service (/document/page/:id/thumbnail)
 */
export interface GetFullDocumentDTO {
  file: FileContent;
  documentId: string;
}

export interface GetFullDocumentAPI {
  content: string;
  documentId: string;
}

export function GetFullDocumentAPI2DTO(
  api: GetFullDocumentAPI
): GetFullDocumentDTO {
  const { documentId, content } = api;
  const format = AllowedFormat.PDF;
  return { documentId, file: { format, content } };
}
