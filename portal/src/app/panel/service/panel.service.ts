import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProposalStatus } from '../api/get.proposalStatus.res';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  constructor(private httpClient: HttpClient) {}

  getProposalStatus() {
    return this.httpClient.get<ProposalStatus[]>(
      environment.modules.panel + 'parameters/status'
    );
  }
}
