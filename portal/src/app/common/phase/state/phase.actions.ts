import { Action } from '@ngrx/store';

export const PHASE_CHECK = '[PHASE] CHECK';

export class CheckPhaseAction implements Action {
  readonly type = PHASE_CHECK;

  constructor(public payload: { proposalId: string | number }) {}
}

export type PhaseActions = CheckPhaseAction;
