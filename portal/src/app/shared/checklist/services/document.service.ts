import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GetDocumentPagesDTO,
  GetDocumentPageThumbnailDTO,
  GetDocumentPageDTO,
  GetDocumentPagesAPI2DTO,
  GetDocumentPagesAPI,
  GetDocumentPageAPI2DTO,
  GetDocumentPageAPI,
  GetDocumentPageThumbnailAPI,
  GetDocumentPageThumbnailAPI2DTO,
  GetFullDocumentAPI,
  GetFullDocumentDTO,
  GetFullDocumentAPI2DTO
} from '../models/api/get.document';
import { environment } from 'src/environments/environment';
import {
  PostDocumentUploadRequestDTO,
  PostDocumentUploadResponseDTO
} from '../models/api/post.document';
import { FileContent } from '../models/file-content';
import {
  DeleteDocumentPageDTO,
  DeleteDocumentPageAPI
} from '../models/api/delete.document';
import { map } from 'rxjs/operators';

const requestOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {}

  /**
   * Gets the list of page ids of a given document
   */
  public getDocumentPages(documentId: string): Observable<GetDocumentPagesDTO> {
    return this.http
      .get<GetDocumentPagesAPI>(
        `${environment.modules.ecm}document/${documentId}/page`,
        requestOptions
      )
      .pipe(map(res => GetDocumentPagesAPI2DTO(res)));
  }

  /**
   * Gets a thumbnail of the given document page
   */
  public getDocumentPageThumbnail(
    pageId: string,
    documentId: string
  ): Observable<GetDocumentPageThumbnailDTO> {
    return this.http
      .get<GetDocumentPageThumbnailAPI>(
        `${environment.modules.ecm}document/${documentId}/page/${pageId}/thumbnail`,
        requestOptions
      )
      .pipe(map(res => GetDocumentPageThumbnailAPI2DTO(res)));
  }

  /**
   * Gets the given page in PDF format
   */
  public getDocumentPage(
    pageId: string,
    documentId: string
  ): Observable<GetDocumentPageDTO> {
    return this.http
      .get<GetDocumentPageAPI>(
        `${environment.modules.ecm}document/${documentId}/page/${pageId}`,
        requestOptions
      )
      .pipe(map(res => GetDocumentPageAPI2DTO(res)));
  }

  /**
   * Gets the given full document in PDF format
   */
  public getFullDocument(documentId: string): Observable<GetFullDocumentDTO> {
    return this.http
      .get<GetFullDocumentAPI>(
        `${environment.modules.ecm}document/${documentId}`,
        requestOptions
      )
      .pipe(map(res => GetFullDocumentAPI2DTO(res)));
  }

  /**
   * Deletes the given page
   */
  public deleteDocumentPage(
    pageId: string,
    documentId: string
  ): Observable<DeleteDocumentPageDTO> {
    return this.http
      .post<DeleteDocumentPageAPI>(
        `${environment.modules.ecm}document/delete/${documentId}/page/${pageId}`,
        requestOptions
      )
      .pipe(
        map(res => ({
          pageId,
          documentId
        }))
      );
  }

  /**
   * Uploads
   *  * a single new page in JPG, PNG or PDF format;
   *  * or several new pages in PDF format (single PDF with multiple pages)
   */
  public postDocumentUpload(
    proposalId: number,
    documentId: string,
    documentFile: FileContent
  ): Observable<PostDocumentUploadResponseDTO> {
    const payload: PostDocumentUploadRequestDTO = {
      proposalId: proposalId + '',
      documentId,
      processFile: 'S',
      content: documentFile.content,
      contentType: documentFile.format,
      fileName: 'teste'
    };

    return this.http.post<PostDocumentUploadResponseDTO>(
      `${environment.modules.ecm}document`,
      payload,
      requestOptions
    );
  }
}
