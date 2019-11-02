import { Action } from '@ngrx/store';
import { ProposalStatus } from '../../api/get.proposalStatus.res';

export const LOAD_PROPOSAL_STATUS = '[PROPOSAL_STATUS] LOAD';
export const LOAD_PROPOSAL_STATUS_SUCCESS = '[PROPOSAL_STATUS] LOAD_SUCCESS';

export class LoadProposalStatusAction implements Action {
  readonly type = LOAD_PROPOSAL_STATUS;

  constructor() {}
}
export class LoadProposalStatusSuccessAction implements Action {
  readonly type = LOAD_PROPOSAL_STATUS_SUCCESS;

  constructor(public payload: { proposalStatus: ProposalStatus[] }) {}
}

export type ProposalStatusActions =
  | LoadProposalStatusAction
  | LoadProposalStatusSuccessAction;
