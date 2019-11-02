import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PostFormalization } from '../api/formalization';
import { ContractListResponse, ContractResponse } from '../api/contract';

@Injectable({
  providedIn: 'root'
})
export class FormalizationService {
  constructor(private http: HttpClient) {}

  public postFormalization(
    proposalId: number,
    payload: PostFormalization
  ): Observable<any> {
    return this.http.post(
      `${environment.modules.formalization}formalization/` + proposalId,
      payload
    );
  }

  public getContracts(proposalId: number): Observable<ContractListResponse> {
    return this.http.get<ContractListResponse>(
      `${environment.modules.formalization}formalization/${proposalId}/generate-document/types`
    );
  }

  public getContract(
    proposalId: number,
    code: string
  ): Observable<ContractResponse> {
    return this.http.get<ContractResponse>(
      `${environment.modules.formalization}formalization/${proposalId}/generate-document/types/${code}`
    );
  }
  public postSwitchPledge(
    proposalNumber: number,
    selectedPledge: string
  ): Observable<string> {
    return this.http.post(
      `${environment.modules.formalization}formalization/${proposalNumber}/switch-pledge/${selectedPledge}`,
      {},
      { responseType: 'text' }
    );
  }
}
