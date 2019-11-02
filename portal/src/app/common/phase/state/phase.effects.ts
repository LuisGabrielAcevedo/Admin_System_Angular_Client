import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, NEVER } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PHASE_CHECK, CheckPhaseAction } from './phase.actions';
import {
  ShowBlockingAction,
  HideBlockingAction
} from '../../blocking/state/blocking.actions';
import { ProposalService } from '../../../proposal/proposal.service';
import { Router } from '@angular/router';
import {
  PHASES_PROCESS_STATUS,
  PHASES_NORMALIZED
} from '../../../constants/phases.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PhaseEffects {
  // @Effect()
  // phase$: Observable<any> = this.actions$.pipe(
  //   ofType(PHASE_CHECK),
  //   map(_ => new ShowBlockingAction({ message: 'loading trough phase' }))
  // );
  @Effect()
  phase$: Observable<any> = this.actions$.pipe(
    ofType(PHASE_CHECK),
    map(action => action as CheckPhaseAction),
    mergeMap(action =>
      this.proposalService.getProposalsStatus(action.payload.proposalId).pipe(
        map(response => {
          return { ...response, propId: action.payload.proposalId };
        }),
        catchError(err => NEVER)
      )
    ),
    map(response => {
      const status = response.phaseProcessStatus
        ? response.phaseProcessStatus
        : PHASES_PROCESS_STATUS.ONGOING;
      const statusOk = status === PHASES_PROCESS_STATUS.NOT_RUNNING;

      if (statusOk) {
        const selectedPhase = PHASES_NORMALIZED[response.code];
        const fullStatus =
          selectedPhase && selectedPhase.URL
            ? selectedPhase.URL
            : 'panel/detail';
        this.router.navigate([fullStatus + '/' + response.propId]);
        return new HideBlockingAction();
      } else {
        return new ShowBlockingAction({
          message: this.translate.instant('@Please wait a moment')
        });
      }
    })
  );
  //   map(_ => new ShowBlockingAction({ message: 'loading trough phase' }))
  // );

  constructor(
    private actions$: Actions,
    private proposalService: ProposalService,
    private router: Router,
    private translate: TranslateService
  ) {}
}
