export interface ThumbResponse {
  thumb: FileDTO;
  pageId: string;
}

export interface PagesResponse {
  lastUpdate: string;
  documentId: string;
  pageList: string[];
}

export interface PageResponse {
  file: FileDTO;
  pageId: string;
}

export interface FullDocumentResponse {
  documentId: string;
  file: FileDTO;
  proposalId: number;
}

export interface DocumentUploadRequest {
  documentId: string;
  file: FileDTO;
  proposalId: number;
}
export interface DocumentUploadResponse {
  message: string;
}

export interface FileDTO {
  content: string;
  format: string;
}

export interface toUploadFile {
  documentId: string;
  file: {
    content: string;
    format: string;
  };
  proposalId: number;
}
