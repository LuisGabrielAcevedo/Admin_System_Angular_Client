import { ProposalFilterState } from './proposal.filter.model';
import { initProposalFilterState } from './proposal.filter.init';
import {
  ProposalFilterActions,
  CHANGE_FILTER_BY
} from './proposal.filter.actions';

export function proposalFilterReducer(
  state: ProposalFilterState = initProposalFilterState,
  action: ProposalFilterActions
): ProposalFilterState {
  switch (action.type) {
    case CHANGE_FILTER_BY: {
      return {
        ...state,
        ...action.payload.filterBy
      };
    }

    default: {
      return state;
    }
  }
}
