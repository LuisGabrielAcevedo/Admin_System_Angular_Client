import { ProposalListState } from './proposal.list.model';
import { initProposalListState } from './proposal.list.init';
import {
  ProposalListActions,
  LOAD_PROPOSAL_LIST,
  LOAD_PROPOSAL_LIST_SUCCESS
} from './proposal.list.actions';

export function proposalListReducer(
  state: ProposalListState = initProposalListState,
  action: ProposalListActions
): ProposalListState {
  switch (action.type) {
    case LOAD_PROPOSAL_LIST: {
      return { ...state, loading: true };
    }
    case LOAD_PROPOSAL_LIST_SUCCESS: {
      return { ...state, loading: false, ...action.proposalListResponse };
    }

    default: {
      return state;
    }
  }
}
