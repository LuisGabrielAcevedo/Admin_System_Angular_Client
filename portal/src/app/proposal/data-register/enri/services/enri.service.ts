import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnriRequest, EnriResponse } from '../api/enri';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnriService {
  constructor(private http: HttpClient) {}

  public postEnri(
    proposalId: number,
    custumer: string,
    payload: EnriRequest
  ): Observable<EnriResponse> {
    return this.http.post<EnriResponse>(
      `${environment.modules.proposal}proposal/${proposalId}/${custumer}/enri`,
      payload
    );
  }
}
