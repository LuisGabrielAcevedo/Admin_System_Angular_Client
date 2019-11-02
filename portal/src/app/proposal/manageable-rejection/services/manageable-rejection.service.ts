import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommentRequest, CommentResponse } from '../api/comments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageableRejectionService {
  constructor(private http: HttpClient) {}

  public postMessage(
    payload: CommentRequest,
    proposal: number
  ): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${environment.modules.proposal}proposal/${proposal}/comments`,
      payload
    );
  }
}
