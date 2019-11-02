// import { FormValue } from "./form.model";
import { Action } from '@ngrx/store';
import { ProposalDTO } from '../api';

export const LOAD = '[PROPOSAL] LOAD';
export const LOAD_SUCCESS = '[PROPOSAL] LOAD_SUCCESS';
export const LOAD_ERROR = '[PROPOSAL] LOAD_ERROR';
export const RESET = '[PROPOSAL] RESET';

export class LoadProposalAction implements Action {
  readonly type = LOAD;

  constructor(public payload: { proposalId: string }) {}
}
export class LoadProposalSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: { proposal: ProposalDTO }) {}
}
export class LoadProposalErrorAction implements Action {
  readonly type = LOAD_ERROR;

  constructor() {}
}

export class ResetProposalStateAction implements Action {
  readonly type = RESET;
  constructor() {}
}

export type ProposalActions =
  | LoadProposalAction
  | LoadProposalSuccessAction
  | LoadProposalErrorAction
  | ResetProposalStateAction;
