import { SafeResourceUrl } from '@angular/platform-browser';

export interface ThumbnailList {
  documentPages: Page[];
  documentId: string;
}

export interface CurrentPage {
  documentId: string;
  documentPage: Page;
}

export interface Page {
  pageId: string;
  content: string;
  format: string;
}

export interface DocumentInfo {
  documentId: string;
  title: string;
  lastUpdate: string;
  pageNumber: number;
}

export interface PageComponent {
  pageId: string;
  content: SafeResourceUrl;
}

export const ThumbnailListFactory = (param: any = {}): ThumbnailList => {
  const newThumblist = {
    documentPages: {},
    documentId: ''
  };

  const result = {
    ...newThumblist,
    ...param
  } as ThumbnailList;

  return result;
};
