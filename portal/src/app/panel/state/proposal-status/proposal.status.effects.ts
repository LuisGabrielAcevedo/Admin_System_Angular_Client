import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, NEVER } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PanelService } from '../../service/panel.service';
import {
  LoadProposalStatusAction,
  LoadProposalStatusSuccessAction,
  LOAD_PROPOSAL_STATUS
} from './proposal.status.actions';

@Injectable({
  providedIn: 'root'
})
export class ProposalStatusEffects {
  @Effect()
  proposalLoad$: Observable<any> = this.actions$.pipe(
    ofType(LOAD_PROPOSAL_STATUS),
    mergeMap((action: LoadProposalStatusAction) =>
      this.panelService.getProposalStatus()
    ),
    map(response => {
      return [{ id: '', description: 'TODOS' }, ...response];
    }),
    map(
      response =>
        new LoadProposalStatusSuccessAction({ proposalStatus: response })
    ),
    catchError(err => NEVER)
  );
  constructor(private actions$: Actions, private panelService: PanelService) {}
}
