import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '@app/proposal/api';
import { Vehicle } from '@app/proposal/api/proposal';
import { SortBy } from '@shared/model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostProposalRequest, ProposalDTO } from './api';
import { GetProposalListResponse } from './api/get.proposal.list.res';
import { ProposalStatusDTO } from './api/get.proposal.status.res';
import { GetProposalTotalResponse } from './api/get.proposal.total.res';
import { CustomerPatchRes } from './data-register/models/customer-patch.model';
import { Phase } from './formalization/api/phase';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PledgeCapacity } from './formalization/api/formalization';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  constructor(private http: HttpClient) {}

  public getProposalsStatus(
    proposalId: number | string
  ): Observable<ProposalStatusDTO> {
    return this.http.get<ProposalStatusDTO>(
      environment.modules.proposal + 'proposal/' + proposalId + '/status'
    );
  }

  public getProposal(proposalId: number | string): Observable<ProposalDTO> {
    return this.http.get<ProposalDTO>(
      environment.modules.proposal + 'proposal/' + proposalId
    );
  }

  public getProposalTotals(sellingPointCode = '540') {
    return this.http.get<GetProposalTotalResponse>(
      environment.modules.panel + `totals?sellingPointCode=${sellingPointCode}`
    );
  }
  public getProposalList(
    filterBy?: object,
    sortBy?: SortBy,
    index = 0,
    pageSize = 20
  ) {
    let params = new HttpParams().set('summary', 'true');

    filterBy = { ...filterBy };

    const filterByStr = this.mapFilterBy(filterBy);
    const orderByStr = this.mapOrderBy(sortBy);

    if (filterByStr !== '') {
      params = params.set('filterBy', filterByStr);
    }

    if (orderByStr !== '') {
      params = params.set('orderBy', orderByStr);
    }

    params = params.set('index', '' + index);
    params = params.set('pageSize', '' + pageSize);

    return this.http.get<GetProposalListResponse>(
      environment.modules.panel + 'proposals',
      {
        params
      }
    );
  }

  public postProposal(
    proposal: PostProposalRequest
  ): Observable<HttpResponse<ProposalDTO>> {
    return this.http.post<ProposalDTO>(
      `${environment.modules.proposal}proposal`,
      proposal,
      { observe: 'response' }
    );
  }

  public pledgeCapacity(sellingPointId: number): Observable<PledgeCapacity> {
    return this.http.get<PledgeCapacity>(
      `${environment.modules.domain}sellingPoints/${sellingPointId}/quota`
    );
  }

  public patchCustomer(
    partialProposal: Partial<Customer>,
    proposalNumber: number,
    customerType: 'owner' | 'coowner'
  ): Observable<CustomerPatchRes> {
    return this.http.patch<CustomerPatchRes>(
      `${environment.modules.proposal}proposal/${proposalNumber}/${customerType}`,
      partialProposal
    );
  }

  public patchVehicle(
    partialProposal: Partial<Vehicle>,
    proposalNumber: number
  ): Observable<HttpResponse<Partial<Vehicle>>> {
    return this.http.patch<Partial<Vehicle>>(
      `${environment.modules.proposal}proposal/${proposalNumber}/vehicle`,
      partialProposal,
      { observe: 'response' }
    );
  }

  public postProposalAccount(
    proposal: PostProposalRequest,
    proposalNumber: number,
    type: string = ''
  ): Observable<ProposalDTO> {
    return this.http.post<ProposalDTO>(
      `${environment.modules.proposal}proposal/${proposalNumber}/${type}`,
      proposal
    );
  }

  patchPledge(proposalNumber) {
    return this.http.patch<any>(
      environment.modules.proposal + 'proposal/' + proposalNumber + '/pledge',
      null
    );
  }
  public mapFilterBy(filterBy) {
    let str = '';
    for (const key in filterBy) {
      if (filterBy[key] !== '') {
        str = str + `${key}:${filterBy[key]},`;
      }
    }
    return str;
  }

  public mapOrderBy(orderBy: SortBy) {
    if (orderBy.prop !== '') {
      return `${orderBy.prop}:${orderBy.dir}`;
    }
    return '';
  }

  public getPhase(proposalId: number): Observable<Phase> {
    return this.http.get<Phase>(
      `${environment.modules.proposal}proposal/${proposalId}/phase`
    );
  }
}
