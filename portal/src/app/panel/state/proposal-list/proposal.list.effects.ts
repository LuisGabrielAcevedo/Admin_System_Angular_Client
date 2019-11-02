import { Injectable } from '@angular/core';
import { ProposalListResponse } from '@app/proposal/api/get.proposal.list.res';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NEVER, Observable } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ProposalService } from '../../../proposal/proposal.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import {
  LoadProposalListAction,
  LoadProposalListSuccessAction,
  LOAD_PROPOSAL_LIST
} from './proposal.list.actions';
import { proposalListSelector } from './proposal.list.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProposalListEffects {
  @Effect()
  proposalLoad$: Observable<any> = this.actions$.pipe(
    ofType(LOAD_PROPOSAL_LIST),
    map(action => action as LoadProposalListAction),
    withLatestFrom(this.store.select(proposalListSelector)),
    mergeMap(([action, state]) => {
      const idSellingPoint = this.sessionStorageService.getSellingPointCode();
      return this.proposalService
        .getProposalList(
          action.payload.filterBy,
          action.payload.orderBy,
          action.payload.page,
          state.pageSize
        )
        .pipe(
          map(response => {
            const proposalMappedList = response.proposalResponseList.map(
              proposal => {
                let newStatusGroup = '';
                let newStatus = '';
                if (proposal.status) {
                  newStatus = proposal.status
                    ? proposal.status.proposalStatusDescription
                    : '';
                  newStatusGroup = proposal.status.proposalStatusGroup
                    ? proposal.status.proposalStatusGroup.description
                    : '';
                }
                return {
                  proposalNumber: proposal.proposalNumber,
                  financedAmount: proposal.financedAmount,
                  creationDate: sqlDateToIsoDate(proposal.creationDate),
                  vehicleName: getVehicle(proposal),
                  fullName: getName(proposal),
                  ...proposal.owner,
                  statusGroup: newStatusGroup,
                  status: newStatus,
                  pillColor: null
                };
              }
            );
            return {
              ...response,
              proposalMappedList
            };
          }),
          map(response => new LoadProposalListSuccessAction(response)),
          catchError(err => NEVER)
        );
    })

    // catchError(action => never)
  );
  constructor(
    private actions$: Actions,
    private proposalService: ProposalService,
    private store: Store<any>,
    private sessionStorageService: SessionStorageService
  ) {}
}
function getVehicle(proposal: ProposalListResponse): string {
  if (proposal.vehicle && proposal.vehicle.model) {
    return proposal.vehicle.model.description;
  }
  return '';
}
function getName(proposal: ProposalListResponse): string {
  if (proposal.owner && proposal.owner.firstName) {
    return `${proposal.owner.lastName}, ${proposal.owner.firstName}`;
  }
  return '';
}

function mapDate(value) {
  return `${('0' + value.day).slice(-2)}-${('0' + value.month).slice(-2)}-${
    value.year
  }`; //value.10-05-2019
}

function sqlDateToIsoDate(date) {
  const dateParts = date.split('-');
  return new Date(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2].substr(0, 2),
    dateParts[2].substr(3, 2),
    dateParts[2].substr(6, 2),
    dateParts[2].substr(9, 2)
  );
}
