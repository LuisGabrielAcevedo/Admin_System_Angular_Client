import { Injectable, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { empty, Observable, of, NEVER } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mergeMap,
  filter,
  catchError
} from 'rxjs/operators';
import { ProposalService } from '../proposal.service';
import {
  LOAD,
  LoadProposalAction,
  LoadProposalSuccessAction,
  ResetProposalStateAction
} from './proposal.actions';
import { CheckPhaseAction } from '@app/common/phase/state/phase.actions';
const SHOULD_CHECK_PHASE_ROUTES = [
  'proposal/data-register/account/',
  'proposal/formalization'
];
@Injectable({
  providedIn: 'root'
})
export class ProposalEffects {
  @Effect()
  proposal$: Observable<any> = this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    distinctUntilChanged(),
    map(_ => this.activatedRoute),
    mergeMap(activatedRoute => {
      while (activatedRoute.firstChild) {
        activatedRoute = activatedRoute.firstChild;
      }
      return activatedRoute.params.pipe(map(params => params.proposal));
    }),
    mergeMap(proposalId => {
      if (proposalId) {
        return of(new LoadProposalAction({ proposalId }));
      } else {
        return empty();
      }
    })
  );

  @Effect()
  proposalLoad$: Observable<any> = this.actions$.pipe(
    ofType(LOAD),
    mergeMap((action: LoadProposalAction) =>
      this.proposalService.getProposal(action.payload.proposalId).pipe(
        map(response => new LoadProposalSuccessAction({ proposal: response })),
        catchError(error => of(new ResetProposalStateAction()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private proposalService: ProposalService,
    private activatedRoute: ActivatedRoute
  ) {}
}
