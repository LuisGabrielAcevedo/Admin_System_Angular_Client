import { Action } from '@ngrx/store';
import { GetProposalListResponse } from '../../../proposal/api/get.proposal.list.res';
import { ProposalSummary } from './proposal.list.model';
import { SortBy } from '../../../shared/model/orderBy';

export const LOAD_PROPOSAL_LIST = '[PROPOSAL_LIST] LOAD';
export const LOAD_PROPOSAL_LIST_SUCCESS = '[PROPOSAL_LIST] LOAD_SUCCESS';

export class LoadProposalListAction implements Action {
  readonly type = LOAD_PROPOSAL_LIST;

  constructor(
    public payload: { filterBy: object; page: number; orderBy: SortBy }
  ) {}
}
export class LoadProposalListSuccessAction implements Action {
  readonly type = LOAD_PROPOSAL_LIST_SUCCESS;

  constructor(
    public proposalListResponse: LoadProposalListSuccessActionModel
  ) {}
}

export type ProposalListActions =
  | LoadProposalListAction
  | LoadProposalListSuccessAction;

export interface LoadProposalListSuccessActionModel
  extends GetProposalListResponse {
  proposalMappedList: ProposalSummary[];
}
