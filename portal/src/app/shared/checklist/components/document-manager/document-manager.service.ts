import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ThumbResponse,
  PagesResponse,
  PageResponse,
  FullDocumentResponse
} from '@app/proposal/formalization/api/document';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentManagerService {
  constructor(private http: HttpClient) {}

  public getPages(): Observable<PagesResponse> {
    return this.http.get<PagesResponse>('/document/:id/pages');
  }

  public getThumbnail(): Observable<ThumbResponse> {
    return this.http.get<ThumbResponse>('/document/page/:id/thumbnail');
  }

  public getPage(): Observable<PageResponse> {
    return this.http.get<PageResponse>('/document/page/:id');
  }

  public getFullDocument(): Observable<FullDocumentResponse> {
    return this.http.get<FullDocumentResponse>('/document/:id');
  }
}
